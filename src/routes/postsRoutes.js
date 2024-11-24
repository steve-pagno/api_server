import express from "express"; // Importa o módulo express
import multer from "multer"; // Importa o módulo multer
import cors from "cors";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Importa as funções controladoras do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos enviados
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo como o nome original enviado
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do multer

const routes = (app) => {
  // Habilita o middleware para analisar requisições no formato JSON
  app.use(express.json());
  app.use(cors(corsOption))

  // Define uma rota GET para o endpoint "/posts" que executa a função listarPosts
  app.get("/posts", listarPosts);

  // Define uma rota POST para o endpoint "/posts" que executa a função postarNovoPost
  app.post("/posts", postarNovoPost);

  // Define uma rota POST para o endpoint "/upload" que utiliza o middleware upload.single("imagem") 
  // para processar um único arquivo chamado "imagem" e executa a função uploadImagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função routes como padrão