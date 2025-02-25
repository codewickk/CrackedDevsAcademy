const express = require('express');
const router = express.Router();
const { Course } = require('../db/schema');

router.get('/getcourses', async (req, res) => {
    try {
      const courses = await Course.find({});
      if (!courses || courses.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No courses found'
        });
      }
      return res.status(200).json({
        success: true,
        courses
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching courses',
        error: error.message
      });
    }
  });
module.exports = router;