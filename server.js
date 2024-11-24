// Importa o framework Express para criar a aplicação web
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma nova aplicação Express
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando!");
});

// Define uma rota GET para o endpoint "/posts"
app.get("/posts", async (req, res) => {
  // Obtém todos os posts
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 e os posts em formato JSON
  res.status(200).json(posts);
});

// function buscarPostPorId(id){
//     return posts.findIndex((post) => {
//         return post.id === Number(id);
//     })
// }
// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostPorId(req.params.id)
//     res.status(200).json(posts[index]);
// });