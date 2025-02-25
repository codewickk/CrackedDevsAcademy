const express = require("express");
const { string, object } = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const { Educator, Course, UserProfile } = require("../db/schema");
const  authenticator  = require('../middlewares/auth');
const { Upload } = require("../middlewares/multer");
const router = express.Router();
const s3 = require('../AWs/aws')


const educatorValidationSchema = object({
    firstName: string(),
    lastName: string(),
    email: string().email(),
    password: string().min(6, "Password must be at least 6 characters")
});

const educatorSigninValidationSchema = object({
    email: string().email(),
    password: string()
});

const courseUploadSchema = object({
    title: string().min(3, "Title must be at least 3 characters"),
    price: string(),
    description: string().optional(),
    category: string()
});

const userProfileValidation = object({
    firstName: string(),
    userName: string(),
    bio: string().optional(),
    socialLinks: object({
        linkedin: string().optional(),
        twitter: string().optional(),
        portfolio: string().optional()
    }).optional(),
    profilePicture: string().optional()
});

router.post('/signup', async (req, res) => {
    const educatorBody = req.body;
    const result = educatorValidationSchema.safeParse(educatorBody);
    
    if (result.success) {
        const { firstName, lastName, email, password } = result.data;
        try {
            const alreadyAUser = await Educator.findOne({ email });

            if (!alreadyAUser) {
                const educator = await Educator.create({ 
                    firstName, 
                    lastName, 
                    email, 
                    password 
                });
                
                const token = jwt.sign(
                    { userId: educator._id.toString() }, 
                    JWT_SECRET, 
                    { expiresIn: '1h' }
                );

                return res.status(201).json({
                    message: "User created successfully",
                    token,
                    educatorId: educator._id
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
        errors: result.error.errors
    });
});

router.post('/signin', async (req, res) => {
    const userBody = req.body;
    const result = educatorSigninValidationSchema.safeParse(userBody);
    
    if (!result.success) {
        return res.status(400).json({
            msg: "Invalid login credentials",
            errors: result.error.errors
        });
    }
    
    const { email, password } = result.data;
    
    try {
        const educator = await Educator.findOne({ email, password });
        
        if (!educator) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }
        
        const token = jwt.sign(
            { userId: educator._id.toString() }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        return res.json({
            token,
            educatorId: educator._id.toString()
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error during sign-in",
            error: error.message
        });
    }
});


router.post('/uploadcourse', authenticator, Upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
    const courseBody = req.body;
    const result = courseUploadSchema.safeParse(courseBody);
  
    if (!result.success) {
        return res.status(400).json({
            msg: "Invalid course details",
            errors: result.error.errors
        });
    }
    
    try {
       
        if(!req.files || !req.files.video || !req.files.thumbnail){
            return res.status(400).json({msg:"Both video and thumbnail must be uploaded"});
        }

        const videoFile = req.files.video[0];
        const thumbnailFile = req.files.thumbnail[0];

        
        const videoParams = {
            Bucket: 'crackeddevsacademybucket',
            Key: `courses/videos/${Date.now()}_${videoFile.originalname}`,
            Body: videoFile.buffer,
            ContentType: videoFile.mimetype,
        };

        
        const thumbnailParams = {
            Bucket: 'crackeddevsacademybucket',
            Key: `courses/thumbnails/${Date.now()}_${thumbnailFile.originalname}`,
            Body: thumbnailFile.buffer,
            ContentType: thumbnailFile.mimetype,
        };

        const videoUploadResult = await s3.uploadFile(videoParams);
       
        const thumbnailUploadResult = await s3.uploadFile(thumbnailParams);

        
        const course = await Course.create({
            ...result.data,
            educatorId: req.userId,
            videoURL: videoUploadResult.Location,
            thumbnail: thumbnailUploadResult.Location
        });

        return res.status(201).json({
            msg: "Course created successfully",
            courseId: course._id,
            videoURL: videoUploadResult.Location,
            thumbnailURL: thumbnailUploadResult.Location
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Course cannot be created",
            error: error.message
        });
    }
});


router.post('/profile', authenticator, async (req, res) => {
    const payload = req.body;
    const result = userProfileValidation.safeParse(payload);
    
    if (!result.success) {
        return res.status(400).json({
            msg: "Invalid profile details",
            errors: result.error.errors
        });
    }
    
    try {
        const userProfile = await UserProfile.create({
            ...result.data,
            educatorId: req.userId
        });
        
        return res.status(201).json({
            msg: "Profile created successfully",
            profileId: userProfile._id
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Profile could not be created",
            error: error.message
        });
    }
});

module.exports = router;