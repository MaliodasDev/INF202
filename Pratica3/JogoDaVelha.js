import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(""));
  const [vezX, setVezX] = useState(true);

  const vencedor = calcularVencedor(tabuleiro);

  function jogar(indice) {
    // Ignora se a celula ja foi preenchida ou se o jogo acabou
    if (tabuleiro[indice] || vencedor) return;

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = vezX ? "X" : "O";
    setTabuleiro(novoTabuleiro);
    setVezX(!vezX);
  }

  function reiniciar() {
    setTabuleiro(Array(9).fill(""));
    setVezX(true);
  }

  let status;
  if (vencedor) {
    status = "Vencedor: " + vencedor;
  } else if (!tabuleiro.includes("")) {
    status = "Empate!";
  } else {
    status = "Vez do jogador: " + (vezX ? "X" : "O");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.status}>{status}</Text>

      {/* Tabuleiro: 3 linhas (row) dentro de uma coluna (column) */}
      <View style={styles.tabuleiro}>
        {[0, 1, 2].map((linha) => (
          <View key={linha} style={styles.linha}>
            {[0, 1, 2].map((coluna) => {
              const indice = linha * 3 + coluna;
              return (
                <TouchableOpacity
                  key={indice}
                  style={styles.celula}
                  activeOpacity={0.7}
                  onPress={() => jogar(indice)}
                >
                  <Text style={styles.textoCelula}>{tabuleiro[indice]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotao}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

function calcularVencedor(t) {
  const combinacoes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6],            // diagonais
  ];

  for (const [a, b, c] of combinacoes) {
    if (t[a] && t[a] === t[b] && t[a] === t[c]) {
      return t[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 15,
  },
  tabuleiro: {
    flexDirection: "column",
  },
  linha: {
    flexDirection: "row",
  },
  celula: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#14325A",
    justifyContent: "center",
    alignItems: "center",
  },
  textoCelula: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0064A0",
  },
  botaoReiniciar: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
