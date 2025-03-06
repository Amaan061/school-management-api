const db = require('../config/db');

const addSchool = async (name, address, latitude, longitude) => {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [name, address, latitude, longitude]); 
    return result;
};

const getAllSchools = async () => {
    const query = 'SELECT * FROM schools';
    const [rows] = await db.query(query); 
    return rows;
};

module.exports = { addSchool, getAllSchools };
