# Registro de Uso de Inteligência Artificial (Auditoria)

Este documento registra as principais interações, prompts estratégicos e decisões de engenharia guiadas por IA durante o desenvolvimento da solução.

* **Repositório GitHub**: https://github.com/Dridrex/ai-engineering-hackathon-adriano

---

## Registro de Interações Relevantes

### 🔹 Interação 1: Análise do Guia do Candidato e Setup Inicial (Checkpoint 1)
* **Objetivo**: Ler e interpretar as regras do Hackathon, garantir conformidade com a regra de Natural Language Only e preparar a estrutura inicial de repositório e documentação.
* **Contexto fornecido**: PDF do Candidate Guide (`AI Engineering Hackathon — Candidate Guide`).
* **Instrução / Prompt**: "analise o documento e primeiro vamos fazer o chackpoint com o primeiro commit"
* **Resultado**:
  - Leitura detalhada das regras do Hackathon.
  - Criação do plano de execução do primeiro commit.
  - Inicialização do repositório Git e criação dos arquivos `.gitignore`, `README.md`, `PLANEJAMENTO.md` e `REGISTRO_IA.md`.
  - Conexão com o repositório remoto `https://github.com/Dridrex/ai-engineering-hackathon-adriano`.
* **Validação**: Verificação dos arquivos criados e execução do commit inicial.
* **Próxima decisão**: Definir a especificação técnica (`spec.md`) utilizando Spec-Driven Development (SDD) para otimizar consumo de tokens e guiar a codificação via IA.

### 🔹 Interação 2: Especificação Técnica e Spec-Driven Development (spec.md)
* **Objetivo**: Criar a fonte única da verdade (`spec.md`) seguindo a metodologia Spec-Driven Development (SDD) para orientar os agentes de IA com menor consumo de tokens por iteração.
* **Contexto fornecido**: Metodologia SDD e diretrizes do Hackathon (Vite + React + TypeScript + Vitest).
* **Instrução / Prompt**: "agora baseado nas principais funcionalidades do problema; analise dentro das tecnologias que estaremos utilizando vamos montar o spec.md do projeto. estaremos usando spec driven development para desenvolvimento usando agentes visando o menor consumo de tokens possivel por resultado"
* **Resultado**:
  - Criação de [`spec.md`](./spec.md) detalhando Requisitos, Tech Stack, Estrutura de Diretórios isolada, Design System e Regras de Otimização de Tokens.
* **Validação**: Validação da estrutura de especificações e verificação do alinhamento com as regras do Hackathon.
* **Próxima decisão**: Definir arquitetura de persistência e estrutura de diretórios em conjunto com o usuário.

### 🔹 Interação 3: Definição de Arquitetura, Persistência de Dados e Deploy Web
* **Objetivo**: Escolher e documentar as decisões de arquitetura de frontend, gerenciamento de estado, testes automatizados e estratégia de persistência compatível com deploy web.
* **Contexto fornecido**: Requisitos do candidato, plano gratuito do Antigravity e necessidade de rodar 100% localmente e via web.
* **Instrução / Prompt**: Questionamento guiado de arquitetura ("vamos levar em conta que precisamos documentar todas as decisoes...").
* **Resultado**:
  - Alinhamento no uso de **React 18 + TypeScript + Vite**.
  - Definição da camada de persistência via **Browser Storage Adapter (`LocalStorage` / `IndexedDB` + Seed Data)**.
  - Definição da suite de testes **Vitest + React Testing Library**.
  - Atualização dos documentos [`spec.md`](./spec.md) e [`PLANEJAMENTO.md`](./PLANEJAMENTO.md).
* **Validação**: Documentos atualizados e em total conformidade com o edital do Hackathon.
* **Próxima decisão**: Criar o PRD.md baseado exclusivamente no spec.md.

### 🔹 Interação 4: Geração do PRD.md a partir do spec.md
* **Objetivo**: Elaborar o Product Requirement Document ([`PRD.md`](./PRD.md)) derivado estritamente do [`spec.md`](./spec.md) sem invenção de requisitos.
* **Contexto fornecido**: Instrução explícita de extração do `spec.md` com 8 seções obrigatórias e registro de ambiguidades.
* **Instrução / Prompt**: "Crie o arquivo PRD.md baseado EXCLUSIVAMENTE no conteúdo de spec.md..."
* **Resultado**:
  - Criação do documento [`PRD.md`](./PRD.md) cobrindo Visão Geral, Objetivos, Escopo (Incluído/Não Incluído), Premissas, Requisitos Funcionais, Requisitos Não Funcionais, Critérios de Aceite e Perguntas Abertas.
* **Validação**: Verificação de fidelidade total ao `spec.md` sem extrapolações.
* **Próxima decisão**: Configurar os agentes de governança (Auditor do Desafio e QA Verifier) e inicializar a estrutura v1 da aplicação.

### 🔹 Interação 5: Configuração de Agentes (Auditor & QA) e Validação da Versão 1 do App
* **Objetivo**: Configurar as regras e habilidades dos dois agentes de governança ([`.agents/AGENTS.md`](./.agents/AGENTS.md)), criar a estrutura completa do app React 18 + TypeScript + Vite e validar com a suíte de QA.
* **Contexto fornecido**: Solicitação do usuário para configurar o Agente Auditor do Desafio e o Agente QA Verifier, além de montar a v1 do app.
* **Instrução / Prompt**: "monte toda as estruturas e vamos preparar a primeira versao do app; configure os skills necessarios para o desenvolvimento e quero dois agentes..."
* **Resultado**:
  - Criação de [`.agents/AGENTS.md`](./.agents/AGENTS.md) definindo os papéis do **Challenge Auditor** e **QA Verifier**.
  - Criação das habilidades [`challenge-auditor`](./.agents/skills/challenge-auditor/SKILL.md) e [`qa-verifier`](./.agents/skills/qa-verifier/SKILL.md).
  - Construção da estrutura completa da v1 (`src/types/`, `src/storage/`, `src/services/`, `src/components/`, `src/tests/`).
* **Validação (Agente QA)**:
  - `npx.cmd tsc --noEmit`: 0 erros de tipagem.
  - `npx.cmd vitest run`: 3/3 testes automatizados aprovados (100% sucesso).
  - `npm.cmd run build`: Compilação de produção concluída com sucesso em `dist/`.
* **Próxima decisão**: Manter todas as evoluções no ambiente local e realizar o commit/push apenas ao finalizar o produto final, conforme orientação da equipe do Hackathon.

### 🔹 Interação 6: Diretiva de Commits da Equipe e Prontidão do Ambiente
* **Objetivo**: Registrar a orientação explícita da organização do Hackathon referente ao momento de realização dos commits.
* **Contexto fornecido**: Instrução direta do usuário ("como dito pela equipa vamos committar agr somente no final quando finalizado o produto").
* **Resultado**:
  - Atualização da estratégia de versão no [`PLANEJAMENTO.md`](./PLANEJAMENTO.md).
  - Preservação do código e testes aprovados localmente para desenvolvimento contínuo.
* **Validação**: Ambiente local 100% pronto, com build e testes aprovados, aguardando o enunciado específico do problema.
* **Próxima decisão**: Implementar a persistência de rascunho em tempo real para campos preenchíveis e estados de UI.

### 🔹 Interação 7: Auditoria Completa do Desafio e Persistência de Rascunhos de Formulário
* **Objetivo**: Auditar 100% das exigências do Challenge Pack e adicionar persistência em tempo real para rascunhos de formulário (`FormDraft`), campos preenchidos e estados da interface (filtros e seleção de incidentes).
* **Contexto fornecido**: Solicitação para analisar o documento do desafio na íntegra, identificar lacunas e implementar a retenção total de dados ao atualizar a página (F5).
* **Instrução / Prompt**: "conforme descrito no desafio quando eu clico no botao de novo incidente ou em qualquer campo preenchivel ao atualizar a pagina ela nao deve perder as informaçoes mantendo a persistencia da mesma"
* **Resultado**:
  - Implementação de `FormDraft` (`isOpen`, `title`, `description`, `severity`, `owner`) em [`src/storage/incidentStorage.ts`](./src/storage/incidentStorage.ts).
  - Atualização dos componentes [`IncidentForm.tsx`](./src/components/IncidentForm.tsx) e [`App.tsx`](./src/App.tsx) com sincronização em tempo real via LocalStorage.
  - Adição do botão "Resetar Dados" no [`Header.tsx`](./src/components/Header.tsx) para facilidade de auditoria.
* **Validação (Agente QA)**:
  - `npx.cmd tsc --noEmit`: 0 erros de tipagem.
  - `npx.cmd vitest run`: 6/6 testes automatizados aprovados (100% sucesso).
  - `npm.cmd run build`: Compilação de produção concluída em `1.36s`.
* **Próxima decisão**: Implementar o popup de descrição da resolução obrigatória ao marcar um incidente como Resolved.

### 🔹 Interação 8: Popup de Descrição da Resolução (Obrigatoriedade de Justificativa)
* **Objetivo**: Garantir que, ao clicar no botão `Resolved`, seja exibido um popup/modal ([`ResolutionModal.tsx`](./src/components/ResolutionModal.tsx)) exigindo a descrição detalhada da resolução aplicada, com botões OK e Cancelar.
* **Contexto fornecido**: Instrução explícita do usuário para proibir o encerramento de um incidente com descrição de resolução vazia.
* **Instrução / Prompt**: "quando clicado em resolved abra um popup para que o usuario preencha com uma descriçao da resoluçao do problema e a mesma nao pode estar vazia..."
* **Resultado**:
  - Criação de [`ResolutionModal.tsx`](./src/components/ResolutionModal.tsx).
  - Atualização dos tipos em [`src/types/incident.ts`](./src/types/incident.ts) para armazenar `resolutionNotes`.
  - Validação estrita no [`incidentService.ts`](./src/services/incidentService.ts) impedindo resoluções com descrição vazia.
  - Exibição da nota de resolução nos detalhes e no histórico de transições do incidente.
* **Validação (Agente QA)**:
  - `npx.cmd tsc --noEmit`: 0 erros de tipagem.
  - `npx.cmd vitest run`: 6/6 testes aprovados (100% sucesso).
  - `npm.cmd run build`: Compilação de produção concluída em `7.08s`.
* **Próxima decisão**: Apresentar a funcionalidade para testes do usuário.
