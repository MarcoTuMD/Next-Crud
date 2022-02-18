interface EntradaProps {
  tipo?: "text" | "number";
  texto: string;
  valor: any;
  somenteLeitura?: boolean;
  clasName?: string;
  valorMudou?: (valor: any) => void;
}

export default function Entrada(props: EntradaProps) {
  return (
    <div className={`flex flex-col ${props.clasName}`}>
      <label className="mb-2">{props.texto}</label>
      <input
        className={`border border-purple-500 rounded-lg
         focus:outline-none bg-gray-200 px-4 py-2 
         ${props.somenteLeitura ? "" : "focus:bg-white"} `}
        type={props.tipo ?? "text"}
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
        readOnly={props.somenteLeitura}
      />
    </div>
  );
}
