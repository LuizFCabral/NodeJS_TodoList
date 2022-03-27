class User{
    constructor(id, name, login, psw){
        this._id = id
        this._name = name
        this._login = login
        this._psw = psw
    }

    set id(int){
        this._id = int
    }
    get id(){
        return this._id
    }


    set name(string){
        this._name = string
    }
    get name(){
        return this._name
    }

    set login(string){
        this._login = string
    }
    get login(){
        return this._login
    }

    set psw(string){
        this._psw = string
    }
    get psw(){
        return this._psw
    }

}

module.exports = {User}