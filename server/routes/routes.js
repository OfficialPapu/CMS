const express = require('express');
const router = express.Router();
const { loginController, registerStudentController, getStudentsController,updateStudentController, addPurchaseController, getPurchaseController } = require('../controllers/controllers');

const loginRouter = router.post('/login', loginController);
const registerRouter = router.post('/register', registerStudentController);
const getStudentsRouter = router.get('/students', getStudentsController);
const updateStudentRouter = router.put('/students/:student_id', updateStudentController);
const addPurchaseRouter = router.post('/purchases', addPurchaseController);
const getPurchaseRouter = router.get('/purchases', getPurchaseController);
module.exports = { loginRouter, registerRouter, getStudentsRouter, updateStudentRouter, addPurchaseRouter, getPurchaseRouter };