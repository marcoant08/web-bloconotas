import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [notas, setNotas] = useState([]);
  const [atualizador, setAtualizador] = useState(false);

  useEffect(() => {
    async function carregar() {
      await api
        .get("notas/listar")
        .then((response) => {
          setNotas(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    carregar();
  }, [atualizador]);

  async function add() {
    const nome = window.prompt("Nome:");
    const conteudo = window.prompt("Conteúdo:");

    if (nome === null || nome === "" || conteudo === null || conteudo === "") {
      alert("Preencha os campos!");
      return;
    }

    await api
      .post("notas/criar", { nome, conteudo })
      .then((response) => {
        alert("Nota criada!");
        setAtualizador(!atualizador);
      })
      .catch((err) => {
        alert("Erro: " + err);
      });
  }

  async function edit(id, index) {
    const aux1 = notas[index].nome;
    const aux2 = notas[index].conteudo;

    const nome = window.prompt("Nome:", aux1);
    const conteudo = window.prompt("Conteúdo:", aux2);

    if (nome === null || nome === "" || conteudo === null || conteudo === "") {
      alert("Preencha os campos!");
      return;
    }

    await api
      .put(`notas/atualizar/${id}`, { nome, conteudo })
      .then((response) => {
        alert("Nota atualizada!");
        setAtualizador(!atualizador);
      })
      .catch((err) => alert("Erro: " + err));
  }

  async function del(index) {
    await api
      .delete(`notas/deletar/${index}`)
      .then((response) => {
        setAtualizador(!atualizador);
      })
      .catch((err) => alert("Erro: " + err));
  }

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        className="page-home"
      ></div>
      <h1
        style={{
          color: "red",
          padding: 30,
          paddingLeft: 100,
          alignSelf: "center",
        }}
      >
        Meu Bloco de Notas
      </h1>
      <button
        style={{ padding: 15, marginLeft: 180, marginBottom: 30 }}
        onClick={add}
      >
        Adicionar nova nota
      </button>
      <h2 style={{ paddingLeft: 160 }}>Minhas notas:</h2>
      {notas?.map((item, index) => (
        <div style={{ padding: 25 }} key={item.nome}>
          <div style={{ paddingLeft: 100 }}>
            <p>Nota {index + 1}:</p>
            <p>Nome: {item.nome}</p>
            <p style={{ paddingBottom: 10 }}>Conteúdo: {item.conteudo}</p>
            <div style={{ paddingLeft: 15 }}>
              <button onClick={() => del(item.id)}>Deletar</button>
              <button
                style={{ marginLeft: 20 }}
                onClick={() => edit(item.id, index)}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
