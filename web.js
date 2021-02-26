const express = require('express');
const app = express();
const Discord = require('discord.js');


module.exports = {
    create: function (client) {

        app.get('/api/', function (_req, res) {
            res.send('{ "message" : "Hello World" }');
        });

        app.get('/404', function (_req, res) {
            res.send('404');
        });

        app.get('/', function (_req, res) {
            res.send('/api 로 가봐');
        });

        app.listen(3000, () => {
            console.log("[System] WebServer is Ready!");
        });
    }
};