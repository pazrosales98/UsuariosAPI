const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class BitacoraDao extends DaoObject{
  constructor(db = null) {
    console.log('Bitacora db: ', db);
    super(db);
  }
  async setup() {
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS bitacora (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, description TEXT, date TEXT, amount DECIMAL, category TEXT );';
      await this.run(createStatement);
    }
  }

  getAll() {
    return this.all(
      'SELECT * from bitacora;', []
    );
  }

  getById({ codigo }) {
    const sqlstr = 'SELECT * from bitacora where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({ type , description  , amount , category }) {
    const date = new Date().toISOString();
    const sqlstr = 'INSERT INTO bitacora (type , description  , amount , category, date) values (?, ?, ?, ?, ?);';
    const sqlParamArr = [type , description  , amount , category, date];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({ codigo, type , description  , amount , category }) {
    const sqlstr = 'UPDATE bitacora set type  =?, description   =?, amount  =?, category =?, where id = ?;';
    const sqlParamArr = [type , description  , amount , category, codigo];
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM bitacora where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }

}