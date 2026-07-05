# Parental Control Backend API

Este é o backend do Sistema de Controle Parental. Construído para ser escalável, seguro e seguindo os princípios da Clean Architecture.

## Tecnologias Principais
- Node.js LTS (>= 20)
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL (via Supabase)
- Supabase Auth e JWT
- Zod (Validação)
- Swagger/OpenAPI

## Estrutura e Arquitetura

O projeto implementa a **Clean Architecture**. A estrutura de diretórios é:
```text
src/
├── application/       # Regras de aplicação (Casos de uso/Serviços)
├── domain/            # Entidades e regras de negócio centrais
├── infrastructure/    # Banco de dados, Web Server (Fastify), Middlewares
├── interfaces/        # Interfaces de Repositórios e Contratos
├── config/            # Configurações globais e Variáveis de Ambiente
├── shared/            # Tratamento de Erros, Utilitários
└── modules/           # Agrupamento lógico de funcionalidades verticais
```

## Como Executar (Localmente)

1. Clone o repositório.
2. Certifique-se de usar Node v20 LTS.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie o arquivo `.env` baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *Você precisará preencher as credenciais do Supabase (URL, ANON_KEY, JWT_SECRET).*
5. Suba o banco de dados via Docker:
   ```bash
   docker-compose up -d db
   ```
6. Execute as migrations do Prisma (quando disponíveis):
   ```bash
   npx prisma generate
   npx prisma db push
   ```
7. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   A API rodará em `http://localhost:3333`. A documentação Swagger estará em `http://localhost:3333/docs`.

## Como Executar (Docker Completo)

Você pode rodar todo o ambiente via Docker Compose:
```bash
docker-compose up --build
```

## Fluxo de Autenticação

A autenticação é delegada ao **Supabase Auth**.
O fluxo esperado é:
1. O aplicativo cliente (React Native) realiza o login via Supabase Client e obtém o `access_token` (JWT).
2. O aplicativo envia as requisições ao Backend contendo o token no cabeçalho:
   `Authorization: Bearer <seu-token>`
3. O Backend intercepta a requisição no `authMiddleware`, e utiliza o `SUPABASE_JWT_SECRET` para validar a assinatura do token. Nenhuma chamada de rede extra ao Supabase é feita, garantindo alta performance.
4. O middleware extrai o ID do usuário (sub) e a Role e repassa para os Controllers.

## Convenções de Código
- Tipagem estrita: Proibido o uso de `any` sem justificativa prévia.
- Tratamento de Erros: Sempre lance instâncias de `AppError` que serão capturadas pelo manipulador global (`errorHandler`).
- Banco de Dados: Toda comunicação com o Prisma deve ser encapsulada nos *Repositories*.
- Validação: Toda entrada na API (body, params, query) deve ser validada usando Zod.