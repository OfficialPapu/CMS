const e = require('express');
const db = require('../Config/dbConnection');

const loginController = async (req, res) => {
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

};

const registerStudentController = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!email || !name || !phone) {
        return res.status(400).json({ error: 'Name, email and phone are required' });
    }

    try {
        const [existingStudent] = await db.query(
            'SELECT * FROM students WHERE phone = ?',
            [phone]
        );

        if (existingStudent.length > 0) {
            return res.status(409).json({ error: 'Student already exists' });
        }

        await db.query(
            'INSERT INTO students (Name, Email, Phone, created_at) VALUES (?, ?, ?, NOW())',
            [name, email, phone]
        );

        return res.status(201).json({ message: 'Student registered successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStudentsController = async (req, res) => {
    try {
        const [students] = await db.query('SELECT * FROM students');
        return res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateStudentController = async (req, res) => {
    const { student_id } = req.params;

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email and phone are required' });
    }

    try {
        const [existingStudent] = await db.query(
            'SELECT * FROM students WHERE student_id = ?',
            [student_id]
        );

        if (existingStudent.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        await db.query(
            'UPDATE students SET name = ?, email = ?, phone = ? WHERE student_id = ?',
            [name, email, phone, student_id]
        );

        return res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPurchaseController = async (req, res) => {
    try {
        const [purchases] = await db.query('SELECT p.*, s.*, DATE_FORMAT(p.purchase_date, "%Y-%m-%d") AS purchase_date FROM purchases p JOIN students s ON s.student_id = p.student_id');
        return res.status(200).json({ purchases });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const addPurchaseController = async (req, res) => {
    const { student_id, item, price, date } = req.body;
    if (!student_id || !item || !price || !date) {
        return res.status(400).json({ error: 'Student ID, item, price and date are required' });
    }

    try {
        await db.query(
            'INSERT INTO purchases (student_id, item, total_price, purchase_date) VALUES (?, ?, ?, ?)',
            [student_id, item, price, date]
        );

        return res.status(201).json({ message: 'Purchase recorded successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSummaryController = async (req, res) => {
    try {
        const [Summary] = await db.query(`SELECT s.student_id, s.name, s.email, s.phone FROM students s`);
        return res.status(200).json({ Summary });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSummaryDetailController = async (req, res) => {
    const { student_id } = req.params;
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    const [Summary] = await db.query(`SELECT p.*, DATE_FORMAT(p.purchase_date, "%Y-%m-%d") AS purchase_date FROM purchases p WHERE student_id = ?`, [student_id]);
    return res.status(200).json({ Summary });
};

const updateTotalDueController = async (req, res) => {
    const { student_id } = req.params;
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }
    await db.query(
        `UPDATE purchases SET total_price='0' WHERE student_id = ?`,[ student_id]
    );
    return res.status(200).json({ message: 'Student updated successfully' });
};

module.exports = { loginController, registerStudentController, getStudentsController, updateStudentController, getPurchaseController, addPurchaseController, getSummaryController, getSummaryDetailController, updateTotalDueController };