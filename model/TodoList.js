class TodoList{
    constructor(id, idUser, descr){
        this._id = id
        this._idUser = idUser
        this._descr = descr
    }

    set id(int){
        this._id = int
    }
    get id(){
        return this._id
    }


    set idUser(int){
        this._idUser = inde
    }
    get idUser(){
        return this._idUser
    }

    set descr(string){
        this._descr = string
    }
    get descr(){
        return this._descr
    }

}

module.exports = {TodoList}