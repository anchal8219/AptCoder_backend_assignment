const express =  require('express')
const router = express.Router();
const courseController = require('../controller/course')
const auth = require('../middleware/Auth')


router.post('/create',auth.auth,courseController.createCourse)
router.put('/update/:courseId', auth.auth, courseController.updateCourse);
router.get('/course/get/student', auth.auth, courseController.getCoursesForStudent);
router.get('/course/get/course-developer', auth.auth, auth.isCreator, courseController.getCoursesForCourseDeveloper);


module.exports = router;