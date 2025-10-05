import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  email: string;
  userType: 'freelancer' | 'business';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  skills: string[];
  postedBy: string;
  postedDate: string;
  status: 'open' | 'in-progress' | 'completed';
  replies: ProjectReply[];
}

export interface ProjectReply {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  isBusiness: boolean;
}

interface UserContextType {
  user: User | null;
  language: 'pt' | 'en';
  setUser: (user: User | null) => void;
  setLanguage: (language: 'pt' | 'en') => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, 'id' | 'replies'>) => void;
  addReply: (projectId: string, reply: Omit<ProjectReply, 'id'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Desenvolvimento de Website E-commerce',
      description: 'Preciso de um desenvolvedor para criar um website de e-commerce completo com sistema de pagamento.',
      budget: 'R$ 5.000 - R$ 10.000',
      deadline: '2024-02-15',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      postedBy: 'João Silva',
      postedDate: '2024-01-10',
      status: 'open',
      replies: [
        {
          id: '1',
          userId: 'user1',
          userName: 'Maria Santos',
          message: 'Olá! Tenho experiência com React e Node.js. Gostaria de saber mais detalhes sobre o projeto.',
          timestamp: '2024-01-11T10:30:00',
          isBusiness: false
        }
      ]
    },
    {
      id: '2',
      title: 'Design de Logo para Startup',
      description: 'Procuramos um designer criativo para criar um logo moderno e profissional para nossa startup de tecnologia.',
      budget: 'R$ 1.000 - R$ 3.000',
      deadline: '2024-02-01',
      skills: ['Adobe Illustrator', 'Photoshop', 'Branding'],
      postedBy: 'TechStartup Ltda',
      postedDate: '2024-01-08',
      status: 'open',
      replies: []
    }
  ]);

  const addProject = (project: Omit<Project, 'id' | 'replies'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      replies: []
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const addReply = (projectId: string, reply: Omit<ProjectReply, 'id'>) => {
    const newReply: ProjectReply = {
      ...reply,
      id: Date.now().toString()
    };
    
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, replies: [...project.replies, newReply] }
        : project
    ));
  };

  return (
    <UserContext.Provider value={{
      user,
      language,
      setUser,
      setLanguage,
      projects,
      setProjects,
      addProject,
      addReply
    }}>
      {children}
    </UserContext.Provider>
  );
};
