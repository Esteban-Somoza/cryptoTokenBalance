
const { Router } = require("express")
const router = Router()

let getTokens = require('../api/getTokens')

router.get('/get', getTokens)

module.exports = router