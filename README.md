# PROJETO BETO - FRONTEND

## Instalação

Para instalar os projetos (frontend e backend) localmente, é necessário instalar:

- NodeJS: versão > 14

Feita a instalação do Node, é necessário clonar cada um dos projetos no ambiente e rodar, dentro de cada projeto, o comando:

```
npm install
```

Este comando irá instalar todas as dependências necessárias para rodar os respectivos projetos.

## Frontend

Comandos para rodar o frontend

```
npm run dev
```

Este comando irá rodar o frontend em ambiente local. Para cada tipo de ambiente, há um comando específico lbackendistado no arquivo package.json.

- npm run dev: Rodar projeto apontando para ambientes (backend) de desenvolvimento;
- npm run prod: Rodar projeto apontando para ambientes (backend) de produção;

Em ambiente local, o backend será disponibilizado em: <a href="http://localhost:3000">http://localhost:3000</a>

## Variáveis de ambiente

É necessário configurar arquivos de configuração com base nos ambientes disponíveis no arquivo package.json:

-.env.development
-.env.local
-.env.production

Esses arquivos possuirão as variáveis para cada ambiente:

```
REACT_APP_API = endereço do backend
```

Como demonstrado no arquivo .env.example
