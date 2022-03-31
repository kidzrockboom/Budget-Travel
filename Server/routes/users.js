const Router = require('express-promise-router');

require('dotenv').config();

const db = require('../database/database');
const webToken = require('jsonwebtoken');

const router =  new Router();

router.get('/', async(req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        res.send(rows);
    } catch (err) {
        console.log(err);
    }
    
})

router.get('/profile', async(req, res) => {
    // validate user 
    
    const authHeader = req.headers["authorization"];

    if (authHeader) {
        const token = authHeader.substr("Bearer".length + 1);
        webToken.verify(token, process.env.SECRET_KEY, (err, userDetails) => {
            // Send user data if authentication is correct
            if (userDetails) {
                res.status(200).json({
                message: "Success",
                status: res.statusCode,
                data: userDetails 
        })
            }
        })
        // Else ask the user to sign 
    } else {
        res.status(401).json({
            message: "Please Login",
            status: res.statusCode,
            token: ""
        })
    }

    // const { id } = req.params;
    // try {
    //     console.log(id);
    //     const { rows } = await db.query(`SELECT * FROM users WHERE user_id = $1`,[id]);
    //     res.send(rows[0]);
    // } catch (err) {
    //     console.log(err);
    // }
    
})

module.exports = router;