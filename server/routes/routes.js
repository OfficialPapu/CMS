const express = require('express');
const router = express.Router();
const db = require('../Config/dbConnection');


const loginrouter = router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM admin WHERE Email = ? AND Password = ?',
            [email, password]
        );

        if (rows.length > 0) {
            return res.status(200).json({ message: 'Login successful', user: rows[0] });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

});

module.exports = {loginrouter};