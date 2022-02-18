import {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import { app } from "../config";

export default class ColecaoCliente implements ClienteRepositorio {
  db = getFirestore(app);
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },

    fromFirestore(snapshot, options) {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    },
  };

  async salvar(cliente: Cliente): Promise<Cliente> {
    if (cliente?.id) {
      await updateDoc(
        doc(this.db, "clientes", cliente.id),
        this.#conversor.toFirestore(cliente)
      );
      return cliente;
    } else {
      cliente.id = uuidv4();
      const resul = await setDoc(
        doc(this.db, "clientes", cliente.id),
        this.#conversor.toFirestore(cliente)
      );
      return cliente;
    }
  }

  async excluir(cliente: Cliente) {
    const resul = await deleteDoc(doc(this.db, "clientes", cliente.id));
    return resul;
  }

  async obterTodos(): Promise<Cliente[]> {
    const clientesCol = collection(this.db, "clientes").withConverter(
      this.#conversor
    );
    const clientesSnapshot = await getDocs(clientesCol);
    const clientesList = clientesSnapshot.docs.map((doc) => doc.data());
    return clientesList;
  }
}
