const db = require('./db');

const conectar = db.conectar()

const insertItemsList = async (objItemsList) => {
    const con = await conectar
    const query = "insert into items_list (nome, login, psw) values(?, ?, ?)"
    const values = [objItemsList.nome, objItemsList.login, objItemsList.psw]
    await con.query(query, values)
}

const updateItemsList = async (objItemsList) => {
    const con = await conectar
    const query = "update items_list set idList = ?, descr = ?, sts = ? priority = ? where id = ?"
    const values = [objItemsList.idList, objItemsList.descr, objItemsList.sts, objItemsList.priority, objItemsList.id]
    await con.query(query, values)
}

const deleteItemsList = async (objItemsList) => {
    const con = await conectar
    const query = "delete from items_list where id = ?"
    const values = [objItemsList.id]
    await con.query(query, values)
}

const selectAllItemsList = async () => {
    const con = await conectar 
    const [allItems] = await con.query("select login from items_list where login = ? and psw = ?")
    return await allItems
}

module.exports = {insertItemsList, updateItemsList, deleteItemsList, selectAllItemsList}