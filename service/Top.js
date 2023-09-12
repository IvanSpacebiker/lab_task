class Top {
    constructor(entity, from = "1970-01-01T00:00:01", to = "2038-01-19T00:00:00") {
        this.table = "Events";
        this.entity = entity + 'id';
        this.from = from.replace("T", " ");
        this.to = to.replace("T", " ");

        this.request = `
        SELECT COUNT(${this.entity}), ${this.entity} 
        FROM ${this.table} 
        WHERE eventtype = 'take' AND eventtime >= '${this.from}' AND eventtime <= '${this.to}' 
        GROUP BY ${this.entity} 
        ORDER BY COUNT(${this.entity}) DESC
        LIMIT 1`;

    }
}

module.exports = Top;