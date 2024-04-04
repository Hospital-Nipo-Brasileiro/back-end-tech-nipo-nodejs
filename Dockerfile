# Use a imagem oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do seu aplicativo para o contêiner
COPY package*.json ./

# Adicione a instalação do make, g++ e python
RUN apk add --no-cache make g++ python3 && npm rebuild bcrypt --build-from-source && apk del make g++ python3


# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o contêiner
COPY . .

# Expor a porta do aplicativo (ajuste conforme necessário)
EXPOSE 3000
