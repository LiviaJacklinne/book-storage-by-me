## Proposta
A ideia do projeto em si é simples, para que eu não perca tempo com regra de negócio. Meu intuito é aprender tecnologia, conhecimentos práticos.

O **Book Storage** é uma "biblioteca online", onde você se registra, cadastra livros e faz reserva. 


# Decisões, pensamentos e justificativas
Escolhi trabalhar com NestJS porque gosto de tipagem, além dele ser muito semelhante ao JS e estar tendo bastante visibilidade; Para o front escolhi o Angular, 
porque uso com mais frequencia no meu dia a dia e gosto mais da arquitetura, além de reforçar o TS; Para o banco escolhi PostgreSQL porque é open source e mais comum no mercado; Estou usando Prisma devido facilidade de versionamento e conhecimento prévio.

## Stack
> | Tecnologia | Versão | Uso |
> |---|---|---|
> | NestJS | 12.x | API |
> | Angular | 21.x | Front-end |
> | PostgreSQL | 18.x | Banco de dados |
> | Prisma | 7.x | ORM e migrations |

### Backend
- No back estou usando Nest, com Prisma para comunicação com o banco;
- Optei por não usar criptografia na senha, por estar desenvolvendo local (quero poder consultar a senha de forma rápida e fácil);
- Há autenticação com JWT;

### Frontend

