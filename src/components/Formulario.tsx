import { useState } from "react";
import Cliente from "../core/Cliente";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioProps {
  cliente: Cliente;
  clienteMudou?: (cliente: Cliente) => void;
  cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.cliente?.id;
  const [nome, setNome] = useState(props.cliente?.nome);
  const [idade, setIdade] = useState(props.cliente?.idade);
  return (
    <div>
      {id ? (
        <Entrada texto="Código" valor={id} somenteLeitura clasName="mb-4" />
      ) : (
        false
      )}
      <Entrada texto="Nome" valor={nome} clasName="mb-4" valorMudou={setNome} />
      <Entrada
        texto="Idade"
        tipo="number"
        clasName="mb-4"
        valor={idade}
        valorMudou={setIdade}
      />
      <div className="flex justify-end mt-7">
        <Botao
          className="from-blue-500 to-blue-800 mr-2"
          onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}
        >
          {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao className="from-gray-500 to-gray-800" onClick={props.cancelado}>
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
