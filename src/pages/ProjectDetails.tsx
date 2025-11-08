import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getTranslation } from '../utils/translations';
import { doSignOut } from '../firebase/auth';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user, language, projects, addReply, setUser } = useUser();
  const [newMessage, setNewMessage] = useState('');
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

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Projeto não encontrado</h2>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    addReply(projectId!, {
      userId: user.email,
      userName: user.displayName || user.email,
      message: newMessage,
      timestamp: new Date().toISOString(),
      isBusiness: user.userType === 'business'
    });

    setNewMessage('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'pt' 
      ? date.toLocaleDateString('pt-BR')
      : date.toLocaleDateString('en-US');
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'pt'
      ? date.toLocaleString('pt-BR')
      : date.toLocaleString('en-US');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/home')}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                ← {t.projectDetails.back}
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Inovalink</h1>
            </div>
            <div className="flex items-center space-x-4">
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

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'open' 
                ? 'bg-green-100 text-green-800'
                : project.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {t.projects[project.status]}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <span className="text-sm font-medium text-gray-500">{t.projects.budget}:</span>
              <p className="text-gray-900">{project.budget}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">{t.projects.deadline}:</span>
              <p className="text-gray-900">{formatDate(project.deadline)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">{t.projects.postedBy}:</span>
              <p className="text-gray-900">{project.postedBy}</p>
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-500">{t.projects.skills}:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{t.projectDetails.replies}</h3>
          </div>
          
          <div className="p-6">
            {project.replies.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {language === 'pt' ? 'Nenhuma resposta ainda.' : 'No replies yet.'}
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {project.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-4 rounded-lg ${
                      reply.isBusiness 
                        ? 'bg-blue-50 border-l-4 border-blue-400' 
                        : 'bg-gray-50 border-l-4 border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-900">
                        {reply.userName}
                        {reply.isBusiness && (
                          <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {language === 'pt' ? 'Empresa' : 'Business'}
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDateTime(reply.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-700">{reply.message}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="border-t pt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.projectDetails.sendMessage}
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t.projectDetails.typeMessage}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.projectDetails.send}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
