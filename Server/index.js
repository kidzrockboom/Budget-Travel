require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mountsRoutes = require('./routes');
const Amadeus = require('amadeus');
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
const amadeus = require('./services/connect');


const { PORT } = process.env || 3000;

app.get('/', (request, response) => {
    response.json({message: "Hello World"});
});


app.get(`/city-and-airport-search/:parameter`, (req, res) => {
    const parameter = req.params.parameter;
    // Which cities or airports start with the parameter variable
    amadeus.referenceData.locations
        .get({
            keyword: parameter,
            subType: Amadeus.location.any,
        })
        .then(function (response) {
            res.send(response.result);
        })
        .catch(function (response) {
            res.send(response);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})
