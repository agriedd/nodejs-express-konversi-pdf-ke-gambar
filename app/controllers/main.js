const multer = require('multer')
import imagemagick from 'imagemagick'
const path = require('path')
import { STORAGE_PATH } from '../../config/storage'
const fs = require('fs')
import fileCache from '../helpers/store'


export const upload = ({ diskStorage })=>[
    
    multer({ storage: diskStorage }).single('file'),

    (req, res)=>{
        if(!req.file.path)
            res.status(400).send({
                status: false,
                data: "No File Inserted",
            })
        imagemagick.convert([ 
            '-density', //mengatur density dari pdf sebelum diconvert
            '150',
            '-antialias',
            req.file.path + "[1]", //hanya menkonversi halaman ke-1
            // '-resize',
            // '25%',
            // '-quality',
            // '100',
            path.join(STORAGE_PATH, 'public', path.parse(req.file.path).name + ".jpg")
        ], (err, result, result2)=>{
            if (err) throw err;
            fileCache({ STORAGE_PATH, req })
        })
        res.redirect('../')
    }
]