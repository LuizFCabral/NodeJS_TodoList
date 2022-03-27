const db = require('./db');

const conectar = db.conectar()

const insertUser = async (objUser) => {
    const con = await conectar
    const query = "insert into users (nome, login, psw) values(?, ?, ?)"
    const values = [objUser.nome, objUser.login, objUser.psw]
    await con.query(query, values)
}

const updateUser = async (objUser) => {
    const con = await conectar
    const query = "update users set nome = ?, login = ?, psw = ? where id = ?"
    const values = [objUser.id, objUser.nome, objUser.login, objUser.psw]
    await con.query(query, values)
}

const deleteUser = async (objUser) => {
    const con = await conectar
    const query = "delete from users where id = ?"
    const values = [objUser.id]
    await con.query(query, values)
}

const selectUser = async (objUser) => {
    const con = await conectar
    const query = "select login from users where login = ? and psw = ?"
    const values = [objUser.login, objUser.psw]
    const user = await con.query(query, values)
    
    return await user
}

/*
const listAll = async () => {
    const con = await conectar
    const [allUser] = ("select * from users")
}
*/


module.exports = {insertUser, updateUser, deleteUser, selectUser}