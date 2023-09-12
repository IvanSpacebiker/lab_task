/* TODO:
 LIKE % SQL
*/

class Books {
    constructor(method, title, author, id) {
        this.request = ``;
        this.table = "Books";
        this.method = method;
        this.title = title;
        this.author = author;
        this.id = id;

        switch(this.method) {

            case "get":
                this.request = `SELECT * FROM ${this.table} `;

                if (this.title || this.author || this.id) {
                    this.request += `WHERE `;
                    let conditions = [];
                    if (this.title) {
                        conditions.push(`booktitle='${this.title}'`);
                    }
                    if (this.author) {
                        conditions.push(`bookauthor='${this.author}'`);
                    }
                    if (this.id) {
                        conditions.push(`bookid='${this.id}'`);
                    }
                    this.request += conditions.join(" AND ");
                }
                break;

            case "post":

                if (this.id != undefined) {
                    this.request = `UPDATE ${this.table} SET `;

                    if (this.title || this.author) {
                        let conditions = [];
                        if (this.title) {
                            conditions.push(`booktitle='${this.title}'`);
                        }
                        if (this.author) {
                            conditions.push(`bookauthor='${this.author}'`);
                        }
                        this.request += conditions.join(", ");
                    } else {
                        throw new Error("You should type what you want to edit!");
                    }
                } else {
                    if (this.title && this.author) {
                        this.request = `INSERT INTO ${this.table} (booktitle, bookauthor) VALUES ('${this.title}', '${this.author}')`;
                    } else {
                        throw new Error("You should fill all fields (title and author)");
                    }
                }

                break;

            case "delete":
                this.request = `DELETE FROM ${this.table}`;

                if (this.title || this.author || this.id) {
                    this.request += `WHERE `;
                    let conditions = [];
                    if (this.title) {
                        conditions.push(`booktitle='${this.title}'`);
                    }
                    if (this.author) {
                        conditions.push(`bookauthor='${this.author}'`);
                    }
                    if (this.id) {
                        conditions.push(`bookid='${this.id}'`);
                    }
                    this.request += conditions.join(" AND ");
                }

                break;
            }
        
    }
}

module.exports = Books;