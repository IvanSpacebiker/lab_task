class Readers {
    constructor(method, name, surname, id) {
        this.request = ``;
        this.table = "Readers";
        this.method = method;
        this.name = name;
        this.surname = surname;
        this.id = id;

        switch(this.method) {

            case "get":
                this.request = `SELECT * FROM ${this.table} `;

                if (this.name || this.surname || this.id) {
                    this.request += `WHERE `;
                    let conditions = [];
                    if (this.name) {
                        conditions.push(`readername='${this.name}'`);
                    }
                    if (this.surname) {
                        conditions.push(`readersurname='${this.surname}'`);
                    }
                    if (this.id) {
                        conditions.push(`readerid='${this.id}'`);
                    }
                    this.request += conditions.join(" AND ");
                }
                break;
    
            case "post":
                if (this.id != undefined) {

                    this.request = `UPDATE ${this.table} SET `;

                    if (this.name || this.surname) {
                        let conditions = [];
                        if (this.name) {
                            conditions.push(`readername='${this.name}'`);
                        }
                        if (this.surname) {
                            conditions.push(`readersurname='${this.surname}'`);
                        }
                        this.request += conditions.join(", ");
                    } else {
                        throw new Error("You should type what you want to edit!");
                    }

                    this.request += ` WHERE readerid='${this.id}'`
                } else {
                    if (this.name && this.surname) {
                        this.request = `INSERT INTO ${this.table} (readername, readersurname) VALUES ('${this.name}', '${this.surname}')`;
                    } else {
                        throw new Error("You should fill all fields (name and surname)");
                    }
                }
                break;
                
            case "delete":
                this.request = `DELETE FROM ${this.table} `;

                if (this.name || this.surname || this.id) {
                    this.request += `WHERE `;
                    let conditions = [];
                    if (this.name) {
                        conditions.push(`readername='${this.name}'`);
                    }
                    if (this.surname) {
                        conditions.push(`readersurname='${this.surname}'`);
                    }
                    if (this.id) {
                        conditions.push(`readerid='${this.id}'`);
                    }
                    this.request += conditions.join(" AND ");
                }

                break;
            }
        
    }
}

module.exports = Readers;