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
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    
    try{
        const [rows, fields] = await connection.execute("SELECT * FROM user");
        return rows
    }catch(error) {
        console.log("getUserList: ", error);
    }
}

const deleteUser = async (userId) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try{
        await connection.execute('DELETE FROM user WHERE id =?', [userId]);
    }catch(error) {
        console.log("deleteUser: ", error);
    }
    
}

const getUserById = async (userId) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try{
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id =?', [userId]);
        return rows;
    }catch(error) {
        console.log("getUserById: ", error);
    }
}

const updateUserInfor = async (email, username, userId) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try{
        await connection.execute('UPDATE user set email = ? , username = ? WHERE id = ?', [email, username, userId]);

    }catch(error) {
        console.log("deleteUser: ", error);
    }
}


module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfor
}