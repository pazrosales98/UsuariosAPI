const express = require('express');
const { getCategoryVersion } = require('../../../../libs/categorias');
const router = express.Router();

router.get('/', async (req,res) => {
    //  extraer y validar datos del request

    try{
        //  devolver la ejecución el controlador de esta ruta
        const versionData = await getCategoryVersion();
        return res.status(200).json(versionData);
    } catch (ex) {
        //  manejar el error que pueda tirar el controlador
        console.error('Error Category',ex);
        return res.status(502).json({'error': 'Error Interno de Server'});
    }

}); // get /


module.exports = router;