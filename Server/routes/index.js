const users = require('./users');
const register = require('./register');
const update = require('./update');
const login = require('./login');

module.exports = function(app){
    app.use('/users', users)
    app.use('/register', register)
    app.use('/update', update)
    app.use('/login', login)
}