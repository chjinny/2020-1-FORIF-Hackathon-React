const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./db');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/test', (req, res) => {
    res.send({ check : 'connected' });
})
app.get('/api/video/list', (req, res) => {
    const query = "SELECT v.id, v.url FROM youtube_together.video_list as v WHERE v.id > (SELECT max(id) as id FROM youtube_together.on_air as a WHERE a.fin = 1);"
    //console.log(query)
    db.query(query, (err, data) => {
        if(!err) {
            res.send(data);
            
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.get('/api/chat/list', (req, res) => {
    db.query("SELECT * FROM youtube_together.chat ORDER BY id DESC LIMIT 20;", (err, data) => {
        if(!err) {
            //console.log(data);
            res.send(data);
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.get('/api/video/vid_on_air', (req, res) => {
    const date = new Date();
    db.query("SELECT o.id, v.url, o.init FROM youtube_together.on_air as o, youtube_together.video_list as v WHERE o.fin = 0 and o.id = v.id ORDER BY init DESC LIMIT 1;", (err, data) => {
        if(!err) {
            res.send(data);
            
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.get('/api/video/top', (req, res) => {
    const date = new Date();
    db.query("SELECT max(id) as id FROM on_air WHERE fin = 1", (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})

app.post('/api/video/next', (req, res) => {
    const id = req.body.id
    db.query("INSERT INTO `youtube_together`.`on_air` (`id`) (SELECT min(id) FROM youtube_together.video_list WHERE id >" + id + ");", (err, data) => {
        if(!err) {
            //console.log(data);
            res.send(data);
            
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.post('/api/video/fin', (req, res) => {
    const id = req.body.id
    db.query("UPDATE `youtube_together`.`on_air` SET `fin` = '1' WHERE (`id` = " + id + ");", (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.post('/api/video/insert', (req, res) => {
    const url = req.body.url
    db.query("INSERT INTO `youtube_together`.`video_list` (`url`) VALUES ('"+ url+"');", (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.post('/api/chat/insert', (req, res) => {
    const content = req.body.content
    const name = req.body.name
    db.query("INSERT INTO `youtube_together`.`chat` (`content`, `name`) VALUES ('" + content + "','" + name + "');", (err, data) => {
        if(!err) {
            //console.log(data);
            res.send(data);
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.post('/api/video/delete', (req, res) => {
    const id = req.body.id
    const query = "DELETE FROM `youtube_together`.`video_list` WHERE (`id` = '"+ id +"');";
    console.log(query);
    db.query(query, (err, data) => {
        if(!err) {
            //console.log(data);
            res.send(data);
        } else {
            //console.log(err);
            res.send(err);
        }
    })
})
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})