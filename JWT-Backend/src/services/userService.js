import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index'

// //create the connection database
// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt',
//     Promise: bluebird
// });

const salt = bcrypt.genSaltSync(10);

const handleHashPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const createNewUser = async (email, password, username) => {
    //create the connection database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // let hashPass = handleHashPassword(password);
    // try{
    //     await connection.execute(
    //         'INSERT INTO user (email, password, username) VALUES (?, ?, ?)',
    //             [email, hashPass, username]);
    // }catch(error) {
    //     console.log("createNewUser: ", error);
    // }
    let hashPass = handleHashPassword(password);
    try{
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    }catch(error) {
        console.log('createNewUser: ', error);
    }
}

const getUserList = async () => {
    //create the connection database
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    
    // try{
    //     const [rows, fields] = await connection.execute("SELECT * FROM user");
    //     return rows
    // }catch(error) {
    //     console.log("getUserList: ", error);
    // }
    
    //test relationship
    let newUser = await db.User.findOne({
        where: {id: 1},
        include: {model: db.Group, attributes: ["name", "description"]},
        attributes: ["id", "username", "email"],
        raw: true,
        nest: true
    })
    console.log('check new User: ', newUser)

    let roles = await db.Role.findAll({
        include: {model: db.Group, where: {id: 1}},
        
        raw: true,
        nest: true
    })

    console.log('check new Roles: ', roles)
    let users = [];
    users = await db.User.findAll();
    return users

}

const deleteUser = async (userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try{
    //     await connection.execute('DELETE FROM user WHERE id =?', [userId]);
    // }catch(error) {
    //     console.log("deleteUser: ", error);
    // }

    await db.User.destroy({
        where: {
            id: userId
        }
    })
    
}

const getUserById = async (userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try{
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id =?', [userId]);
    //     return rows;
    // }catch(error) {
    //     console.log("getUserById: ", error);
    // }
    let user = {}
    user = await db.User.findOne({
        where: {
            id: userId
        }
    })

    return user.get({plain: true});
}

const updateUserInfor = async (email, username, userId) => {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try{
    //     await connection.execute('UPDATE user set email = ? , username = ? WHERE id = ?', [email, username, userId]);

    // }catch(error) {
    //     console.log("deleteUser: ", error);
    // }
    await db.User.update(
        {
            email: email,
            username: username,
            
        },
        {
            where: {
                id: userId
            }
        }
    )
}


module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}