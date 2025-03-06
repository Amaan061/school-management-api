const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the School Management API 🚀',
        usage: 'Here are the available endpoints:',
        endpoints: {
            addSchool: {
                method: 'POST',
                url: 'https://school-management-api-smaw.onrender.com/api/addSchool',
                description: 'Add a new school. Send name, address, latitude, and longitude in the request body.',
                exampleRequest: {
                    method: 'POST',
                    url: 'https://school-management-api-smaw.onrender.com/api/addSchool',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: {
                        "name": "ABC High School",
                        "address": "123 Main St, City",
                        "latitude": 37.7749,
                        "longitude": -122.4194
                    }
                }
            },
            listSchools: {
                method: 'GET',
                url: 'https://school-management-api-smaw.onrender.com/api/listSchools?latitude=37.7749&longitude=-122.4194',
                description: 'Get a list of schools sorted by proximity. Pass latitude and longitude as query parameters.',
                exampleRequest: {
                    method: 'GET',
                    url: 'https://school-management-api-smaw.onrender.com/api/listSchools?latitude=37.7749&longitude=-122.4194'
                }
            }
        }
    });
});


app.use('/api', schoolRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
