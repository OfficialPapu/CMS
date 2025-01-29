const express = require('express');
const router = express.Router();
const { loginController, registerStudentController, getStudentsController,updateStudentController } = require('../controllers/controllers');

const loginRouter = router.post('/login', loginController);
const registerRouter = router.post('/register', registerStudentController);
const getStudentsRouter = router.get('/students', getStudentsController);
const updateStudentRouter = router.put('/students/:student_id', updateStudentController);
module.exports = { loginRouter, registerRouter, getStudentsRouter, updateStudentRouter };