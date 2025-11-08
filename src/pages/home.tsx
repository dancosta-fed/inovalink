import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { getTranslation } from "../utils/translations";
import CreateProjectModal from "../components/CreateProjectModal";
import { doSignOut } from "../firebase/auth";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, language, setLanguage, projects, setUser } = useUser();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const t = getTranslation(language);

  const handleLogout = async () => {
    try {
      await doSignOut();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'pt' 
      ? date.toLocaleDateString('pt-BR')
      : date.toLocaleDateString('en-US');
  };

  const getGreeting = () => {
    const userName = user?.displayName || user?.email?.split('@')[0] || (language === 'pt' ? 'Usuário' : 'User');
    
    if (language === 'pt') {
      return `Bem-vindo, ${userName}!`;
    } else {
      return `Welcome, ${userName}!`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Inovalink</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${language === 'pt' ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>
                  PT-BR
                </span>
                <button
                  onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      language === 'en' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm ${language === 'en' ? 'font-semibold text-blue-600' : 'text-gray-500'}`}>
                  EN
                </span>
              </div>
              
              <span className="text-gray-600">{user?.displayName || user?.email}</span>
              <button 
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.nav.logout}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {getGreeting()}
                </h2>
                <p className="text-gray-600">
                  {t.welcome.subtitle}
                </p>
              </div>
              {user?.userType === 'business' && (
                <button
                  onClick={() => setIsCreateProjectOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.dashboard.createProject}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t.dashboard.projects}</h3>
                  <p className="text-sm text-gray-500">{t.dashboard.projectsDesc}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t.dashboard.messages}</h3>
                  <p className="text-sm text-gray-500">{t.dashboard.messagesDesc}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t.dashboard.analytics}</h3>
                  <p className="text-sm text-gray-500">{t.dashboard.analyticsDesc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{t.dashboard.recentActivity}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {projects.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-500">{t.dashboard.noActivity}</p>
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'open' 
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {t.projects[project.status]}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span><strong>{t.projects.budget}:</strong> {project.budget}</span>
                      <span><strong>{t.projects.deadline}:</strong> {formatDate(project.deadline)}</span>
                      <span><strong>{t.projects.postedBy}:</strong> {project.postedBy}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {project.replies.length} {language === 'pt' ? 'respostas' : 'replies'}
                      </span>
                      <span className="text-sm text-blue-600 hover:text-blue-800">
                        {t.projects.viewDetails} →
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
      />
    </div>
  );
};

export default Home;
