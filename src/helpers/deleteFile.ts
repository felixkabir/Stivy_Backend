import fs from "node:fs"
import { promisify } from "node:util"
import { resolve } from "path"

export async function deleteFile(file_name: string){
    if(!file_name) return

    try {
        return await promisify(fs.unlink)(
            resolve(__dirname, "../Files/", file_name)
        )
    } catch (err:any) {
        // console.log(err)
    }
}