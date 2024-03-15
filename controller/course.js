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

    res.status(200).json({
      success: true,
      message: 'Course created successfully',
      course 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error creating the course' 
    });
  }
}

exports.updateCourse = async (req, res) => {
  try {
      const courseId = req.params.courseId;
      const { courseName, subject, numberOfChapters, type, learnMode } = req.body;
      const updatedCourse = await Course.findByIdAndUpdate(courseId,{courseName, subject, numberOfChapters, type, learnMode},{new: true})

      res.status(200).json({ 
        success: true, 
        message: 'Course updated successfully',
        updatedCourse
      });

  } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error 
      });
  }
};

exports.getCoursesForStudent = async (req, res) => {
    try {
        const courses = await Course.find({}); 
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getCoursesForCourseDeveloper = async (req, res) => {
    try {
        if (req.user.role !== 'course-developer') {
            return res.status(403).json({ success: false, message: 'Access forbidden' });
        }

        const courses = await Course.find({ createdBy: req.user.userId }); 
        res.status(200).json({ success: true, courses });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



