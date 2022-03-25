const Router = require('express-promise-router');

const db = require('../database/database');

const router =  new Router();

router.post('/', async(req, res) => {
    const { body } = req;
    // Need to add session creations
    try {
        // Check the datebase for the users email and password if it exits
        const { rows } = await db.query(`SELECT * FROM users WHERE email = $1 AND
                                password = crypt($2, password)`,[body.email, body.password]);
        if (rows.length === 0) { // If it doesnt exist return error message
            res.json({message: "Email or password is invalid"});
        } else { // If it exists return that accounts information
            res.send(rows[0]);
        }
    } catch (err) { // If error console log the error
        console.log(err);
    }
    
})

module.exports = router;