# PLAN.md — Planejamento Inicial da Solução (Incident Hub)

## 1. Entendimento
O objetivo do **Incident Hub** é substituir a comunicação informal e fragmentada de incidentes operacionais por uma aplicação web centralizada e confiável. A solução permite que uma pequena equipe de operações registre, filtre, acompanhe o histórico e gerencie o ciclo de vida dos incidentes com regras estritas de transição (ex: impedir que incidentes `Critical` passem direto de `Open` para `Resolved`).

---

## 2. Escopo

### Obrigatório
- Cadastro de novos incidentes (`title`, `description`, `severity`, `owner`, `status = Open` automático, timestamps).
- Listagem e filtragem por `status` e `severity`.
- Visualização de detalhes de um incidente e seu histórico completo de mudanças de status.
- Regra de negócio estrita: Bloqueio de transição `Open ➔ Resolved` para incidentes `Critical` (exigindo `In Progress` como etapa intermediária) com feedback de erro claro.
- Dashboard com visão resumida (Total de Abertos, Criticals pendentes, Resolvidos).
- Persistência de dados em `LocalStorage` com inicialização dos 3 incidentes de exemplo (Ana, Bruno, Carla).
- Testes automatizados cobrindo a regra de negócio do incidente `Critical`.

### Desejável
- Feedback visual instantâneo (notificações toast).
- Interface responsiva com tema escuro (Dark Mode).

### Fora de Escopo
- Autenticação e login.
- Níveis de permissão (RBAC) e múltiplos tenants.
- Integrações com serviços externos de e-mail ou SMS.

---

## 3. Decisões Técnicas

- **Stack**: React 18 + TypeScript + Vite (Foco em velocidade de build e baixo consumo de tokens por agente).
- **Estilização**: Vanilla CSS com Design Tokens (CSS Variables), Dark Mode e Layout Flex/Grid.
- **Persistência**: Browser Storage (`LocalStorage` com Seed Data de Ana, Bruno e Carla).
  - *Motivo*: Garante reprodutibilidade **100% local/offline** e facilita deploy web sem dependências pagas ou instáveis.
- **Estratégia de Testes**: `Vitest` + `happy-dom` executados no terminal.
- **Estrutura**: Modular em `types/`, `storage/`, `services/`, `components/` (<100 linhas por arquivo para edições cirúrgicas).

---

## 4. Decomposição das Atividades

- [x] **Etapa 1**: Setup inicial do repositório, agentes e documentação (`START.md`, `spec.md`, `PRD.md`).
- [x] **Etapa 2**: Criação dos tipos (`src/types/incident.ts`) e dados de exemplo (`src/storage/incidentStorage.ts`).
- [x] **Etapa 3**: Implementação da regra de negócio crítica e histórico (`src/services/incidentService.ts`).
- [x] **Etapa 4**: Desenvolvimento dos componentes UI (`Header`, `DashboardStats`, `IncidentForm`, `IncidentFilter`, `IncidentList`, `IncidentDetail`, `Notification`).
- [x] **Etapa 5**: Suíte de testes automatizados com Vitest (`src/tests/incidentService.test.ts`).
- [x] **Etapa 6**: Validação de QA (`tsc --noEmit`, `vitest run`, `vite build`) e preparação da documentação final.

---

## 5. Critérios de Aceite
1. Um incidente `Critical` em estado `Open` **NÃO PODE** ser alterado para `Resolved` diretamente, exibindo mensagem de erro clara (Seção 7 do Challenge Pack).
2. Incidentes `High`, `Medium` e `Low` **PODEM** ser alterados de `Open` diretamente para `Resolved` (sem restrição de etapa intermediária).
3. A transição `Open ➔ In Progress ➔ Resolved` para incidente `Critical` funciona corretamente.
4. Os 3 incidentes iniciais (Ana, Bruno, Carla) carregam automaticamente ao abrir a aplicação.
5. Filtros por status e severidade atualizam a lista em tempo real.
6. Histórico de alterações é gravado com data/hora e exibido nos detalhes do incidente.
7. Aplicação compila sem erros de TypeScript e passa em todos os testes do Vitest.

---

## 6. Riscos
- **Estouro de quota/tokens no Plano Gratuito**: Mitigado pelo uso de edições cirúrgicas (`replace_file_content`) e componentes <100 linhas.
- **Complexidade de UI/Estilização**: Mitigado por Vanilla CSS leve com tokens de design pré-definidos.
- **Erros de Transição de Estado**: Mitigado por testes automatizados focados no `incidentService`.

---

## 7. Estratégia de IA
- **Natural Language Only**: 100% do código gerado por IA via prompts em linguagem natural.
- **Governança por Agentes**: Agente Auditor do Desafio e Agente QA Verifier para garantir conformidade e qualidade técnica.
- **Auditoria**: Registro das interações no `AI_LOG.md`.
