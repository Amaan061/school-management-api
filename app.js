const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});


app.use('/api', schoolRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
