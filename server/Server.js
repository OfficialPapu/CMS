const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const {loginrouter} = require('./routes/routes');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', loginrouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});