import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { LogIn, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 backdrop-blur-md px-4 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2 ${
          theme === 'dark'
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-slate-900/10 text-slate-900 hover:bg-slate-900/20'
        }`}
        data-testid="theme-toggle-btn"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`backdrop-blur-md rounded-3xl p-10 w-full max-w-md shadow-2xl border ${
          theme === 'dark'
            ? 'bg-white/10 border-white/10'
            : 'bg-white/60 border-gray-200'
        }`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="flex items-center justify-center mb-8"
        >
          <div className={`p-4 rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500 to-purple-500'
              : 'bg-gradient-to-br from-blue-400 to-purple-400'
          }`}>
            <LogIn className="text-white" size={48} />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-4xl font-bold text-center mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          {t('Admin Login', 'অ্যাডমিন লগইন')}
        </motion.h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className={`block mb-2 font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`} htmlFor="username">
              {t('Username', 'ইউজারনেম')}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 transition-all ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white focus:ring-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-400'
              }`}
              required
              data-testid="username-input"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className={`block mb-2 font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`} htmlFor="password">
              {t('Password', 'পাসওয়ার্ড')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 transition-all ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 text-white focus:ring-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-400'
              }`}
              required
              data-testid="password-input"
            />
          </motion.div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300"
              data-testid="error-message"
            >
              {error}
            </motion.div>
          )}
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
            data-testid="login-submit-btn"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                {t('Logging in...', 'লগইন হচ্ছে...')}
              </span>
            ) : (
              t('Login', 'লগইন')
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;