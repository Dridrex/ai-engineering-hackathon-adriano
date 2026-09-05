# Product Requirement Document (`PRD.md`)

> **Nota**: Este documento foi gerado baseado EXCLUSIVAMENTE nas especificações técnicas contidas em [`spec.md`](./spec.md).

---

## 1. Visão Geral
* **Nome do Projeto**: AI Engineering Hackathon Solution
* **Descrição**: Construção de uma aplicação de software funcional, 100% gerada por Inteligência Artificial a partir de instruções em linguagem natural (regra "Natural Language Only"), para resolver o desafio proposto no hackathon.
* **Público-Alvo**: Avaliadores do hackathon e usuários finais da solução.
* **Filosofia Central**: Spec-Driven Development (SDD) para garantir qualidade de código, fronteiras de contexto estruturadas e menor consumo de tokens por iteração.

---

## 2. Objetivos
* Entregar uma aplicação funcional e testada localmente até o horário do Code Freeze (17:40).
* Garantir 100% de geração de código via IA em linguagem natural.
* Manter um consumo de tokens ultra-eficiente alinhado às restrições do plano gratuito do Antigravity.
* Fornecer reprodutibilidade local total via comandos padrão de instalação, execução e teste.

---

## 3. Escopo

### Incluído
* Aplicação frontend interativa desenvolvida com React 18, TypeScript e Vite.
* Sistema de estilização via Vanilla CSS com Design Tokens (CSS Variables), Dark Mode nativo e suporte a glassmorphism.
* Camada de persistência de dados local baseada na Browser Storage API (`LocalStorage` / `IndexedDB`) com dados iniciais de semente (`Seed Data`).
* Conjunto de ícones vetoriais utilizando `lucide-react`.
* Suite de testes unitários e de UI executáveis via `Vitest` e `@testing-library/react`.
* Estrutura de código modularizada com componentes com limite de ~100 linhas por arquivo.

### Não Incluído
* Serviços de banco de dados externos ou infraestrutura de nuvem com dependências pagas/instáveis.
* Edições manuais de código-fonte pelo desenvolvedor.
* Reescritas completas de arquivos durante a fase de manutenção/refatoração.

---

## 4. Premissas
* O desenvolvimento é estritamente regido pelas diretrizes do Spec-Driven Development (SDD).
* O ambiente de execução suporta Node.js e gerenciador de pacotes `npm`.
* A quota e o limite de tokens do Plano Gratuito do Antigravity devem durar por todo o período do evento (~8 horas).
* Commits e pushes no Git ocorrem sob permissão expressa do usuário em pontos de controle específicos.

---

## 5. Requisitos Funcionais (Incident Hub)
* **F01 - Criação de Incidente**: Cadastro com `title`, `description`, `severity` (`Low`, `Medium`, `High`, `Critical`) e `owner`. O `status` é inicializado automaticamente como `Open`.
* **F02 - Validação da Regra de Transição Critical**: Bloqueio de transição direta de `Open` para `Resolved` para incidentes `Critical` (exigindo `In Progress` como passo intermediário) com feedback de erro claro.
* **F03 - Lista e Filtragem**: Filtros simultâneos por `status` e por `severity`.
* **F04 - Detalhes e Histórico**: Exibição dos dados do incidente e do histórico acumulado de alterações de status com timestamps.
* **F05 - Dashboard Resumido**: Métricas em tempo real (Total Abertos, Criticals pendentes, Total Resolvidos).
* **F06 - Carga Inicial (Seed Data)**: Pré-carregamento dos incidentes de Ana (`Critical`, `Open`), Bruno (`High`, `In Progress`) e Carla (`Medium`, `Resolved`).

---

## 6. Requisitos Não Funcionais
* **NF01 - Token Efficiency**: Módulos desacoplados de alta coesão e arquivos < 100 linhas para permitir edições cirúrgicas (`replace_file_content`).
* **NF02 - Reprodutibilidade Local**: Execução e instalação imediata via `npm install` e `npm run dev`.
* **NF03 - Performance**: Tempo de carregamento sub-segundo e resposta instantânea na UI.
* **NF04 - Testabilidade**: Testes unitários/componentes automatizados executáveis via `npm test` (`vitest run`).

---

## 7. Critérios de Aceite
1. Um incidente `Critical` em estado `Open` não pode ser resolvido diretamente sem passar por `In Progress`.
2. Tentativa de transição inválida gera feedback visual de erro.
3. Os 3 incidentes iniciais de exemplo carregam automaticamente na primeira utilização.
4. A aplicação compila sem erros de TypeScript (`npm run build`).
5. Todos os testes automatizados passam no comando `npm test`.

---

## 8. Perguntas Abertas (Resolvidas pelo Challenge Pack)
* **PA-01 - Regras de Negócio do Desafio**: Resolvido. O desafio é o **Incident Hub**, com foco na gestão de incidentes e na regra estrita de transição de status de severidade `Critical`.
* **PA-02 - Schemas e Dados Iniciais**: Resolvido. Schemas e Seed Data foram definidos com Ana, Bruno e Carla.
