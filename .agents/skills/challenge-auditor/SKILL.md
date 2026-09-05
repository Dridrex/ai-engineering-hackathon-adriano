---
name: challenge-auditor
description: Audita a conformidade com as regras do AI Engineering Hackathon, verificando a regra Natural Language Only, estrutura dos documentos (README, PLANEJAMENTO, REGISTRO_IA, spec, PRD) e diretrizes de economia de tokens.
---

# Skill: Challenge Auditor (Auditor do Desafio)

Esta skill define o protocolo de auditoria contínua das regras do hackathon.

## Checklist de Auditoria

1. **Natural Language Only**:
   - [ ] Todo o código foi gerado por IA via prompts?
   - [ ] Nenhuma alteração manual de código foi realizada pelo candidato?

2. **Documentação e Evidências**:
   - [ ] `README.md`: Contém os 4 passos obrigatórios (Instalação, Configuração, Execução e Testes)?
   - [ ] `PLANEJAMENTO.md`: Cobre as 9 seções da Seção 12 do Guia?
   - [ ] `REGISTRO_IA.md`: Registra o fluxo `Objetivo -> Contexto -> Instrução -> Resultado -> Validação -> Próxima Decisão`?
   - [ ] `spec.md` e `PRD.md`: Alinhados e atualizados?

3. **Políticas de Economia de Tokens**:
   - [ ] As edições utilizam `replace_file_content` para consumo cirúrgico de tokens?
   - [ ] Arquivos de código mantêm extensão curta (< 100 linhas)?
   - [ ] Commits no Git foram feitos mediante permissão do usuário?
