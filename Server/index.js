require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mountsRoutes = require('./routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
const corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
mountsRoutes(app);
const db = require('./database/database');
const search = require('./services/search');

app.use('/search', search)


const { PORT } = process.env || 3000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})
