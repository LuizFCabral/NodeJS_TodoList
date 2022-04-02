const db = require('./db');

const conectar = db.conectar()

const insertTodoList = async (objTodoList) => {
    const con = await conectar
    const query = "insert into todo_list (idUser, descr) values(?, ?)"
    const values = [objTodoList.idUser, objTodoList.descr]
    await con.query(query, values)
}

const updateTodoList = async (objTodoList) => {
    const con = await conectar
    const query = "update todo_list set descr = ? where id = ?"
    const values = [objTodoList.descr, objTodoList.id]
    await con.query(query, values)
}

const deleteTodoList = async (objTodoList) => {
    const con = await conectar
    const query = "delete from todo_list where id = ?"
    const values = [objTodoList.id]
    await con.query(query, values)
}

const selectAllTodoList = async () => {
    const con = await conectar 
    const [allTodoList] = await con.query("select * from todo_list")
        return await allTodoList
}

module.exports = {insertTodoList, updateTodoList, deleteTodoList, selectAllTodoList}