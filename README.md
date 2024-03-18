
# ToDo

Um simples gerenciador de tarefas.

## Screenshots

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/GustavoZeglan/ToDo
```

### Crie um banco MySQL 

Crie um banco que vai ser usado localmente pelo backend

### Rodando o backend

Entre no diretório backend

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

#### Defina as váriaveis de ambiente em um arquivo .env

`PORT`

`DB_PORT`

`DB_USERNAME`

`DB_PASSWORD`

`DB_DATABASE`

`FRONTEND_URL`

`SECRET`

Inicie o servidor

```bash
  npm run start
```

### Rodando o frontend

Entre no diretório backend

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

#### Defina as váriaveis de ambiente em um arquivo .env

`NEXTAUTH_URL`

`NEXTAUTH_SECRET`

`NEXT_PUBLIC_BACKEND_URL`

Inicie o servidor

```bash
  npm run start
```


## Stack utilizada

**Front-end:** React, Nextjs, Styled Components, NextAuth, Zod.

**Back-end:** Node, Express, Nestjs, TypeORM, Zod, JWT.
