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




const { PORT } = process.env || 3000;

app.get('/', (request, response) => {
    response.json({message: "Hello World"});
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})
