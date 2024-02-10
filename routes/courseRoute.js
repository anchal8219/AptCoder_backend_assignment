const express =  require('express')
const router = express.Router();
const courseController = require('../controller/course')
const auth = require('../middleware/Auth')


router.post('/create',auth,courseController.createCourse)
router.put('/update/:courseId',courseController.updateCourse)
app.get('/course/get/student')
app.get('/course/get/course-developer')

module.exports = router;