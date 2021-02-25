const express = require('express');
const app = express();
const Discord = require('discord.js');


module.exports = {
    create: function (client, option) {

        app.get('/api/', function (_req, res) {
            res.send('{ "message" : "Hello World" }');
        });

        app.get('/404', function (_req, res) {
            res.send('404');
        });

        app.get('/', function (_req, res) {
            res.send('여기왜 옴?');
        });

        app.listen(3000, () => {
            console.log("Server is Ready!");
        });
    }
};