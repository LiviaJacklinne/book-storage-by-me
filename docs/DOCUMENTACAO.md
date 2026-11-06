# Book Storage

## Visão geral

O projeto é uma API REST para gerenciamento de livros, desenvolvida com
NestJS e TypeScript. Os dados são persistidos em PostgreSQL por meio do Prisma
ORM.

## Estrutura do projeto

```text
book-storage-by-me/
└── api/
    ├── src/
    │   ├── app.controller.ts       # Endpoint raiz da aplicação
    │   ├── app.controller.spec.ts  # Teste unitário do endpoint raiz
    │   ├── app.module.ts           # Módulo principal
    │   ├── app.service.ts          # Serviço básico da aplicação
    │   ├── main.ts                 # Inicialização da API e validações globais
    │   ├── livro/
    │   │   ├── livro.controller.ts # Rotas HTTP de livros
    │   │   ├── livro.dto.ts        # DTO e regras de validação
    │   │   ├── livro.module.ts     # Módulo de livros
    │   │   └── livro.service.ts    # Regras de acesso aos livros
    │   └── prisma/
    │       ├── prisma.module.ts    # Módulo de integração com Prisma
    │       └── prisma.service.ts   # Conexão e ciclo de vida do Prisma
    ├── prisma/
    │   ├── schema.prisma           # Modelo e enum do banco
    │   └── migrations/             # Migrações do PostgreSQL
    ├── test/
    │   ├── app.e2e-spec.ts         # Teste de integração/e2e
    │   └── jest-e2e.json           # Configuração dos testes e2e
    ├── docker-compose.yaml         # PostgreSQL local em container
    ├── package.json                # Scripts e dependências
    ├── tsconfig.json               # Configuração do TypeScript
    ├── nest-cli.json               # Configuração do Nest CLI
    ├── prisma7.config.ts           # Configuração do Prisma
    └── README.md                   # README padrão do NestJS
```

## Funcionalidades

### Gerenciamento de livros

O recurso `Livro` oferece:

- criação de livros;
- listagem de todos os livros;
- consulta de um livro por ID;
- exclusão de um livro por ID;
- persistência em PostgreSQL;
- validação dos dados recebidos pela API.

### Modelo de dados

Cada livro possui:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | `Int` | Sim | Identificador gerado automaticamente |
| `titulo` | `String` | Sim | Título do livro |
| `autor` | `String` | Sim | Autor do livro |
| `anoPublicacao` | `Int` | Não | Ano de publicação |
| `genero` | `GeneroEnum` | Sim | Categoria do livro |

Os gêneros disponíveis são `FICCAO`, `ROMANCE`, `TERROR`, `FANTASIA` e
`BIOGRAFIA`.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Retorna a mensagem básica da aplicação |
| `GET` | `/livro` | Lista todos os livros |
| `GET` | `/livro/:id` | Busca um livro pelo ID |
| `POST` | `/livro` | Cria um novo livro |
| `DELETE` | `/livro/:id` | Exclui um livro pelo ID |

### Exemplo de criação

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

O campo `titulo` e o campo `autor` não podem ser vazios. `anoPublicacao`,
quando informado, deve ser um número inteiro, e `genero` deve corresponder a
um dos valores definidos no enum.

Consultas e exclusões de livros inexistentes retornam erro HTTP `404` com a
mensagem `Livro não encontrado`. IDs inválidos também são rejeitados pela
validação do NestJS.

## Arquitetura e tecnologias

- **NestJS**: organização da API em módulos, controllers e services.
- **TypeScript**: linguagem principal.
- **Prisma ORM**: acesso tipado ao banco de dados e gerenciamento de migrações.
- **PostgreSQL**: banco de dados relacional.
- **Docker Compose**: execução local do PostgreSQL.
- **class-validator** e **class-transformer**: validação e transformação dos
  dados de entrada.
- **Jest** e **Supertest**: testes unitários e end-to-end.

O `ValidationPipe` global usa `transform`, `whitelist` e
`forbidNonWhitelisted`, portanto campos desconhecidos no corpo das requisições
também são rejeitados.

## Como executar

Na pasta `api/`, instale as dependências:

```bash
npm install
```

Configure as variáveis usadas pelo banco e pela aplicação. O Docker Compose
espera `DATABASE_USER`, `DATABASE_PASSWORD` e `DATABASE_NAME`; o Prisma espera
também `DATABASE_URL`, por exemplo:

```env
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=book_storage
DATABASE_URL=postgresql://postgres:postgres@localhost:5300/book_storage
```

Inicie o PostgreSQL:

```bash
docker compose up -d
```

Aplique as migrações e inicie a API:

```bash
npx prisma migrate deploy
npm run start:dev
```

Por padrão, a API fica disponível em `http://localhost:3000`.

## Testes e qualidade

```bash
npm test          # Testes unitários
npm run test:e2e  # Testes end-to-end
npm run test:cov  # Cobertura de testes
npm run lint      # Lint com Oxlint
npm run build     # Compilação da aplicação
```

