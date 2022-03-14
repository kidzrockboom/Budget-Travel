const Router = require('express-promise-router');

const db = require('../database/database');

const router =  new Router();

router.patch('/:id', async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const { rows } = await db.query(`UPDATE users SET firstname = $1, lastname = $2, email = $3, address = $4, 
                                city = $5, country = $6, currency = $7 where user_id = $8 returning *`,[body.firstname, 
                                body.lastname, body.email, body.address, body.city, 
                                body.country, body.currency, id]);
        res.send(rows[0]);
    } catch (err) {
        console.log(err);
    }
    
})

module.exports = router;