interface BotaoProps {
  className: string;
  children: any;
  onClick?: () => void;
}

export default function Botao(props: BotaoProps) {
  return (
    <button
      className={`bg-gradient-to-r  ${props.className} text-white px-4 py-2 rounded-md`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
