const DaoObject = require('../../dao/DaoObject');
module.exports = class Usuario {
  usuarioDao = null;

  constructor ( usuarioDao = null) {
    if (!(usuarioDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.usuarioDao = usuarioDao;
  }
  async init(){
    await this.usuarioDao.init();
    this.usuarioDao.setup();
  }
  async getUsuarioVersion () {
    return {
      entity: 'Usuarios',
      version: '1.0.0',
      description: 'CRUD de Usuarios'
    };
  }

  async addUsuario ({
    status,
    email,
    password,
    nombre,
    avatar
  }) {
    const result =  await this.usuarioDao.insertOne(
      {
        status,
        email,
        password,
        nombre,
        avatar
      }
    );
    return {
        status,
        email,
        password,
        nombre,
        avatar, id: result.lastID
    };
  };

  async getUsuario () {
    return this.usuarioDao.getAll();
  }

  async getUsuarioById ({ codigo }) {
    return this.usuarioDao.getById({codigo});
  }

  async updateUsuario({codigo,
    status,
    email,
    password,
    nombre,
    avatar,
    }) {
    const result = await this.usuarioDao.updateOne({
      codigo,
      status,
      email,
      password,
      nombre,
      avatar });
    return {
        status,
        email,
        password,
        nombre,
        avatar,
      modified: result.changes
    }
  }


  async deleteUsuario({ codigo }) {
    const usuarioToDelete = await this.usuarioDao.getById({codigo});
    const result = await this.usuarioDao.deleteOne({ codigo });
    return {
      ...usuarioToDelete,
      deleted: result.changes
    };
  }
}