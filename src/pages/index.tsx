import useClientes from "../hooks/useClientes";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";

export default function Home() {
  const {
    cliente,
    clientes,
    tabelaVisivel,
    exibirTabela,
    pegarClientes,
    clienteSelecionado,
    clienteExcluido,
    salvarCliente,
    novoCliente,
  } = useClientes();
  return (
    <div
      className={`flex justify-center items-center h-screen
       bg-gradient-to-r from-blue-500 to-purple-500 text-white`}
    >
      <Layout titulo="Cadastro Simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao
                onClick={novoCliente}
                className="mb-4 from-green-400 to-green-700"
              >
                Novo Cliente
              </Botao>
            </div>

            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            ></Tabela>
          </>
        ) : (
          <Formulario
            cliente={cliente}
            cancelado={() => exibirTabela()}
            clienteMudou={salvarCliente}
          ></Formulario>
        )}
      </Layout>
    </div>
  );
}
