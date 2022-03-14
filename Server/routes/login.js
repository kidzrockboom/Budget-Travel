const Router = require('express-promise-router');

const db = require('../database/database');

const router =  new Router();

router.post('/', async(req, res) => {
    const { body } = req;
    try {
        const { rows } = await db.query(`SELECT * FROM users WHERE email = $1 AND
                                password = crypt($2, password)`,[body.email, body.password]);
        if (rows.length === 0) {
            res.json({message: "Email or password is invalid"});
        } else {
            res.send(rows[0]);
        }
    } catch (err) {
        console.log(err);
    }
    
})

module.exports = router;