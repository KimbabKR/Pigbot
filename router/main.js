var index = require('./index');

module.exports =
/**
 * @param {import("express").Application} app 
 */
async app => {
    app.get(index.route, index.router);
}