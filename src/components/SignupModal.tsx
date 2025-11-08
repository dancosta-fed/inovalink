import React, { useState } from 'react';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { saveUserData } from '../firebase/user';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'email' | 'google'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [userType, setUserType] = useState<'freelancer' | 'business'>('freelancer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [googleStep, setGoogleStep] = useState<'auth' | 'complete'>('auth');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setUserType('freelancer');
    setError('');
    setGoogleUser(null);
    setGoogleStep('auth');
  };

  const handleClose = () => {
    resetForm();
    setActiveTab('email');
    onClose();
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim() || !displayName.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const user = await doCreateUserWithEmailAndPassword(email.trim(), password);
      
      await saveUserData(user, {
        userType,
        displayName: displayName.trim()
      });

      handleClose();
      onSuccess();
    } catch (error: any) {
      setError(error.message || 'Erro ao criar conta. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      const user = await doSignInWithGoogle();
      setGoogleUser(user);
      
      if (user.displayName) {
        setDisplayName(user.displayName);
      }
      
      setGoogleStep('complete');
    } catch (error: any) {
      setError(error.message || 'Erro ao fazer login com Google. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!displayName.trim()) {
      setError('Por favor, preencha seu nome');
      return;
    }

    if (!googleUser) {
      setError('Erro ao processar dados do Google');
      return;
    }

    setLoading(true);

    try {
      await saveUserData(googleUser, {
        userType,
        displayName: displayName.trim()
      });

      handleClose();
      onSuccess();
    } catch (error: any) {
      setError(error.message || 'Erro ao salvar informações. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Criar Conta</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                if (!loading) {
                  setActiveTab('email');
                  setError('');
                  setGoogleStep('auth');
                  setGoogleUser(null);
                }
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium text-center ${
                activeTab === 'email'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={loading}
            >
              Criar com Email
            </button>
            <button
              type="button"
              onClick={() => {
                if (!loading) {
                  setActiveTab('google');
                  setError('');
                  setEmail('');
                  setPassword('');
                }
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium text-center ${
                activeTab === 'google'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={loading}
            >
              Criar com Google
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {activeTab === 'email' ? (
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Digite seu nome completo"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Digite seu email"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Mínimo 6 caracteres"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de usuário *
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="freelancer"
                      checked={userType === "freelancer"}
                      onChange={() => setUserType("freelancer")}
                      className="text-blue-500 focus:ring-blue-400"
                      disabled={loading}
                    />
                    <span className={loading ? "text-gray-400" : ""}>Freelancer</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="business"
                      checked={userType === "business"}
                      onChange={() => setUserType("business")}
                      className="text-blue-500 focus:ring-blue-400"
                      disabled={loading}
                    />
                    <span className={loading ? "text-gray-400" : ""}>Empresa</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Criando..." : "Criar Conta"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {googleStep === 'auth' ? (
                <>
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Clique no botão abaixo para criar sua conta com Google. Após autenticar, você precisará completar algumas informações.
                    </p>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      {loading ? "Processando..." : "Continuar com Google"}
                    </button>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={loading}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleGoogleComplete} className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Ótimo! Agora complete seu cadastro com as informações abaixo.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Digite seu nome completo"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de usuário *
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="freelancer"
                          checked={userType === "freelancer"}
                          onChange={() => setUserType("freelancer")}
                          className="text-blue-500 focus:ring-blue-400"
                          disabled={loading}
                        />
                        <span className={loading ? "text-gray-400" : ""}>Freelancer</span>
                      </label>

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="userType"
                          value="business"
                          checked={userType === "business"}
                          onChange={() => setUserType("business")}
                          className="text-blue-500 focus:ring-blue-400"
                          disabled={loading}
                        />
                        <span className={loading ? "text-gray-400" : ""}>Empresa</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setGoogleStep('auth');
                        setGoogleUser(null);
                        setDisplayName('');
                      }}
                      disabled={loading}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                      {loading ? "Salvando..." : "Completar Cadastro"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;