import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./styles.css";

function Home() {
  const [notas, setNotas] = useState([]);
  const [nome, setNome] = useState("");
  const [conteudo, setConteudo] = useState("");
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

  async function criar() {
    const data = { nome, conteudo };

    await api
      .post("notas/criar", data)
      .then((response) => {
        setAtualizador(!atualizador);
      })
      .catch((err) => {
        console.log(err);
        console.log("nao foi");
      });
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;

    if (name === "nome") setNome(value);
    if (name === "conteudo") setConteudo(value);
  }

  return (
    <div className="container">
      <br />
      <br />
      <h1>Minhas Notas</h1>
      <br />
      <fieldset>
        <legend>
          <h2>Nova nota</h2>
        </legend>
        <div className="field">
          <label htmlFor="nome">Nome: </label>
          <input
            type="text"
            name="nome"
            id="nome"
            onChange={handleChangeInput}
          />
        </div>
        <div className="field">
          <label htmlFor="conteudo">Conteúdo: </label>
          <input
            type="text"
            name="conteudo"
            id="conteudo"
            onChange={handleChangeInput}
          />
        </div>
        <button onClick={criar}>criar</button>
      </fieldset>
      <br />
      {notas.map((item, index) => (
        <h1 key={item.nome}>
          {index + 1} - {item.nome}
        </h1>
      ))}
    </div>
  );
}

export default Home;
