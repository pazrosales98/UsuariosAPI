const express = require('express');
const router = express.Router();
const Usuario = require('../../../../libs/usuario');
const UsuarioDao = require('../../../../dao/models/UsuarioDao');
const userDao = new UsuarioDao();
const user = new Usuario(userDao);
user.init();

router.get('/', async (req, res) => {
  // extraer y validar datos del request
  try {
    // devolver la ejecución el controlador de esta ruta
    const versionData = await user.getVersion();
    return res.status(200).json(versionData);
  } catch (ex) {
    // manejar el error que pueda tirar el controlador
    console.error('Error Usuarios', ex);
    return res.status(502).json({ 'error': 'Error Interno de Server' });
  }
}); // get /

router.get('/all', async (req, res) => {
  try {
    const usuarios = await user.getUsuario();
    return res.status(200).json(usuarios);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({ error: 'Error al procesar solicitud.' });
  }
});

router.get('/byid/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^\d+$/.test(codigo)) ) {
      return res.status(400).json({
        error: 'Se espera un codigo numérico'
      });
    }
    const registro = await user.getUsuarioById({ codigo: parseInt(codigo) });
    return res.status(200).json(registro);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({ error: 'Error al procesar solicitud.' });
  }
});

router.post('/new', async (req, res) => {
  try {
    const { status ="",
        email="",
        password="",
        nombre="",
        avatar="" } = req.body;

    if (!(/^(ACTIVO)|(INACTIVO)$/.test(status))) {
        return res.status(400).json({
            error: 'Se espera valor de Estado en ACTIVO o INACTIVO'
        });
        }

    if (/^\s*$/.test(email)) {
      return res.status(400).json({
        error: 'Se espera valor de correo'
      });
    }

    if (/^\s*$/.test(nombre)) {
      return res.status(400).json({
        error: 'Se espera valor de nombre'
      });
    }
    if (/^\s*$/.test(avatar)) {
      return res.status(400).json({
        error: 'Se espera url de avatar'
      });
    }
    if (/^\s*$/.test(password)) {
      return res.status(400).json({
        error: 'Se espera valor de contraseña correcta'
      });
    }
    
    const newUsuario = await user.addUsuario({
        status,
        email,
        password,
        nombre,
        avatar
    });
    return res.status(200).json(newUsuario);
  } catch (ex) {
    console.error(ex);
    return res.status(502).json({ error: 'Error al procesar solicitud' });
  }
});

router.put('/update/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^\d+$/.test(codigo))) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }
    const { status,
        email,
        password,
        nombre,
        avatar } = req.body;
        if (!(/^(ACTIVO)|(INACTIVO)$/.test(status))) {
            return res.status(400).json({
                error: 'Se espera valor de Estado en ACTIVO o INACTIVO'
            });
            }
    
        if (/^\s*$/.test(email)) {
          return res.status(400).json({
            error: 'Se espera valor de description'
          });
        }
    
        if (/^\s*$/.test(nombre)) {
          return res.status(400).json({
            error: 'Se espera valor de nombre'
          });
        }
        if (/^\s*$/.test(avatar)) {
          return res.status(400).json({
            error: 'Se espera url de avatar'
          });
        }
        if (/^\s*$/.test(password)) {
          return res.status(400).json({
            error: 'Se espera valor de contraseña correcta'
          });
        }

    const updateResult = await user.updateUsuario({ codigo: parseInt(codigo), 
        status ,
        email,
        password,
        nombre,
        avatar });

    if (!updateResult) {
      return res.status(404).json({ error: 'Usuario no encontrada.' });
    }
    return res.status(200).json({ updatedUsuario: updateResult });

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});


router.delete('/delete/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^\d+$/.test(codigo))) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }

    const deletedUsuario = await user.deleteUsuario({ codigo: parseInt(codigo) });

    if (!deletedUsuario) {
      return res.status(404).json({ error: 'Usuario no encontrada.' });
    }
    return res.status(200).json({ deletedUsuario });

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});

module.exports = router;