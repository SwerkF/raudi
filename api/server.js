const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const databaseRoutes = require('./routes/databaseRoutes');

const moteurRoute = require('./routes/moteurRoute')
const achatRoute = require('./routes/achatRoute')
const userRoute = require('./routes/userRoute')
const optionsRoute = require('./routes/optionsRoute')
const vehiculeRoute = require('./routes/vehiculeRoute')
const modeleRoute = require('./routes/modelRoute')

//const roleRoute = require('./routes/roleRoute')
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api/database', databaseRoutes);
app.use('/api/user', userRoute);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
