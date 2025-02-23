import multer, { diskStorage } from "multer";
import { resolve } from "path";
import fs from "fs"


// Define o diretório onde os arquivos serão armazenados
const uploadsDest = resolve(__dirname, "../Files");
const existPath = fs.existsSync(uploadsDest)

if (!existPath) {
    fs.mkdirSync(uploadsDest)
}

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDest); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        // Usando o nome original do arquivo e adicionando um timestamp
        cb(null, `stivy_${Date.now()}-${file.originalname}`);
    }
});

// Inicializa o multer com a configuração de armazenamento
const upload = multer({ storage: storage });

export default upload;
