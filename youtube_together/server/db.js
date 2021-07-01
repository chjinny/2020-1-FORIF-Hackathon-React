const mysql = require('mysql');

const db = mysql.createPool({
    host: '13.209.152.251',
    port: '50495',
    user: 'user',
    password: 'user',
    database: 'youtube_together'
});

module.exports = db;