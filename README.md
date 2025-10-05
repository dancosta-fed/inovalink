# Inovalink

Uma plataforma moderna para conectar freelancers com empresas, desenvolvida com React e TypeScript.

## 🚀 Funcionalidades

### 🔐 Autenticação
- Login com seleção de tipo de usuário (Freelancer ou Empresa)
- Gerenciamento de sessão do usuário
- Interface de login responsiva e intuitiva

### 🌐 Internacionalização
- Suporte completo para Português (PT-BR) e Inglês
- Toggle de idioma na interface
- Português como idioma padrão

### 👥 Tipos de Usuário

#### Freelancers
- Visualizar todos os projetos disponíveis
- Responder a projetos de interesse
- Participar de discussões nos projetos
- Interface personalizada para freelancers

#### Empresas
- Criar novos projetos
- Gerenciar projetos existentes
- Comunicar-se com freelancers interessados
- Interface personalizada para empresas

### 📋 Gerenciamento de Projetos
- Lista completa de projetos com filtros
- Detalhes completos de cada projeto:
  - Título e descrição
  - Orçamento e prazo
  - Habilidades necessárias
  - Status do projeto (Aberto/Em Progresso/Concluído)
- Sistema de criação de projetos para empresas

### 💬 Sistema de Mensagens
- Interface tipo fórum para discussões
- Mensagens em tempo real
- Identificação de usuários (Freelancer/Empresa)
- Timestamps das mensagens
- Histórico completo de conversas

### 🎨 Interface do Usuário
- Design moderno e responsivo
- Componentes reutilizáveis
- Animações suaves
- Tema consistente com Tailwind CSS
- Experiência mobile-friendly

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática para JavaScript
- **React Router** - Navegação entre páginas
- **Tailwind CSS** - Framework CSS para estilização
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   └── CreateProjectModal.tsx
├── contexts/            # Contextos do React
│   └── UserContext.tsx
├── pages/              # Páginas da aplicação
│   ├── login.tsx
│   ├── home.tsx
│   └── ProjectDetails.tsx
├── utils/              # Utilitários e helpers
│   └── translations.ts
├── App.tsx            # Componente principal
└── index.tsx          # Ponto de entrada
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd inovalink
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 📱 Como Usar

### 1. Login
- Acesse a página inicial
- Selecione seu tipo de usuário (Freelancer ou Empresa)
- Digite seu email
- Clique em "Login"

### 2. Navegação
- Use o toggle de idioma para alternar entre PT-BR e Inglês
- Visualize seu email no canto superior direito
- Use o botão "Sair" para fazer logout

### 3. Para Empresas
- Clique em "Criar Projeto" para adicionar novos projetos
- Preencha todos os campos obrigatórios
- Visualize e gerencie seus projetos na lista principal

### 4. Para Freelancers
- Navegue pela lista de projetos disponíveis
- Clique em qualquer projeto para ver detalhes
- Participe das discussões enviando mensagens

### 5. Sistema de Mensagens
- Acesse qualquer projeto para ver a discussão
- Digite sua mensagem no campo de texto
- Visualize todas as respostas anteriores
- Identifique outros usuários pelos badges

## 🎯 Funcionalidades Futuras

- [ ] Sistema de notificações
- [ ] Filtros avançados para projetos
- [ ] Sistema de avaliações
- [ ] Upload de arquivos
- [ ] Chat em tempo real
- [ ] Dashboard de analytics
- [ ] Sistema de pagamentos
- [ ] Aplicativo mobile

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

Inovalink Team

---

**Inovalink** - Conectando talentos com oportunidades 🚀