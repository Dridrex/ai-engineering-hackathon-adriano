# Incident Hub

## 📌 Sobre o Projeto
**Incident Hub** é uma aplicação web desenvolvida durante o **AI Engineering Hackathon** para o registro, acompanhamento, filtragem e gestão centralizada de incidentes operacionais.

Todo o código, configurações e documentação foram gerados a partir de instruções em linguagem natural enviadas para Inteligência Artificial, atendendo à regra de **Natural Language Only**.

---

## 🚀 Como Executar a Aplicação Localmente

### Pré-requisitos
* Node.js (v18 ou superior)
* npm (v9 ou superior)

### Instalação
```bash
# Instalar as dependências do projeto
npm install
```

### Execução
```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```
Acesse a aplicação no navegador em `http://localhost:5173`.

### Dados Iniciais (Seed Data)
A aplicação carrega automaticamente 3 incidentes de exemplo ao ser aberta pela primeira vez:
1. **Payment API instability** (Severity: `Critical`, Owner: `Ana`, Status: `Open`)
2. **Reconciliation delay** (Severity: `High`, Owner: `Bruno`, Status: `In Progress`)
3. **Incorrect customer notification** (Severity: `Medium`, Owner: `Carla`, Status: `Resolved`)

Para restaurar os dados de exemplo a qualquer momento, clique no botão **"Resetar Dados"** no cabeçalho da aplicação. Isso apagará todos os dados atuais e recarregará os incidentes de exemplo acima.

### Testes
```bash
# Executar a suíte de testes automatizados (Vitest)
npm test
```

---

## 🏗️ Arquitetura da Solução
* **Frontend**: React 18 + TypeScript + Vite.
* **Estilização**: Vanilla CSS com Design Tokens (Dark Mode nativo, Glassmorphism, Layout Responsivo).
* **Persistência**: `LocalStorage` via Browser Storage Adapter com Carga Inicial (`Seed Data`).
* **Testes**: `Vitest` com `happy-dom` para verificação automatizada de regras de negócio.
* **Validação de Transição**: O serviço `incidentService.ts` garante que incidentes `Critical` em estado `Open` obrigatoriamente passem por `In Progress` antes de serem marcados como `Resolved`.

---

## ⚠️ Limitações Conhecidas
- A aplicação utiliza `LocalStorage` para persistência no navegador (sem backend externo ou múltiplos tenants).
- Não possui sistema de autenticação ou controle de acesso de usuários.
