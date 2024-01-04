const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const databaseRoutes = require('./routes/databaseRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/database', databaseRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
