const Course = require('../models/course_creatorModel')



exports.createCourse = async(req,res)=>{
  try {
    // Create a new Course instance using the schema
    const { courseName, subject, chapters, noOfClasses, type, learnMode } = req.body;
    const course = await Course.create({
      courseName,
      subject,
      chapters,
      noOfClasses,
      type,
      learnMode,
    });

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ error: 'Error creating the course' });
  }
}

// const updateCourse = async(req, res) => {
//     const courseId = req.params.courseId;
//     const updatedAttributes = req.body;
//     CourseService.updateCourse(courseId, updatedAttributes);
//     res.json({ message: 'Course updated successfully' });
// };


// Route handler for student
const getCourseStudent = async (req, res) => {
  try {
    // Fetch course data specific to students (e.g., only certain details)
    const courses = await Course.find({}, 'name subject');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route handler for course developer/content developer
const getCourseDeveloper = async (req, res) => {
  try {
    // Fetch course data specific to course developers/content developers
    const courses = await Course.find({}, 'name subject chapters noOfClasses type learnMode');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    createCourse,
    updateCourse
}