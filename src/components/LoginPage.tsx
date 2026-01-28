import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      alert('Galat naam ya password. Kripya "admin" aur "password" use karo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-[3rem] sm:text-[4rem] mb-3" 
            style={{ fontFamily: "'Lora', serif", color: '#3D3832' }}
          >
            Khamma Ghani 🙏
          </h1>
          <p 
            className="text-lg sm:text-xl opacity-70" 
            style={{ color: '#6B5E54', fontFamily: "'Inter', sans-serif" }}
          >
            Udaipur bolto sheher
          </p>
          <p 
            className="text-base mt-4 opacity-60" 
            style={{ color: '#6B5E54', fontFamily: "'Inter', sans-serif" }}
          >
            Apne sheher me aao
          </p>
        </div>

        {/* Login Form Card */}
        <div 
          className="rounded-3xl p-8 sm:p-10"
          style={{
            backgroundColor: '#F0EBE0',
            boxShadow: '0 8px 24px rgba(61, 56, 50, 0.1)',
            border: '2px solid #E8DCC8'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="username"
                className="block mb-2 text-base"
                style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}
              >
                Naam
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#FAF8F3',
                  border: '2px solid #E8DCC8',
                  color: '#3D3832',
                  fontFamily: "'Inter', sans-serif"
                }}
                placeholder="Apno naam likho"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                className="block mb-2 text-base"
                style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#FAF8F3',
                  border: '2px solid #E8DCC8',
                  color: '#3D3832',
                  fontFamily: "'Inter', sans-serif"
                }}
                placeholder="Password daalo"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl transition-all hover:shadow-lg flex items-center justify-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #88A5BE 0%, #6B8CA8 100%)',
                color: '#FAF8F3',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.1rem',
                border: 'none'
              }}
            >
              <LogIn className="w-5 h-5" />
              <span>Andar aao</span>
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div 
            className="mt-6 p-4 rounded-xl"
            style={{
              backgroundColor: '#FAF8F3',
              borderLeft: '4px solid #6B8CA8'
            }}
          >
            <p className="text-sm opacity-70" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
              Username: admin | Password: password
            </p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p 
            className="text-sm opacity-60" 
            style={{ color: '#6B5E54', fontFamily: "'Inter', sans-serif" }}
          >
            Apno sheher, apni zimmedari
          </p>
        </div>
      </div>
    </div>
  );
}