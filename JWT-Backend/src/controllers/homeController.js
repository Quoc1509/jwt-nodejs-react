

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUsePage = (req, res) => {
    return res.render("users.ejs");
}

module.exports = {
    handleHelloWorld,
    handleUsePage
}