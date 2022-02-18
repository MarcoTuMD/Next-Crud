import { useEffect, useState } from "react";
import Cliente from "../core/Cliente";
import ColecaoCliente from "../firebase/db/ColecaoCliente";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useClientes() {
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const { tabelaVisivel, exibirFormulario, exibirTabela } = useTabelaOuForm();
  const colecaoCliente = new ColecaoCliente();

  useEffect(() => {
    pegarClientes();
  }, [clientes]);

  async function pegarClientes() {
    await colecaoCliente.obterTodos().then(function (r) {
      setClientes(r);
    });
  }

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente);
    exibirFormulario();
  }

  async function clienteExcluido(cliente: Cliente) {
    await colecaoCliente.excluir(cliente);
  }

  async function salvarCliente(cliente: Cliente) {
    await colecaoCliente.salvar(cliente);
    exibirTabela();
  }

  function novoCliente() {
    setCliente(Cliente.vazio);
    exibirFormulario();
  }

  return {
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela,
    pegarClientes,
    clienteSelecionado,
    clienteExcluido,
    salvarCliente,
    novoCliente,
  };
}
