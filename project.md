# BACKEND - Sistema de Controle Parental (Produção)

Você é um Engenheiro de Software Sênior especializado em Node.js, TypeScript, Fastify, PostgreSQL, Prisma ORM, Supabase e Clean Architecture.

Seu objetivo é gerar um backend completo, altamente escalável, seguro, modular e pronto para produção para um aplicativo de Controle Parental.

## Stack obrigatória

* Node.js LTS
* TypeScript
* Fastify
* Prisma ORM
* PostgreSQL (Supabase)
* Supabase Auth
* JWT (validação dos tokens do Supabase)
* Zod
* Swagger/OpenAPI
* Docker
* Vitest
* ESLint
* Prettier
* Husky
* tsup

Todo o código deve ser em TypeScript.

Não utilizar JavaScript.

Não utilizar Express.

---

# Arquitetura

Implementar Clean Architecture.

Estrutura:

src/

application/

domain/

infrastructure/

interfaces/

shared/

config/

modules/

Cada módulo deverá conter:

* controllers
* services
* repositories
* entities
* dtos
* validators
* routes
* interfaces

Os Controllers devem apenas receber a requisição e chamar os Services.

Nenhuma regra de negócio poderá existir nos Controllers.

Toda comunicação com o banco deverá ocorrer através de Repositories.

Utilizar Dependency Injection.

Aplicar SOLID em todo o projeto.

---

# Autenticação

NÃO criar tabela própria de usuários com senha.

Utilizar exclusivamente o Supabase Auth.

A autenticação será feita pelo Supabase.

O backend deverá apenas validar o JWT emitido pelo Supabase.

Criar middleware para autenticação.

Criar middleware para autorização por papéis.

Papéis:

* ADMIN
* PARENT

Criar tabela:

profiles

Campos:

* id UUID (referência para auth.users.id)
* name
* photo_url
* role
* created_at
* updated_at

---

# Banco de Dados

Utilizar UUID em todas as tabelas.

Criar migrations do Prisma.

Criar seed.

Criar índices.

Criar Foreign Keys.

Criar Cascade Delete quando apropriado.

Adicionar:

created_at

updated_at

deleted_at

Sempre que fizer sentido.

---

## children

* id
* parent_id
* name
* birth_date
* photo_url
* created_at
* updated_at
* deleted_at

---

## devices

* id
* child_id
* device_uuid
* device_name
* manufacturer
* model
* android_version
* app_version
* battery_level
* is_online
* last_seen
* created_at
* updated_at

---

## device_settings

* id
* device_id
* accessibility_enabled
* usage_permission
* overlay_permission
* vpn_permission
* location_permission
* battery_optimization_disabled
* last_sync

---

## installed_apps

* id
* device_id
* package_name
* app_name
* version
* icon
* is_system
* created_at

---

## rules

Uma única tabela para regras.

Campos:

* id
* device_id
* type

Valores:

APP

SITE

CATEGORY

* target

Exemplos:

com.instagram.android

youtube.com

games

adult

social

* action

Valores:

BLOCK

ALLOW

LIMIT

* daily_limit_minutes

* enabled

* created_at

---

## schedules

* id
* rule_id
* weekday
* start_time
* end_time
* enabled

---

## app_usage_logs

* id
* device_id
* package_name
* app_name
* started_at
* ended_at
* duration_seconds

---

## website_logs

* id
* device_id
* url
* domain
* title
* blocked
* accessed_at

---

## location_logs

* id
* device_id
* latitude
* longitude
* accuracy
* speed
* created_at

---

## alerts

* id
* device_id
* type
* severity
* title
* description
* read
* created_at

Tipos:

APP_INSTALLED

APP_REMOVED

BLOCKED_APP

BLOCKED_SITE

LOCATION_CHANGED

PERMISSION_REVOKED

VPN_DISABLED

ACCESSIBILITY_DISABLED

---

## audit_logs

Registrar todas as ações importantes.

Campos:

* id
* user_id
* action
* resource
* resource_id
* ip
* user_agent
* created_at

---

## sync_queue

Fila para sincronização offline.

Campos:

* id
* device_id
* payload
* status
* retry_count
* created_at

Status:

PENDING

PROCESSING

SUCCESS

FAILED

---

# Row Level Security

Preparar o banco para uso com RLS do Supabase.

Cada pai poderá acessar apenas:

* seus filhos
* seus dispositivos
* seus logs
* suas regras
* seus alertas

Criar políticas compatíveis.

---

# Funcionalidades

Implementar:

Autenticação via Supabase

Perfil

Cadastro de filhos

Cadastro de dispositivos

Registro automático de aplicativos instalados

Regras de bloqueio

Limites diários

Horários de uso

Histórico de aplicativos

Histórico de sites

Histórico de localização

Alertas

Dashboard

Logs de auditoria

Fila de sincronização

---

# Dashboard

Criar endpoint que retorna:

Tempo de tela diário

Tempo semanal

Tempo mensal

Aplicativos mais usados

Sites mais acessados

Tentativas bloqueadas

Quantidade de dispositivos

Quantidade de filhos

Localização atual

Última sincronização

Status do dispositivo

Permissões pendentes

---

# Endpoints

/auth

GET /session

GET /profile

PUT /profile

/children

GET

POST

GET /:id

PUT /:id

DELETE /:id

/devices

GET

POST

GET /:id

PUT /:id

DELETE /:id

/settings

GET

PUT

/apps

GET

POST

DELETE

/rules

GET

POST

PUT

DELETE

/schedules

GET

POST

PUT

DELETE

/app-usage

GET

/websites

GET

/location

GET

POST

/alerts

GET

PUT

/dashboard

GET

/audit

GET

/sync

POST

---

# Segurança

Implementar:

Helmet

Rate Limit

CORS

Compress

Validação Zod

Sanitização de entrada

Proteção contra SQL Injection

Proteção contra XSS

Middleware global de erros

Logs estruturados

---

# Resposta da API

Sucesso

{
"success": true,
"message": "Operation completed successfully.",
"data": {}
}

Erro

{
"success": false,
"message": "Validation failed.",
"errors": []
}

---

# Prisma

Gerar:

schema.prisma

Todas as migrations

Relacionamentos

Índices

Constraints

Enums

Cascade Delete

UUID padrão

---

# Docker

Criar:

Dockerfile

docker-compose.yml

.env.example

---

# Testes

Criar testes unitários para Services.

Criar testes de integração das rotas.

Cobertura mínima de 80%.

---

# Swagger

Documentar todas as rotas.

Adicionar exemplos de requisição e resposta.

Adicionar autenticação Bearer.

---

# README

Gerar documentação completa contendo:

* Instalação
* Configuração do Supabase
* Variáveis de ambiente
* Estrutura do projeto
* Arquitetura
* Fluxo de autenticação
* Como executar
* Como testar
* Como fazer deploy
* Convenções do projeto

---

# Requisitos de qualidade

* Código fortemente tipado.
* Não utilizar "any".
* Funções pequenas e coesas.
* Separação rigorosa de responsabilidades.
* Repository Pattern.
* Service Layer.
* DTOs.
* Dependency Injection.
* Tratamento centralizado de erros.
* Código preparado para escalar para milhares de dispositivos simultâneos.
* Projeto pronto para integração com um aplicativo React Native que utilizará Supabase Auth e consumirá esta API REST.
