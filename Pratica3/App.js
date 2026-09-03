import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import CartaoPerfil from "./CartaoPerfil";
import JogoDaVelha from "./JogoDaVelha";

const perfis = [
  {
    nome: "Joao Vitor",
    profissao: "Engenheiro de Software",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    nome: "Erick Xavier",
    profissao: "Desenvolvedor Full-Stack",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    nome: "Ana Beatriz",
    profissao: "Designer de Produto",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default function App() {
  return (
    // Desafio: ScrollView permite rolar quando o conteudo passa da tela
    <ScrollView contentContainerStyle={styles.container}>
      {/* Desafio: lista com 3 cartoes de perfil diferentes */}
      {perfis.map((perfil, index) => (
        <CartaoPerfil
          key={index}
          nome={perfil.nome}
          profissao={perfil.profissao}
          avatar={perfil.avatar}
        />
      ))}

      {/* Desafio: Jogo da Velha renderizado abaixo dos perfis */}
      <JogoDaVelha />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
});
