import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ItemTarefa from "./ItemTarefa";

export default function App() {
  // Desafio: array estatico transformado em estado (useState)
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  // Desafio: filter() guarda apenas as tarefas pendentes
  const tarefasPendentes = tarefas.filter((tarefa) => !tarefa.concluida);

  // Desafio: adiciona nova tarefa usando o Spread Operator (...tarefas)
  function adicionarTarefa() {
    const novoId =
      tarefas.length > 0 ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1;

    const novaTarefa = {
      id: novoId,
      descricao: "Nova tarefa " + novoId,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      {/* Lista principal com map + componente ItemTarefa */}
      {tarefas.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}

      {/* Botao que adiciona uma nova tarefa (Spread Operator) */}
      <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
        <Text style={styles.textoBotao}>+ Adicionar Tarefa</Text>
      </TouchableOpacity>

      {/* Desafio: lista secundaria apenas com pendentes */}
      <Text style={styles.subtitulo}>Tarefas Pendentes</Text>
      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  conteudo: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325a",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    color: "#20325a",
  },
  botao: {
    backgroundColor: "#20325a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
