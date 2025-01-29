const express = require('express');
const router = express.Router();
const { loginController, registerStudentController, getStudentsController, updateStudentController, addPurchaseController, getPurchaseController, getSummaryController, getSummaryDetailController, updateTotalDueController, getreportsController } = require('../controllers/controllers');

const loginRouter = router.post('/login', loginController);
const registerRouter = router.post('/register', registerStudentController);
const getStudentsRouter = router.get('/students', getStudentsController);
const updateStudentRouter = router.put('/students/:student_id', updateStudentController);
const addPurchaseRouter = router.post('/purchases', addPurchaseController);
const getPurchaseRouter = router.get('/purchases', getPurchaseController);
const getSummaryRouter = router.get('/summary', getSummaryController);
const getSummaryDetailRouter = router.get('/summary/:student_id', getSummaryDetailController);
const updateTotalDueRouter = router.put('/summary/:student_id', updateTotalDueController);
const getreportsRouter = router.get('/reports', getreportsController);
module.exports = { loginRouter, registerRouter, getStudentsRouter, updateStudentRouter, addPurchaseRouter, getPurchaseRouter, getSummaryRouter, getSummaryDetailRouter, updateTotalDueRouter, getreportsRouter };