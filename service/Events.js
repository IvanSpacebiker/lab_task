class Events {
    constructor(action, bookid, readerid, clear) {
        this.request = ``;
        this.table = "Events";
        this.action = action;
        this.bookid = bookid;
        this.readerid = readerid;
        this.clear = clear;
        this.rawDate = new Date();
        this.date = `${this.rawDate.getFullYear()}-${this.rawDate.getMonth()+1}-${this.rawDate.getDate()} ${this.rawDate.getHours()}:${this.rawDate.getMinutes()}:${this.rawDate.getSeconds()}`

        this.request = `INSERT INTO ${this.table} (eventtype, eventtime, bookid, readerid) VALUES ('${this.action}','${this.date}','${this.bookid}','${this.readerid}')`;
    
        if (this.clear != undefined) {
            this.request = `DELETE FROM ${this.table}`;
        }
    }
}

module.exports = Events;