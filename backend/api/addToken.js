let db = require('../database/tokenHoldings.json')
const { readFileSync, writeFileSync, unlinkSync, unlink } = require('fs')
const { resolve, } = require('path')


const getTokens = async (req, res) => {
    try {
        let file = resolve(__dirname, '../data', 'products.json');
        let info = readFileSync(file);
        let products = JSON.parse(info);
        
        let newToken = {
            token: req.params.token,
            ticker: req.params.ticker,
            amount: req.params.amount
        }
        let newDb = db.push(newToken)

        return 
        // res.send({ db }).status(200)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = getTokens

// process: async function (req, res) {

//       let nuevaInformacion = await informacion.create({
//         colores: req.body.colores,
//         configuracion: req.body.configuracion,
//         apto: req.body.apto,
//         tecnologia: req.body.tecnologia,
//         medidas: req.body.medidas,
//         capacidad: req.body.capacidad,
//         disenio: req.body.disenio,
//       }) // actualizacion tabla INFORMACION segun Id

//       await producto.create({
//         nombre: req.body.nombre,
//         precio: req.body.precio,
//         imagenId: imagenId,
//         categoria: req.body.categoria,
//         subcategoria: req.body.subcategoria,
//         informacionId: nuevaInformacion.id,
//         marca: req.body.marca,
//         linea: req.body.linea,
//         descripcion: req.body.description,

//       }) // actualizacion tabla PRODUCTO segun Id

//       return res.redirect("/products/finder")
//     }
//   }