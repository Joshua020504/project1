const express = require ('express');
const { getAllCourses, getCoursesById, createCourses, updateCourses, deleteCourses } = require('../controllers/coursesControllers');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllCourses);
router.get('/:id', authenticateToken, getCoursesById);
router.post('/', authenticateToken, createCourses);
router.put('/:id', authenticateToken, updateCourses);
router.delete('/:id', authenticateToken, deleteCourses);

module.exports = router;