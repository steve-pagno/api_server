import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao"
  const db = conexao.db("imersao");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao"
  const db = conexao.db("imersao");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados "imersao"
  const db = conexao.db("imersao");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  const objId = ObjectId.createFromHexString(id);
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.updateOne({_id: new ObjectId(objId)}, {$set: novoPost});
}