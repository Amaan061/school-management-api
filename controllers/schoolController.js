const { addSchool, getAllSchools } = require('../models/schoolModel');

// here we are Adding a new school
const createSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    addSchool(name, address, latitude, longitude, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'School added successfully', schoolId: result.insertId });
    });
};

// Here we are Listing all schools sorted by proximity
const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    getAllSchools((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        results.forEach(school => {
            const schoolLat = parseFloat(school.latitude);
            const schoolLon = parseFloat(school.longitude);
            school.distance = getDistance(userLat, userLon, schoolLat, schoolLon);
        });

        results.sort((a, b) => a.distance - b.distance);
        res.json(results);
    });
};


function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

module.exports = { createSchool, listSchools };
