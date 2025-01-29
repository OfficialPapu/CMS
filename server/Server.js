const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const { loginRouter, registerRouter, getStudentsRouter, updateStudentRouter, addPurchaseRouter, getPurchaseRouter } = require('./routes/routes');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', loginRouter);
app.use('/api', registerRouter);
app.use('/api', getStudentsRouter);
app.use('/api', updateStudentRouter);
app.use('/api', addPurchaseRouter);
app.use('/api', getPurchaseRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});