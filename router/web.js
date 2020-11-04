const fs = require('fs')
const path = require('path')
import { upload } from '../app/controllers/main'
import { STORAGE_PATH } from '../config/storage'
const url = require('url')

const getHost = (req)=> url.format({
    protocol: req.protocol,
    host: req.get('host'),
    port: req.get('port'),
})

export default (app, { diskStorage }) => {
    app.get('/', (req, res)=>{
        let data = {data: []}
        try {
            data = fs.readFileSync(path.join(STORAGE_PATH, 'cache/data.json'), { encoding: 'utf-8' })
            data = JSON.parse(data)
        } catch (error) {}
        res.render('index', { list: data.data, host: getHost(req), dirname: path.join(__dirname, '../storage/') })
    })
    app.get('/hello', (req, res)=>{
        res.render('index')
    })
    app.post('/upload', upload({ diskStorage }))
}