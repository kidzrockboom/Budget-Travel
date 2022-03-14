const Router = require('express-promise-router');

const db = require('../database/database');

const router =  new Router();

router.get('/', async(req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        res.send(rows);
    } catch (err) {
        console.log(err);
    }
    
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const { rows } = await db.query(`SELECT * FROM users WHERE user_id = $1`,[id]);
        res.send(rows[0]);
    } catch (err) {
        console.log(err);
    }
    
})

module.exports = router;