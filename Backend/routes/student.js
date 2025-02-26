require('dotenv').config();
const express = require("express");
const { Student, Purchase,Course } = require('../db/schema');
const { string, object } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config');
const  authenticator  = require('../middlewares/auth');
// const { CloudFront } = require("aws-sdk");
const fs = require('fs')

const router = express.Router();
const AWS = require('aws-sdk');
const privateKey = fs.readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH, 'utf8');
const CloudFront = new AWS.CloudFront.Signer(
    process.env.CLOUDFRONT_KEY_PAIR_ID,
    privateKey
)
const studentValidationSchema = object({
    firstName: string().min(1, "First name is required"),
    lastName: string().min(1, "Last name is required"),
    email: string().email("Invalid email format"),
    password: string().min(6, "Password must be at least 6 characters")
});

router.post('/signup', async (req, res) => {
    const studentBody = req.body;
    const parsed = studentValidationSchema.safeParse(studentBody);

    if (parsed.success) {
        const { firstName, lastName, email, password } = parsed.data;
        try {
            const alreadyAUser = await Student.findOne({ email });

            if (!alreadyAUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                
                const student = await Student.create({ 
                    firstName, 
                    lastName, 
                    email, 
                    password: hashedPassword 
                });
                
                const studentId = student._id;
                const token = jwt.sign({ userId: studentId }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(201).json({
                    message: "User created successfully",
                    token
                });
            }
            return res.status(409).json({
                message: "This user already exists"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error during signup",
                error: error.message
            });
        }
    }
    return res.status(400).json({
        message: "User details are invalid",
        errors: parsed.error.errors
    });
});

const studentSigninValidationSchema = object({
    email: string().email("Invalid email format"),
    password: string().min(6, "Password must be at least 6 characters")
});

router.post('/signin', async (req, res) => {
    const userBody = req.body;
    const parsed = studentSigninValidationSchema.safeParse(userBody);
    
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Invalid input. Check email and password."
        });
    }

    const { email, password } = parsed.data;
    
    try {
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(401).json({
                msg: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (isMatch) {
            const token = jwt.sign({ userId: student._id }, JWT_SECRET, { expiresIn: '1h' });
            
            return res.json({ token });
        }

        return res.status(401).json({
            msg: "Invalid credentials"
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Server error during signin",
            error: error.message
        });
    }
});

router.get('/getname', authenticator, async (req, res) => {
    try {
        const student = await Student.findById(req.userId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ name: student.firstName });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('/purchaseCourse', authenticator, async (req, res) => {
    try {
        const { courseId } = req.body;
        
        if (!courseId) {
            return res.status(400).json({ msg: 'Course ID is required' });
        }

    
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

    
        const existingPurchase = await Purchase.findOne({
            studentId: req.userId,
            courseId: courseId
        });

        if (existingPurchase) {
            return res.status(400).json({ msg: 'You have already purchased this course' });
        }

        
        const purchaseDetails = {
            studentId: req.userId,
            courseId: courseId
        };

        const purchased = await Purchase.create(purchaseDetails);

        if (!purchased) {
            return res.status(500).json({ msg: 'Could not purchase course' });
        }

        return res.status(200).json({ 
            msg: 'Course purchased successfully',
            purchase: {
                id: purchased._id,
                courseId: purchased.courseId,
                studentId: purchased.studentId
            }
        });

    } catch (error) {
        console.error('Purchase error:', error);
        return res.status(500).json({ msg: 'Server error during purchase' });
    }
});


router.get("/purchasedCourses", authenticator, async (req, res) => {
    const studentId = req.userId;
    try {
      
      const purchases = await Purchase.find({ studentId })
        .populate({
          path: 'courseId',
          select: 'title description thumbnail category ' 
        });
      
      if (!purchases || purchases.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No courses found'
        });
      }
  
      
      const purchasedCourses = purchases.map(purchase => ({
        purchaseId: purchase._id,
        courseId: purchase.courseId._id,
        title: purchase.courseId.title,
        description: purchase.courseId.description,
        thumbnail: purchase.courseId.thumbnail,
        category: purchase.courseId.category,
        price: purchase.courseId.price
      }));
  
      return res.status(200).json({
        success: true,
        purchased: purchasedCourses
      });
    } catch (error) {
      console.error('Error in purchasedCourses:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching courses',
        error: error.message
      });
    }
  });


router.get("/isCoursePurchased", authenticator, async (req, res) => {
    try {
        const studentId = req.userId;
        const courseId = req.query.courseId;  

        const hasAccess = await Purchase.findOne({ studentId, courseId });

        if (!hasAccess) {
            return res.json({
                success: false,
                message: "User has not bought the course",
            });
        }

        const course = await Course.findById(courseId);
        console.log(course);
        if (!course || !course.videoURL) {
            return res.json({
                success: false,
                message: "The course does not exist or does not have a video URL"
            });
        }

        const s3Url = course.videoURL;
        const videoPath = s3Url.split('.com')[1];
        
        
        const domain = process.env.CLOUDFRONT_DOMAIN.replace(/^https?:\/\//, '');
        const cloudFrontUrl = `https://${domain}${videoPath}`;
        
       
        console.log("Original S3 URL:", s3Url);
        console.log("Video path:", videoPath);
        console.log("Domain:", domain);
        console.log("CloudFront URL:", cloudFrontUrl);

        const signedUrl = CloudFront.getSignedUrl({
            url: cloudFrontUrl,
            expiresIn: Math.floor(Date.now() / 1000) + 7200
        });
        
        console.log("Final signed URL:", signedUrl);

        res.json({
            success: true,
            videoUrl: signedUrl  
        });
    } catch (error) {
        console.error("Error checking course purchase:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});



module.exports = router;