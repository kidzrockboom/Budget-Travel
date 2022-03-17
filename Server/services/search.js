const amadeus = require('./connect');

const Router = require('express-promise-router');

const router =  new Router();
const codes = require('../codes.json');

router.get(`/:parameter`, async (req, res) => {
    const { parameter } = req.params;
    // Which cities or airports start with the parameter variable
    try {
        const response = await amadeus.shopping.flightDestinations.get({
            origin: parameter
    })
    let { data } = response;
    let test = codes.filter(({Code}) => 
    data.some(o => o.destination == Code)
    );
    response.result.data.push(test);
    res.send(response.result);
    } catch (error) {

        console.log(error);
    }
   
});

module.exports = router;