import multer, { diskStorage, Options } from "multer";
import { resolve } from "path";
import fs from "fs"


// Define o diretório onde os arquivos serão armazenados
const uploadsDest = resolve(__dirname, "../Files");

const checkIfPathExistToCreate = () => {
    const existPath = fs.existsSync(uploadsDest)
    
    if (!existPath) {
        fs.mkdirSync(uploadsDest)
    }    
}

const storage = diskStorage({
    destination: (req, file, cb) => {
        checkIfPathExistToCreate()
        cb(null, uploadsDest); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        // Usando o nome original do arquivo e adicionando um timestamp
        cb(null, `stivy_${Date.now()}-${file.originalname}`);
    }
});

const multerConfig: Options = {
    storage,

    limits: {
        fileSize: 30 * 1024 * 1024, // 30MB
    },
};

export default multerConfig;
