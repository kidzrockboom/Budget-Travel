const Router = require('express-promise-router');

const db = require('../database/database');

const router =  new Router();

router.post('/', async(req, res) => {
    const { body } = req;
    try {
        const result = await db.query(`INSERT INTO users (firstname, lastname, email, password, address, city, country,
                                currency) VALUES ($1, $2, $3, crypt($4, gen_salt('bf', 8)), $5, $6, $7, $8)`,[body.firstname, 
                                body.lastname, body.email, body.password, body.address, body.city, 
                                body.country, body.currency]);
        res.json({message: "Registration successful"});
    } catch (err) {
        console.log(err);
    }
    
})

module.exports = router;