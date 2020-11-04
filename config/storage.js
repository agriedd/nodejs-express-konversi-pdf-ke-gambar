
const multer = require('multer')
const path = require('path')
const crypto = require('crypto-js')

export const STORAGE_PATH = path.join(__dirname, "../storage")

export const diskStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(STORAGE_PATH, 'public'))
    },
    filename: (req, file, cb)=>{
        let name = crypto.MD5(file.fieldname + '-' + Date.now())
        cb(null, name.toString() + path.extname(file.originalname))
    }
})
export default diskStorage