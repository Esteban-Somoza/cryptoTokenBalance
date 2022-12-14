// let db = require('../database/tokenHoldings.json')
const { readFileSync, writeFileSync, unlinkSync, unlink } = require('fs')
const { resolve, } = require('path')


const editToken = async (req, res) => {
    try {
        let file = resolve(__dirname, '../database', 'tokenHoldings.json');
        let info = readFileSync(file);
        let dataBase = JSON.parse(info);

        let tokenToEdit = dataBase.find(t.token == req.params.token)
        console.log(tokenToEdit);
        tokenToEdit.token = req.params.token
        tokenToEdit.ticker = req.params.ticker
        tokenToEdit.amount = req.params.amount

        let save = JSON.stringify(dataBase, null, 2);
        return fs.writeFileSync("./dataBase.json", save);
        // res.send({ db }).status(200)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = editToken