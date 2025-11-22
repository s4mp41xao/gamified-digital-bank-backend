# 🏦 Banco Digital Gamificado (Backend)

Este é o backend de um Banco Digital Gamificado, desenvolvido com **NestJS** e **MongoDB**. O projeto combina funcionalidades bancárias essenciais com um sistema de gamificação para incentivar o engajamento do usuário.

## 🚀 Tecnologias

-   **Framework:** [NestJS](https://nestjs.com/)
-   **Banco de Dados:** [MongoDB](https://www.mongodb.com/) com [Mongoose](https://mongoosejs.com/)
-   **Autenticação:** [Better-Auth](https://better-auth.com/)
-   **Linguagem:** TypeScript

## 📋 Funcionalidades

### 💳 Bancárias
-   **Saldo:** Consulta de saldo em tempo real.
-   **Depósito:** Simulação de depósito em conta.
-   **Saque:** Simulação de saque (com validação de saldo).
-   **Transferência:** Transferência de valores entre usuários.
-   **Extrato:** Histórico completo de transações (entradas e saídas).

### 🎮 Gamificação
-   **XP (Experiência):** Ganhe XP ao realizar operações bancárias.
    -   *Depósito:* 1 XP a cada 10 unidades depositadas.
    -   *Transferência:* 5 XP por transferência realizada.
-   **Níveis:** Suba de nível acumulando XP.
    -   Fórmula: `Nível = 1 + floor(sqrt(XP / 100))`
-   **Conquistas (Badges):** Desbloqueie medalhas especiais.
    -   🏅 **HIGH_ROLLER:** Deposite 1000 ou mais em uma única transação.
    -   🏅 **FIRST_TRANSFER:** Realize sua primeira transferência.

## 🛠️ Instalação e Configuração

### Pré-requisitos
-   Node.js (v18+)
-   MongoDB rodando localmente ou URI de conexão.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd new-antigravity-bank
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
    ```env
    MONGO_URI=mongodb://localhost:27017/gamified-bank
    BETTER_AUTH_SECRET=sua_chave_secreta_aqui
    PORT=3000
    ```

4.  **Inicie o Servidor:**
    ```bash
    # Desenvolvimento
    npm run start:dev
    ```

## 🔌 Documentação da API

Você pode testar a API utilizando o arquivo `api_test.http` incluído no projeto (recomendado usar a extensão **REST Client** do VS Code).

### Autenticação (`/auth`)
-   `POST /auth/signup`: Registrar novo usuário.
-   `POST /auth/signin`: Login (retorna dados da sessão/usuário).

### Banco (`/bank`)
-   `GET /bank/balance/:userId`: Consultar saldo.
-   `POST /bank/deposit`: Realizar depósito.
    -   Body: `{ "userId": "...", "amount": 100 }`
-   `POST /bank/withdraw`: Realizar saque.
    -   Body: `{ "userId": "...", "amount": 50 }`
-   `POST /bank/transfer`: Realizar transferência.
    -   Body: `{ "fromUserId": "...", "toUserId": "...", "amount": 25 }`
-   `GET /bank/statement/:userId`: Consultar extrato.

### Gamificação (`/gamification`)
-   `GET /gamification/profile/:userId`: Ver perfil de gamificação (XP, Nível, Conquistas).

## 🧪 Testes

Para verificar o funcionamento do sistema, siga o fluxo sugerido no arquivo `api_test.http`:

1.  Crie dois usuários (User A e User B).
2.  Faça login para obter os IDs.
3.  Realize depósitos e transferências.
4.  Verifique o perfil de gamificação para ver o XP subindo e as conquistas sendo desbloqueadas!

---
Desenvolvido com 💜 usando NestJS.
