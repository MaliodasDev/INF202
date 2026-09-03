import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function CartaoPerfil({ nome, profissao, avatar }) {
  const [nomeAtual, setNomeAtual] = useState(nome);
  const [seguindo, setSeguindo] = useState(false);

  return (
    <View style={styles.cartao}>
      {/* Imagem Remota: obrigatorio definir width e height no estilo */}
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <Text style={styles.nomeUsuario}>{nomeAtual}</Text>
      <Text style={styles.profissao}>{profissao}</Text>

      {/* Desafio: multiplos estilos via array (estado "Ja Seguindo") */}
      <TouchableOpacity
        style={[styles.botao, seguindo && styles.botaoDesativado]}
        activeOpacity={0.7}
        onPress={() => setSeguindo(!seguindo)}
      >
        <Text style={styles.textoBotao}>
          {seguindo ? "Ja Seguindo" : "Seguir"}
        </Text>
      </TouchableOpacity>

      {/* Entrada de texto para alterar o nome dinamicamente */}
      <TextInput
        style={styles.input}
        placeholder="Alterar nome..."
        value={nomeAtual}
        onChangeText={(texto) => setNomeAtual(texto)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    marginBottom: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A", // ProBlue
  },
  profissao: {
    fontSize: 16,
    color: "#505050", // ProGray
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#0064A0", // ProAccent
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  botaoDesativado: {
    backgroundColor: "#9E9E9E", // cinza (estado "Ja Seguindo")
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },
});
