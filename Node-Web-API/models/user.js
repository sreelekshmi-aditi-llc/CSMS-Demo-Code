const pool = require('../models/config/db');
const User = {
    async createUser(username, email, password) {
        const query = `INSERT INTO users_demo (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const values = [username, email, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

//Find User by email/username
    async findUserByEmail(email) {
        const query = `SELECT * FROM users_demo WHERE email = $1`;
        const result = await pool.query(query, [email]);
        console.log(result.rows[0]);
        
        return result.rows[0];
    }
};


  module.exports = User;