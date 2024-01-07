const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path'); // Add the path module
const databaseRoutes = require('./routes/databaseRoutes');

const achatRoute = require('./routes/achatRoute');
const userRoute = require('./routes/userRoute');
const optionsRoute = require('./routes/optionsRoute');
const vehiculeRoute = require('./routes/vehiculeRoute');
const modeleRoute = require('./routes/modeleRoute');
const moteurRoute = require('./routes/moteurRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        // rename the file to be the name of the model with the extension which is in the ..src/ folder
        const extension = file.originalname.split('.')[1];
        const newImageName = `${req.body.nom}.${extension}`;
        cb(null, newImageName);

    },
});

const upload = multer({ storage: storage });

app.use('/api/database', databaseRoutes);
app.use('/api/user', userRoute);
app.use('/api/achat', achatRoute);
app.use('/api/options', optionsRoute);
app.use('/api/vehicule', vehiculeRoute);
app.use('/api/modele', upload.single('image'), modeleRoute);
app.use('/api/moteurs', moteurRoute);

app.use('/src', express.static('src')); // Serve files from the 'uploads' folder

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
