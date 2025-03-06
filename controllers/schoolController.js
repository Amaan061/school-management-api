const { addSchool, getAllSchools } = require('../models/schoolModel');


const createSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const result = await addSchool(name, address, latitude, longitude); 
        res.json({ message: 'School added successfully', schoolId: result.insertId });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const results = await getAllSchools(); 

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        results.forEach(school => {
            const schoolLat = parseFloat(school.latitude);
            const schoolLon = parseFloat(school.longitude);
            school.distance = getDistance(userLat, userLon, schoolLat, schoolLon);
        });

        results.sort((a, b) => a.distance - b.distance);
        res.json(results);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to calculate geographical distance
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

module.exports = { createSchool, listSchools };
