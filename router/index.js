module.exports = {
    route: "/",
    /**
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    async router(req, res) {
        res.set('Cache-Control', 'public, max-age=300, smax-age=600')
        res.render('index');
    }
}