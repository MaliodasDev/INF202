# Usar uma imagem base do Ubuntu
FROM ubuntu:22.04

# Instalar o compilador C++ e a biblioteca do PostgreSQL
RUN apt-get update && apt-get install -y \
    g++ \
    libpqxx-dev \
    && rm -rf /var/lib/apt/lists/*

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do GitHub para dentro do contêiner
COPY . .

# Compilar o código
RUN g++ -o sistema maincc.cpp -lpqxx -lpq

# Comando para rodar o sistema
CMD ["./sistema"]
