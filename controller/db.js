const conectar = async ()=>{
    if(global.conexao && global.conexao.state != 'disconected') return global.conexao
    const mysql=require('mysql2/promise')
    const con=mysql.createConnection("mysql://root:mariagorete@localhost:3306/todo_list")
    global.conexao=con
    return con
}

module.exports = {conectar}