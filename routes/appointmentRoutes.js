const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  bookAppointment,
  getAppointmentsByUser
} = require('../controllers/appointmentController');

router.post('/', authMiddleware, bookAppointment);
router.get('/:userId', authMiddleware, getAppointmentsByUser);

module.exports = router;
