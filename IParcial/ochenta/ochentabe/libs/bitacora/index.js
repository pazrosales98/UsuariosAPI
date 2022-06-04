const DaoObject = require('../../dao/DaoObject');
module.exports = class Bitacora {
  bitacoraDao = null;

  constructor ( bitacoraDao = null) {
    if (!(bitacoraDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.bitacoraDao = bitacoraDao;
  }
  async init(){
    await this.bitacoraDao.init();
    this.bitacoraDao.setup();
  }
  async getBitacoraVersion () {
    return {
      entity: 'Bitacora',
      version: '1.0.0',
      description: 'Bitacora'
    };
  }

  async addBitacora ({
    type ,
    description,
    amount,
    category
  }) {
    const result =  await this.bitacoraDao.insertOne(
      {
        type ,
        description,
        amount,
        category
      }
    );
    return {
        type ,
        description,
        amount,
        category, id: result.lastID
    };
  };

  async getBitacora () {
    return this.bitacoraDao.getAll();
  }

  async getBitacoraById ({ codigo }) {
    return this.bitacoraDao.getById({codigo});
  }

  async updateBitacora({ codigo,
    type,
    description,
    amount,
    category,
    
    }) {
    const result = await this.bitacoraDao.updateOne({
      codigo,
      type ,
      description,
      amount,
      category });
    return {
        type ,
        description,
        amount,
        category,
        codigo,
      modified: result.changes
    }
  }


  async deleteBitacora({ codigo }) {
    const bitacoraToDelete = await this.bitacoraDao.getById({codigo});
    const result = await this.bitacoraDao.deleteOne({ codigo });
    return {
      ...bitacoraToDelete,
      deleted: result.changes
    };
  }
}