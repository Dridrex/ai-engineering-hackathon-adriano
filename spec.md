# Specification Document (`spec.md`)

## A. Goal & Overview
* **Project Name**: AI Engineering Hackathon Solution
* **Objective**: Build a robust, 100% AI-generated functional software application addressing the hackathon challenge, strictly adhering to the "Natural Language Only" rule.
* **Target Audience**: Hackathon evaluators and end users.
* **Core Philosophy**: Spec-Driven Development (SDD) to maximize code quality, maintain strict context boundaries, and minimize LLM token consumption per iteration.

---

## B. Requirements & Features

### Functional Requirements (Incident Hub)
* **F01 - Criar Incidente**: O usuário pode cadastrar um incidente com `title`*, `description`*, `severity`* (`Low`, `Medium`, `High`, `Critical`) e `owner`*. O `status` inicial é automaticamente `Open` e os timestamps `createdAt` e `updatedAt` são registrados.
* **F02 - Regra de Negócio Crítica (Critical Transition Rule)**:
  - Um incidente com severidade `Critical` **NÃO PODE** passar diretamente de `Open` para `Resolved`.
  - A transição permitida para `Critical` deve seguir obrigatoriamente: `Open ➔ In Progress ➔ Resolved`.
  - Tentativas de transição inválidas são bloqueadas e exibem um **feedback de erro claro ao usuário**.
* **F03 - Lista & Filtros**: Visualização da lista de incidentes com filtros combinados em tempo real por `status` (`Open`, `In Progress`, `Resolved`) e por `severity` (`Low`, `Medium`, `High`, `Critical`).
* **F04 - Detalhes & Histórico**: Visualização dos detalhes do incidente e histórico persistido de mudanças de status com data/hora (ex: `10:31 — Open ➔ In Progress`).
* **F05 - Dashboard Resumido**: Cards indicando a quantidade de incidentes atualmente abertos (`Open` + `In Progress`), incidentes `Critical` não resolvidos e incidentes resolvidos (`Resolved`).
* **F06 - Persistência & Seed Data**: Persistência no `LocalStorage` com inicialização dos 3 incidentes de exemplo obrigatórios:
  1. Title: "Payment API instability", Severity: "Critical", Owner: "Ana", Status: "Open"
  2. Title: "Reconciliation delay", Severity: "High", Owner: "Bruno", Status: "In Progress"
  3. Title: "Incorrect customer notification", Severity: "Medium", Owner: "Carla", Status: "Resolved"

### Non-Functional Requirements
* **NF01 - Token Efficiency**: Módulos desacoplados de alta coesão para edições cirúrgicas sem sobrecarregar o contexto da IA.
* **NF02 - Reprodutibilidade Local**: Execução imediata via `npm install` e `npm run dev`.
* **NF03 - Performance**: Tempo de carregamento sub-segundo e resposta instantânea na UI.
* **NF04 - Testabilidade**: Testes unitários/componentes automatizados executáveis via `npm test`.

---

## C. Tech Stack & Architecture

### Stack Selecionada (Token-Optimized & Deploy-Ready)
* **Frontend Framework**: React 18 + TypeScript + Vite (Compilação e HMR instantâneos, zero overhead).
* **Styling System**: Modern Vanilla CSS com Design Tokens (CSS Variables) — flexível, leve, dark mode nativo e suporte a glassmorphism.
* **Persistência de Dados**: Browser Storage API (`LocalStorage` / `IndexedDB`) com adapter desacoplado (`src/storage/`) e Carga de Dados Inicial (`Seed Data`).
  * *Justificativa*: Garante que a aplicação rode **100% localmente sem falhas de rede** e seja **100% publicável via Web (Vercel / Netlify / GitHub Pages)** sem depender de banco de dados pago ou instável.
* **Icons / Assets**: `lucide-react` para ícones vetoriais modernos.
* **Test Runner**: `Vitest` + `@testing-library/react` (execução ultra-rápida de testes unitários e de UI).
* **Package Manager**: `npm`.

### Estrutura de Diretórios (Modular Boundary)
```text
d:/desafio convem/
├── .gitignore
├── README.md
├── PLANEJAMENTO.md
├── REGISTRO_IA.md
├── spec.md
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css          # Design System Tokens & Base Styles
│   ├── types/             # Single Source of Truth para Schemas e Interfaces
│   ├── storage/           # Camada de Persistência (LocalStorage Adapter)
│   ├── components/        # Componentes UI isolados (< 100 linhas cada)
│   ├── services/          # Regras de Negócio e Serviços
│   └── tests/             # Testes automatizados (Vitest)
```

---

## D. UI/UX Design System

* **Color Palette (Dark Modern)**:
  * Primary Accent: `hsl(217, 91%, 60%)` (Electric Blue)
  * Secondary Accent: `hsl(142, 71%, 45%)` (Emerald Green)
  * Background Main: `hsl(222, 47%, 11%)` (Deep Navy)
  * Card / Surface: `hsl(217, 33%, 17%)` (Sleek Slate)
  * Text Primary: `hsl(210, 40%, 98%)` (Pure Crisp White)
  * Text Muted: `hsl(215, 20%, 65%)` (Cool Gray)
* **Typography**: Inter / Outfit (Google Fonts).
* **Interações**: Micro-animações suaves em hover, transições de estado, glassmorphism e feedback visual claro para ações do usuário.

---

## E. Diretrizes SDD & Protocolo de Economia para Plano Gratuito (Antigravity)

Para garantir que o limite de quota e tokens do **Plano Gratuito do Antigravity** dure com segurança durante todas as ~8 horas de Hackathon (até o Code Freeze às 17:40):

1. **Edições Cirúrgicas (`replace_file_content`)**:
   - Nunca reescrever arquivos inteiros após a criação inicial. Usar edições cirúrgicas substituindo apenas as linhas necessárias para consumir o mínimo de tokens de entrada e saída.
2. **Arquivos Pequenos e Modulares (< 100 linhas)**:
   - Dividir a aplicação em pequenos componentes e utilitários focados. Isso evita que o agente precise ler arquivos gigantes a cada alteração.
3. **Contrato Único via `src/types/`**:
   - Especificar todas as interfaces e tipos no início. Agentes e componentes referenciam os tipos sem precisar reanalisar a lógica de outros componentes.
4. **Agrupamento de Comandos de Validação**:
   - Executar verificações em lote no terminal (`npm run test && npx tsc --noEmit`) para economizar ciclos de mensagens e requisições.
5. **Comunicação Direta e Sem Desperdício**:
   - Manter as respostas do agente sintéticas e focadas no resultado técnico sem mensagens prolixas.
6. **Commits Sob Permissão**:
   - Commits e pushes serão executados em pontos de controle estratégicos mediante confirmação do usuário para otimizar o tempo e fluxo de trabalho.

---

## F. Acceptance Criteria & Verification Plan

### Critérios de Aceite
1. [ ] A aplicação compila sem erros de TypeScript (`npm run build`).
2. [ ] Servidor de desenvolvimento inicia normalmente em `npm run dev`.
3. [ ] Todos os testes automatizados passam em `npm test`.
4. [ ] README.md reflete exatamente os passos de instalação e execução.
5. [ ] Repositório sincronizado e sem pendências no Git.

### Plano de Verificação
```bash
# 1. Verificar tipos
npx tsc --noEmit

# 2. Executar testes
npm test

# 3. Validar build final
npm run build
```
