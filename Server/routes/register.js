const Router = require('express-promise-router');

const db = require('../database/database');

const router =  new Router();

// Register User route
router.post('/', async(req, res) => {
    const { firstname, lastname, email, password, address, city, country, currency } = req.body;
    try {
        // Check if the fields are empty
        if(firstname == undefined || firstname == "" || lastname == undefined || lastname == ""
        || email == undefined || email == "" || password == undefined || password == ""
        || address == undefined || address == "" || city == undefined || city == ""
        || country == undefined || country == "" || currency == undefined || currency == ""){

            // If its empty return a message fill all Fields
            res.status(401).json({
                message: "Fill all Fields",
                status: res.statusCode

            })
        } else {
            const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`,[email]);
            if (rows.length > 0) { // If the rows is greater than 0 then the email already exists
                res.json({message: "Email is already taken"});
            } else {
                const result = await db.query(`INSERT INTO users (firstname, lastname, email, password, address, city, country,
                    currency) VALUES ($1, $2, $3, crypt($4, gen_salt('bf', 8)), $5, $6, $7, $8)`,[firstname, 
                    lastname, email, password, address, city, country, currency]);

                    res.json({message: "Registration successful"});
            }
        }

        
    } catch (err) {
        res.status(404).json({message : "Something went wrong"});
    }
    
})

module.exports = router;