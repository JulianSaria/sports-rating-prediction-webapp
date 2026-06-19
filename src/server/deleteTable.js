const {createPool} = require("mysql2");
const {database} = require("./config");

const deleteTable = (table) => {

    const pool = createPool(database);

        pool.query(`DROP TABLE ${pool.escapeId(table)}`, (err, res) => {
            if (err) {
                console.error('Error deleting entries:', err);
            } else {
                console.log('Entries deleted successfully');
            }
        });
     //pool.end();
}

module.exports = deleteTable;