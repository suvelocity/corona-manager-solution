require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql",
    "define": {"underscored": true}
},
"test": {
    "username": "root",
    "password": "Michael!6425762",
    "database": "covidtest",
    "host": "localhost",
    "dialect": "mysql",
    "define": {"underscored": true}
},
"production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
}
};
