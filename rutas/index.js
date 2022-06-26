  const router = require('express').Router()
 
  router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a la API' })
  })

  module.exports = router