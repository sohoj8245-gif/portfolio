import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LogIn } from 'lucide-react';

const AdminLogin = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="text-blue-400" size={48} />
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          {t('Admin Login', 'অ্যাডমিন লগইন')}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="username">
              {t('Username', 'ইউজারনেম')}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors"
              required
              data-testid="username-input"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="password">
              {t('Password', 'পাসওয়ার্ড')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors"
              required
              data-testid="password-input"
            />
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300" data-testid="error-message">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="login-submit-btn"
          >
            {loading ? t('Logging in...', 'লগইন হচ্ছে...') : t('Login', 'লগইন')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;