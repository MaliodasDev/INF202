import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Contador() {
  const [contagem, setContagem] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contagem Atual:</Text>
      <Text style={styles.numero}>{contagem}</Text>


      <TouchableOpacity
        style={[styles.botao, styles.botaoIncrementar]}
        onPress={() => setContagem(contagem + 1)}
      >
        <Text style={styles.textoBotao}>Incrementar +1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.botaoZerar]}
        onPress={() => setContagem(0)}
      >
        <Text style={styles.textoBotao}>Zerar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 10,
  },
  numero: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50, // Arredondamento
    marginVertical: 5,
    width: 200,
    alignItems: "center",
  },
  botaoIncrementar: {
    backgroundColor: "#4CAF50",
  },
  botaoZerar: {
    backgroundColor: "#E53935",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
