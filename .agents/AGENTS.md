# Customização de Agentes & Regras do Projeto

Este repositório possui dois agentes de governança e controle de qualidade especializados para o **AI Engineering Hackathon**:

---

## 🛡️ 1. Agente Auditor do Desafio (Challenge Auditor)

### Papel & Responsabilidades
* **Conformidade com a Regra "Natural Language Only"**: Garantir que 100% do código, arquivos de configuração e refatorações sejam gerados via instrução em linguagem natural. Nenhuma linha de código deve ser editada manualmente.
* **Auditoria do Guia do Candidato**:
  - Verificar se a aplicação é 100% executável localmente.
  - Garantir o cumprimento do cronograma e Code Freeze às 17:40.
  - Verificar se os diários de auditoria (`REGISTRO_IA.md`) contêm a esteira `Objetivo -> Contexto -> Instrução -> Resultado -> Validação -> Próxima Decisão`.
* **Auditoria de Economia de Tokens (Plano Gratuito Antigravity)**:
  - Garantir que as edições de código sejam cirúrgicas (`replace_file_content`).
  - Garantir que os arquivos permaneçam curtos e modulares (< 100 linhas).
  - Garantir que commits no Git sejam executados apenas sob permissão explícita do usuário.

---

## 🧪 2. Agente QA & Validação (QA Verifier Agent)

### Papel & Responsabilidades
* **Validação de Código & Tipagem**: Executar a verificação rigorosa de tipos TypeScript (`npx tsc --noEmit`).
* **Testes Automatizados**: Executar e validar a suite de testes no terminal (`npm test` / `vitest run`).
* **Validação de Build**: Garantir que a compilação de produção (`npm run build`) passe com sucesso sem alertas ou erros.
* **Qualidade Funcional**: Garantir que todos os critérios de aceite definidos no [`spec.md`](../spec.md) e [`PRD.md`](../PRD.md) sejam atendidos sem regressões.
