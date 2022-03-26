require('dotenv').config();
const Router = require('express-promise-router');

const db = require('../database/database');

const router =  new Router();
const webToken = require('jsonwebtoken');

// Login user route
router.post('/', async(req, res) => {
    const { email, password } = req.body;
    try {

        // Check if the username and passwords fields are empty
        if(email == undefined || email == "" || password == undefined || password == ""){

            res.status(401).json({
                message: "Fill all Fields",
                status: res.statusCode

            })

        } else {
            const { rows } = await db.query(`SELECT * FROM users WHERE email = $1 AND
                                            password = crypt($2, password)`,[email, password]);
            if (rows.length < 1) { // If the rows is 0 then the user email doesnt exist
                res.status(401).json({
                    message: "Email or Password is incorrect"
                })

            } else {
                console.log(rows)
                const userDetails = {
                    firstname : rows[0].firstname,
                    lastname : rows[0].lastname,
                    email : rows[0].email,
                    id: rows[0].user_id
                }

                // Create a web token to send to front end and secret key validation
                const token = webToken.sign(userDetails, process.env.SECRET_KEY, {expiresIn: "60s"});

                res.status(200).json({
                    message: "Logged In Successfully",
                    status: res.statusCode,
                    token
                })
            }
        }

    } catch (err) { // If error console log the error
        console.log(err);
    }
    
})

module.exports = router;