require('dotenv').config();

module.exports = {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USERNAME,
    db_pass: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    SECRET: process.env.SECRET
}