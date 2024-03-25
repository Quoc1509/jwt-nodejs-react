import userService from '../services/userService'


const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUsePage = async (req, res) => {
    let userList = await userService.getUserList();
    
    return res.render("users.ejs", {userList});
}

const handleCreateNewUser = (req, res) => {
    console.log("scheck request: ", req.body)
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    userService.createNewUser(email, password, username);

    return res.redirect("/user");
}

const handleDeleteUser = (req, res) => {
    userService.deleteUser(req.params.id);
    return res.redirect('/user');
}

const getUpdateUserPage = async (req, res) => {
    let user = await userService.getUserById(req.params.id);
    // let userData = {};
    // if(user && user.length > 0){
    //     userData = user[0]
    // }
    let userData = {};
    userData = user
    return res.render("user-update.ejs", {userData});
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfor(email, username, id);
    return res.redirect("/user")
}

module.exports = {
    handleHelloWorld,
    handleUsePage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}