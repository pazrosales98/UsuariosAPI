const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class UsuarioDao extends DaoObject{
  constructor(db = null){
    console.log('UsuarioDao db: ', db);
    super(db);
  }
  async setup() {
    if (process.env.SQLITE_SETUP) {
      const createStatement = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, status TEXT, email TEXT, password TEXT, nombre TEXT, avatar TEXT, fchIngreso TEXT );';
      await this.run(createStatement);
    }
  }

  getAll() {
    return this.all(
      'SELECT * from usuarios;', []
    );
  }

  getById({ codigo }) {
    const sqlstr = 'SELECT * from usuarios where id=?;';
    const sqlParamArr = [codigo];
    return this.get(sqlstr, sqlParamArr);
  }

  insertOne({ status , email  , password , nombre , avatar}) {
    const fchIngreso = new Date().toISOString();
    const sqlstr = 'INSERT INTO usuarios (status, email  , password , nombre, avatar , fchIngreso) values (?, ?, ?, ?, ?, ?);';
    const sqlParamArr = [status , email  , password , nombre, avatar, fchIngreso];
    return this.run(sqlstr, sqlParamArr);
  }

  updateOne({ codigo, status , email  , password , nombre , avatar }) {
    const sqlstr = 'UPDATE usuarios set status    =?, email   =?, password  =?, nombre =?, avatar=? where id = ?;';
    const sqlParamArr = [status , email  , password , nombre , avatar , codigo];
    return this.run(sqlstr, sqlParamArr);
  }

  deleteOne({ codigo }) {
    const sqlstr = 'DELETE FROM usuarios where id = ?;';
    const sqlParamArr = [codigo];
    return this.run(sqlstr, sqlParamArr);
  }

}