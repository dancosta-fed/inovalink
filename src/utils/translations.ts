export const translations = {
  pt: {
    welcome: {
      freelancer: 'Bem-vindo ao Inovalink!',
      business: 'Bem-vindo ao Inovalink!',
      subtitle: 'Sua plataforma para conectar freelancers com empresas.'
    },
    nav: {
      profile: 'Perfil',
      logout: 'Sair'
    },
    dashboard: {
      projects: 'Projetos',
      projectsDesc: 'Gerencie seus projetos',
      messages: 'Mensagens',
      messagesDesc: 'Comunique-se com clientes',
      analytics: 'Analytics',
      analyticsDesc: 'Visualize seu desempenho',
      recentActivity: 'Atividades Recentes',
      noActivity: 'Nenhuma atividade recente para exibir',
      createProject: 'Criar Projeto'
    },
    projects: {
      title: 'Título',
      description: 'Descrição',
      budget: 'Orçamento',
      deadline: 'Prazo',
      skills: 'Habilidades',
      postedBy: 'Postado por',
      status: 'Status',
      open: 'Aberto',
      'in-progress': 'Em Progresso',
      completed: 'Concluído',
      reply: 'Responder',
      viewDetails: 'Ver Detalhes'
    },
    projectDetails: {
      back: 'Voltar',
      replies: 'Respostas',
      sendMessage: 'Enviar Mensagem',
      typeMessage: 'Digite sua mensagem...',
      send: 'Enviar'
    }
  },
  en: {
    welcome: {
      freelancer: 'Welcome to Inovalink!',
      business: 'Welcome to Inovalink!',
      subtitle: 'Your platform for connecting freelancers with businesses.'
    },
    nav: {
      profile: 'Profile',
      logout: 'Logout'
    },
    dashboard: {
      projects: 'Projects',
      projectsDesc: 'Manage your projects',
      messages: 'Messages',
      messagesDesc: 'Communicate with clients',
      analytics: 'Analytics',
      analyticsDesc: 'View your performance',
      recentActivity: 'Recent Activity',
      noActivity: 'No recent activity to display',
      createProject: 'Create Project'
    },
    projects: {
      title: 'Title',
      description: 'Description',
      budget: 'Budget',
      deadline: 'Deadline',
      skills: 'Skills',
      postedBy: 'Posted by',
      status: 'Status',
      open: 'Open',
      'in-progress': 'In Progress',
      completed: 'Completed',
      reply: 'Reply',
      viewDetails: 'View Details'
    },
    projectDetails: {
      back: 'Back',
      replies: 'Replies',
      sendMessage: 'Send Message',
      typeMessage: 'Type your message...',
      send: 'Send'
    }
  }
};

export const getTranslation = (language: 'pt' | 'en') => {
  return translations[language];
};
