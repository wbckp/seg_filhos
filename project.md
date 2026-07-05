# FRONTEND - Sistema de Controle Parental (Android, Tablet e Android TV)

Você é um Engenheiro de Software Sênior especializado em React, React Native, Expo, TypeScript, Android, Android TV, UX/UI e Material Design 3.

Sua missão é criar um aplicativo profissional, moderno, extremamente responsivo e preparado para publicação na Google Play.

O aplicativo deverá funcionar perfeitamente em:

* Smartphones Android
* Tablets Android
* Android TV (Google TV)

Todo o projeto deverá ser escrito em TypeScript.

Nunca utilizar JavaScript.

O frontend deverá consumir a API REST já existente e utilizar o Supabase apenas para autenticação.

---

# Stack

Utilizar obrigatoriamente:

* React Native
* Expo (última versão estável compatível)
* TypeScript
* Expo Router
* React Navigation
* TanStack Query
* Zustand
* React Hook Form
* Zod
* Axios
* React Native Paper (Material Design 3)
* React Native Reanimated
* React Native Gesture Handler
* MMKV Storage
* Expo Secure Store
* Expo Notifications
* Expo Location
* Expo Device
* Expo Network
* Expo Image
* React Native SVG

---

# Arquitetura

Implementar arquitetura modular.

Estrutura:

src/

app/

components/

features/

hooks/

services/

stores/

contexts/

providers/

utils/

constants/

types/

assets/

theme/

navigation/

Cada Feature deverá conter:

components

screens

services

hooks

types

validators

styles

---

# Design System

Utilizar Material Design 3.

Criar tema completo contendo:

Light Mode

Dark Mode

Sistema de cores

Tipografia

Espaçamentos

Elevações

Bordas

Ícones

Animações

Shadows

Ripple

Tokens de Design

Todo o projeto deverá utilizar o mesmo Design System.

---

# Responsividade

O aplicativo deverá adaptar automaticamente para:

Telefone

Tablet

Android TV

Desktop (futuramente)

Não utilizar tamanhos fixos.

Criar sistema baseado em:

Breakpoints

Compact

Medium

Expanded

Large

Utilizar Grid Responsivo.

Componentes adaptáveis.

---

# Layout

Criar Layout diferente conforme dispositivo.

## Smartphone

Bottom Navigation

FAB

Drawer opcional

Cards empilhados

---

## Tablet

Navigation Rail

Painéis lado a lado

Master Detail

Cards maiores

---

## Android TV

Menu lateral permanente

Navegação por controle remoto

Suporte completo ao Focus

Suporte ao D-Pad

Suporte ao botão Back

Itens grandes

Cards maiores

Espaçamento amplo

---

# Navegação

Utilizar Expo Router.

Criar:

Login

Cadastro

Recuperar senha

Dashboard

Filhos

Dispositivos

Regras

Aplicativos

Sites

Horários

Alertas

Histórico

Mapa

Perfil

Configurações

Sobre

---

# Dashboard

Mostrar:

Tempo de tela

Uso diário

Uso semanal

Uso mensal

Dispositivos

Filhos

Localização

Aplicativos mais utilizados

Sites mais acessados

Tentativas bloqueadas

Alertas recentes

Gráficos

Indicadores

Cards

---

# Funcionalidades

Autenticação

Perfil

Gerenciamento dos filhos

Gerenciamento dos dispositivos

Cadastro de regras

Bloqueio de aplicativos

Bloqueio de sites

Categorias

Horários

Tempo diário

Mapa

Histórico

Alertas

Dashboard

Configurações

---

# API

Criar camada completa.

services/api

Axios

Interceptors

Refresh Token

Retry automático

Tratamento de erros

Timeout

Cancelamento

Cache

Offline First

---

# Estado Global

Utilizar Zustand.

Criar Stores:

Auth

User

Children

Devices

Dashboard

Alerts

Settings

Theme

Connectivity

---

# TanStack Query

Criar Queries para:

Dashboard

Dispositivos

Filhos

Alertas

Aplicativos

Sites

Regras

Localização

Históricos

Cache inteligente.

Refetch automático.

Background Sync.

---

# Formulários

Utilizar:

React Hook Form

Zod

Máscaras

Validação em tempo real

Mensagens amigáveis

---

# Componentes

Criar biblioteca própria.

Button

Card

Dialog

Input

Search

Avatar

List Item

Header

Footer

Loading

Skeleton

Empty State

Error State

Charts

Graphs

Progress

Badge

Snackbar

Toast

Bottom Sheet

Date Picker

Time Picker

Switch

Checkbox

Segmented Buttons

---

# Mapa

Tela de localização.

Mostrar:

Posição atual

Histórico

Marcadores

Atualização em tempo real

---

# Gráficos

Criar gráficos para:

Tempo de tela

Uso semanal

Uso mensal

Aplicativos

Sites

Categorias

---

# Alertas

Tela completa.

Filtros.

Pesquisa.

Ordenação.

Marcar como lido.

---

# Histórico

Pesquisar.

Filtrar.

Exportar.

Aplicativos.

Sites.

Localização.

---

# Configurações

Tema

Idioma

Notificações

Conta

Privacidade

Ajuda

Sobre

---

# Tema

Suporte completo para:

Light

Dark

Automático

---

# Internacionalização

Preparar para:

Português

Inglês

Espanhol

Utilizar i18n.

---

# Acessibilidade

Implementar:

Leitor de tela

Alto contraste

Fonte dinâmica

Labels

Hints

Suporte completo ao TalkBack

---

# Android TV

Todo componente deverá possuir:

focusable

focusRing

Animação ao ganhar foco

Animação ao perder foco

Navegação pelo D-Pad

Suporte ao botão Home

Suporte ao botão Back

Suporte ao botão OK

Suporte ao botão Menu

Evitar qualquer interação exclusivamente por toque.

Todos os menus devem funcionar utilizando apenas o controle remoto.

---

# Performance

Lazy Loading

Code Splitting

Memoização

Virtualização de listas

Cache

Imagens otimizadas

Paginação

Infinite Scroll

---

# Offline

Salvar dados localmente utilizando MMKV.

Sincronizar automaticamente quando voltar conexão.

Fila de sincronização.

---

# Segurança

Secure Store para tokens.

Nunca armazenar JWT em AsyncStorage.

Criptografar dados sensíveis.

Logout automático quando token expirar.

---

# Notificações

Push Notifications.

Alertas locais.

Atualização em tempo real.

---

# Qualidade

ESLint

Prettier

Husky

Conventional Commits

Sem uso de "any".

Componentes reutilizáveis.

Código limpo.

---

# Testes

Criar:

Testes unitários

Testes de componentes

Testes de navegação

Testes de integração

---

# README

Gerar documentação completa contendo:

Instalação

Configuração

Estrutura do projeto

Arquitetura

Como executar

Como gerar APK

Como gerar AAB

Como publicar na Play Store

Como configurar ambiente de desenvolvimento

---

# Requisitos visuais

Criar uma interface moderna inspirada em aplicativos premium.

Características:

* Material Design 3
* Aparência limpa
* Animações suaves
* Cards arredondados
* Ícones consistentes
* Excelente legibilidade
* Layout adaptável para qualquer resolução
* Experiência otimizada para toque, mouse e controle remoto
* Interface elegante e profissional, pronta para uso comercial

---

# Requisitos adicionais

O aplicativo deverá ser dividido em dois perfis distintos:

## Aplicativo dos Pais

Permite:

* Login
* Cadastro
* Dashboard
* Gerenciamento de filhos
* Gerenciamento de dispositivos
* Criação de regras
* Visualização de relatórios
* Localização em tempo real
* Histórico de uso
* Alertas
* Configurações

## Aplicativo da Criança (Modo Protegido)

Após o pareamento com a conta do responsável, o aplicativo deverá:

* Executar em segundo plano.
* Sincronizar automaticamente com o backend.
* Receber regras de bloqueio.
* Exibir apenas uma tela de proteção quando um aplicativo ou site for bloqueado.
* Não permitir alterações sem autenticação do responsável.
* Informar status de sincronização e permissões concedidas.

A estrutura do código deve permitir gerar os dois aplicativos a partir da mesma base de código (monorepo ou compartilhamento de módulos), reutilizando componentes, serviços, tema e lógica de negócio.

O resultado final deve ser um frontend altamente escalável, preparado para milhares de usuários simultâneos, com excelente experiência em smartphones, tablets e Android TV, mantendo desempenho elevado e código organizado seguindo as melhores práticas do ecossistema React Native.
