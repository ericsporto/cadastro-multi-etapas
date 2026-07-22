# 📋 Desafio Técnico - Formulário Multi-Etapas

Aplicação web desenvolvida com **React**, **TypeScript**, **Tailwind CSS**, **Zustand**, **React Hook Form** e **Zod**. A aplicação conta com busca automática de CEP mockada, mascaramento de campos em tempo real, validação estrita de esquemas e exportação do resumo em PDF.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** React 18 + TypeScript + Vite
- **Gerenciamento de Estado:** Zustand
- **Formulários & Validação:** React Hook Form + Zod
- **Estilização:** Tailwind CSS + Lucide Icons
- **Exportação:** jsPDF + html2canvas
- **Testes:** Vitest + React Testing Library

---

## ⚡ Funcionalidades

1. **Etapa 1 - Dados Pessoais:** Validação de CPF, telefone e data de nascimento com máscaras dinâmicas.
2. **Etapa 2 - Informações Residenciais:** Consulta de endereço por CEP utilizando requisição POST simulada com auto-preenchimento.
3. **Etapa 3 - Informações Profissionais:** Select populado via requisição GET mockada e formatação monetária (BRL).
4. **Resumo & Exportação:** Visualização completa dos dados digitados com suporte para download em PDF.

---

## 📦 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/cadastro-multi-etapas.git](https://github.com/seu-usuario/cadastro-multi-etapas.git)

# Entre na pasta
cd cadastro-multi-etapas

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev