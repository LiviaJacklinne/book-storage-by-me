# Book Storage

API REST para gerenciamento e reserva de livros, feita com **NestJS** e **TypeScript**, com persistência em **PostgreSQL** via **Prisma ORM**. O front-end será desenvolvido em **Angular**.

Este é um projeto de estudo: a ideia é manter o domínio simples (livros, usuários e reservas) para praticar na prática ferramentas como Docker, nginx, filas, mensageria e agendamento.

## O que o projeto faz

**Já implementado**

- Criação de livros
- Listagem de todos os livros
- Consulta de um livro por ID
- Exclusão de um livro por ID
- Validação dos dados recebidos pela API

**Planejado**

- CRUD completo de livros (atualização, paginação e filtros)
- CRUD de usuários e autenticação
- Reserva de livros por usuários
- Expiração automática de reservas (agendamento com Redis)
- Envio de e-mail avisando que a reserva vai expirar em X dias (mensageria)
- Front-end em Angular
- Containerização de front e back, nginx como proxy e load balancer

## Stack

| Camada | Tecnologia |
|---|---|
| Back-end | NestJS, TypeScript |
| Banco de dados | PostgreSQL (Docker) |
| ORM | Prisma |
| Validação | class-validator, class-transformer |
| Testes | Jest, Supertest |
| Lint | Oxlint |
| Front-end | Angular (em breve) |
| Infra (planejado) | Docker Compose, nginx, Redis, mensageria |

## Estrutura do projeto

```text
book-storage-by-me/
├── api/    # Back-end NestJS
└── web/    # Front-end Angular (a ser criado)
```

## Pré-requisitos

Instale antes de começar:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 20 ou superior (já inclui o npm)
- [Docker](https://docs.docker.com/get-docker/) e Docker Compose

Confira as versões instaladas:

```bash
git --version
node --version
npm --version
docker --version
docker compose version
```

## Como rodar o back-end (NestJS)

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd book-storage-by-me/api
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` dentro de `api/`:

```env
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=book_storage
DATABASE_URL=postgresql://postgres:postgres@localhost:5300/book_storage
```

### 4. Subir o banco de dados

```bash
docker compose up -d
```

### 5. Gerar o client do Prisma e aplicar as migrações

```bash
npx prisma generate
npx prisma migrate deploy
```

### 6. Iniciar a API

```bash
npm run start:dev
```

A API fica disponível em `http://localhost:3000`.

## Como rodar o front-end (Angular)

> O front-end ainda não foi criado. Os passos abaixo mostram como instalar o Angular CLI e iniciar o projeto.

### 1. Instalar o Angular CLI

```bash
npm install -g @angular/cli
ng version
```

### 2. Criar o projeto (apenas na primeira vez)

Na raiz do repositório:

```bash
cd ..
ng new web
```

### 3. Instalar as dependências e iniciar

Depois que o projeto existir (ou ao clonar o repositório já com a pasta `web/`):

```bash
cd web
npm install
ng serve
```

O front fica disponível em `http://localhost:4200`.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Mensagem básica da aplicação |
| `GET` | `/livro` | Lista todos os livros |
| `GET` | `/livro/:id` | Busca um livro pelo ID |
| `POST` | `/livro` | Cria um novo livro |
| `DELETE` | `/livro/:id` | Exclui um livro pelo ID |

Exemplo de criação:

```http
POST /livro
Content-Type: application/json
```

```json
{
  "titulo": "O Hobbit",
  "autor": "J. R. R. Tolkien",
  "anoPublicacao": 1937,
  "genero": "FANTASIA"
}
```

Gêneros disponíveis: `FICCAO`, `ROMANCE`, `TERROR`, `FANTASIA` e `BIOGRAFIA`.

## Scripts úteis (pasta `api/`)

```bash
npm test          # Testes unitários
npm run test:e2e  # Testes end-to-end
npm run test:cov  # Cobertura de testes
npm run lint      # Lint com Oxlint
npm run build     # Compilação da aplicação
```

## Roadmap

1. Completar o CRUD de livros (update, paginação e filtros)
2. Usuários e autenticação
3. Reservas com regras de negócio
4. Redis para expiração automática das reservas
5. E-mail de aviso de expiração via mensageria
6. Front-end em Angular
7. Containers, nginx e load balancer