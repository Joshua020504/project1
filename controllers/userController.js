const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  try {

    const [rows] = await pool.query('SELECT id, fullname, username, created_at, updated_at FROM users');
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT id, fullname, username, created_at, updated_at FROM users WHERE user_id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  const { fullname, username, passwords } = req.body;

  try {
    // Hash the password correctly using the 'passwords' variable
    const hashedPassword = await bcrypt.hash(passwords, 10);

    // Execute the query to insert the user data into the database
    const [result] = await pool.query(
      'INSERT INTO users (fullname, username, passwords) VALUES (?, ?, ?)',
      [fullname, username, hashedPassword]
    );

    // Return the response with the newly created user's information
    res.status(201).json({ id: result.insertId, fullname, username });
  } catch (err) {
    // Handle errors gracefully
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, passwords } = req.body;

    // Log the input
    console.log('Request Body:', req.body);

    try {
        let query = 'UPDATE users SET fullname = ?, username = ?';
        const params = [fullname, username];

        if (passwords) {
            const hashedPassword = await bcrypt.hash(passwords, 10);
            query += ', passwords = ?';
            params.push(hashedPassword);
        }

        query += ' WHERE id = ?';
        params.push(id);

        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
