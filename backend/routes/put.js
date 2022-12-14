const { Router } = require("express")
const router = Router()

let editToken = require('../api/editToken')

router.post('/edit', editToken)

module.exports = router