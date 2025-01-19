const express = require('express');
const router = express.Router();
const studentRouter = require('./student');
const educatorRouter = require('./educator');
const courseRouter = require('./courses')
router.get('/test', (req, res) => {
    res.json({ message: 'Root router is working' });
});

router.use('/student', studentRouter);
router.use('/educator', educatorRouter);
router.use('/courses',courseRouter)
module.exports = router;