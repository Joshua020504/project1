const express = require ('express');
const { getAllDepartment, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentControllers');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllDepartment);
router.get('/:id', authenticateToken, getDepartmentById);
router.post('/', authenticateToken, createDepartment);
router.put('/:id', authenticateToken, updateDepartment);
router.delete('/:id', authenticateToken, deleteDepartment);

module.exports = router;