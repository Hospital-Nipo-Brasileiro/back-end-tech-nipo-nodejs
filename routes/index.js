const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("TechNipo")
    })
}

module.exports = routes;