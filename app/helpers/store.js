import fs from 'fs'
import path from 'path'

export default ({ STORAGE_PATH, req })=>{
    let pathcache = path.join(STORAGE_PATH, "cache/data.json")
    fs.open(pathcache, 'rs+', (err, fd)=>{
        let data
        if(!err){
            data = fs.readFileSync(pathcache, 'utf-8')
            data = JSON.parse(data)
        } else {
            data = { data: [] }
        }
        data.data.push({
            basename: path.join(STORAGE_PATH, 'public', path.parse(req.file.path).name + ".jpg"),
        })
        fs.writeFileSync(fd || pathcache, JSON.stringify(data))
        if(!err) fs.close(fd)
    })
}