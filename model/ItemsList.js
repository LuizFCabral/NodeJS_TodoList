class ItemsList{
    constructor(id, idList, descr, sts, priority){
        this._id = id
        this._idList = idList
        this._descr = descr
        this._sts = sts
        this._priority = priority
    }
    
    set id(int){
        this._id = int
    }
    get id(){
        return this._id
    }


    set idList(int){
        this._idList = int
    }
    get idList(){
        return this._idList
    }

    set descr(string){
        this._descr = string
    }
    get descr(){
        return this._descr
    }

    set sts(string){
        this._sts = string
    }
    get sts(){
        return this._sts
    }

    set priority(string){
        this._priority = string
    }
    get priority(){
        return this._priority
    }

}

module.exports = {ItemsList}