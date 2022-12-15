// let db = require('../database/tokenHoldings.json')
const { readFileSync, writeFileSync, unlinkSync, unlink } = require('fs')
const { resolve, } = require('path')


const editToken = async (req, res) => {
    try {
        console.log('hi');
        // // return res.send(req)
        // // let file = resolve(__dirname, '../database', 'tokenHoldings.json');
        // // let info = readFileSync(file);
        // // let dataBase = JSON.parse(info);
        // let dataBase = require('../database/tokenHoldings.json')
        // let tokenToEdit = dataBase.find(t => t.token == req.body.token)
        // console.log(tokenToEdit);

        // tokenToEdit.token = req.body.token
        // tokenToEdit.ticker = req.body.ticker
        // tokenToEdit.amount = req.body.amount
        
        // let save = JSON.stringify(dataBase, null, 2);
        // // return fs.writeFileSync("./dataBase.json", save);
        // writeFileSync('./database/tokenHoldings.json', save);
        // return res.send('token added').status(200)
        // // res.send({ db }).status(200)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = editToken