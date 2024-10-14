const express = require ('express');
const { getAllStud, getStudById, createStud, updateStud, deleteStud } = require('../controllers/studentController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllStud);
router.get('/:id', authenticateToken, getStudById);
router.post('/', authenticateToken, createStud);
router.put('/:id', authenticateToken, updateStud);
router.delete('/:id', authenticateToken, deleteStud);

module.exports = router;