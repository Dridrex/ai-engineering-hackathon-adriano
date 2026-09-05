---
name: qa-verifier
description: Executa a validação técnica e de qualidade da aplicação (compilação de tipos TypeScript, execução de testes unitários com Vitest, validação de build e regras funcionais).
---

# Skill: QA Verifier (Agente de Garantia de Qualidade)

Esta skill define a rotina automatizada de verificação e testes da aplicação.

## Comandos de Verificação

### 1. Verificação de Tipos TypeScript
```bash
npx tsc --noEmit
```

### 2. Suíte de Testes Automatizados (Vitest)
```bash
npm test
```

### 3. Validação de Build de Produção
```bash
npm run build
```

## Protocolo de Aceite de QA
- **Zero Alertas Críticos**: NENHUM erro de compilação de tipos é aceito.
- **100% de Testes Aprovados**: Todos os testes na pasta `src/tests/` devem passar limpos.
- **Validação de UI/UX**: Componentes devem renderizar sem crash e atender aos contratos em `src/types/`.
