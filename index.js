const http = require('http')
const express = require('express')
const app = express(http)
import router from './router/web'
import diskStorage from './config/storage'

app.set('view engine', 'pug')
app.set('views', './res/views')
app.use(express.static('storage'))
app.use(express.static('public'))

router(app, {
    diskStorage
})

app.listen(80)