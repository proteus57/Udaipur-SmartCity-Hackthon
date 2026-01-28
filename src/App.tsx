import { collection, addDoc } from "firebase/firestore"
import { db } from "./firebase"
import React, { useState } from 'react';
import { MapPin, Navigation, Droplets, Mountain, Bell, User, Settings, LogOut } from 'lucide-react';
import { LoginPage } from './components/LoginPage';

// Time-based mood configuration
const getTimeOfDayMood = () => {
  const hour = new Date().getHours();
  
  // Morning Mode (5 AM – 10 AM)
  if (hour >= 5 && hour < 10) {
    return {
      name: 'morning',
      background: '#FAF8F3', // Warm ivory / soft cream
      containerBg: '#F5F0E8',
      mapContainerBg: '#E8DCC8',
      moodText: 'Aaj sheher shaant hai 🌿',
      moodColor: '#6B8CA8'
    };
  }
  
  // Day Mode (10 AM – 4 PM)
  if (hour >= 10 && hour < 16) {
    return {
      name: 'day',
      background: '#F0EBE0', // Soft sandstone beige
      containerBg: '#E8DCC8',
      mapContainerBg: '#D4C8B0',
      moodText: 'Sheher apni raftar mein hai',
      moodColor: '#8F7A66'
    };
  }
  
  // Evening Mode (4 PM – 7 PM)
  if (hour >= 16 && hour < 19) {
    return {
      name: 'evening',
      background: '#E8EEF2', // Muted lake blue with warmth
      containerBg: '#DCE4E9',
      mapContainerBg: '#C8D4DB',
      moodText: 'Shaam ka sukoon chha raha hai',
      moodColor: '#6B8CA8'
    };
  }
  
  // Night Mode (7 PM – 5 AM)
  return {
    name: 'night',
    background: '#DDE1E6', // Soft indigo / muted blue-grey
    containerBg: '#CED5DB',
    mapContainerBg: '#B8C2CA',
    moodText: 'Raat mein sheher dheere bolta hai 🌙',
    moodColor: '#5A6B7A'
  };
};

function App() {
  const [selectedRoute, setSelectedRoute] = useState<'fast' | 'calm'>('calm');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'routes' | 'updates' | 'places'>('routes');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Tarush Jain');
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Get current time-based mood
  const mood = getTimeOfDayMood();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    setActiveTab('routes');
    setFeedback(null);
    setShowThankYou(false);
  };

  const handleFeedbackClick = async (feedbackType: string) => {
  setFeedback(feedbackType);
  setShowThankYou(true);

  try {
    await addDoc(collection(db, "feedback"), {
      feedback: feedbackType,
      routeType: selectedRoute,
      activeTab: activeTab,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
  }

  setTimeout(() => {
    setShowThankYou(false);
  }, 3000);
};


  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div 
      className="min-h-screen py-8 px-4 sm:py-16 sm:px-8"
      style={{
        backgroundColor: mood.background,
        transition: 'background-color 1.5s ease-in-out'
      }}
    >
      {/* Centered courtyard-style container */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header / Greeting Section */}
        <header className="px-2 relative">
          <h1 className="text-[2.5rem] sm:text-[3rem] mb-2" style={{ fontFamily: "'Lora', serif", color: '#3D3832' }}>
            Khamma Ghani 🙏
          </h1>
          <p className="text-lg sm:text-xl opacity-70 mb-3" style={{ color: '#6B5E54', fontFamily: "'Inter', sans-serif" }}>
            Udaipur bolto sheher
          </p>
          
          {/* Sheher ka mood indicator */}
          <p className="text-base opacity-60 mt-2" style={{ color: mood.moodColor, fontFamily: "'Inter', sans-serif" }}>
            {mood.moodText}
          </p>
          
          {/* Profile Menu Button - Top Right */}
          <div className="absolute top-0 right-0 z-50">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:shadow-md"
              style={{
                backgroundColor: '#E8DCC8',
                border: '2px solid #C87F5F'
              }}
            >
              <User className="w-5 h-5" style={{ color: '#3D3832' }} />
            </button>
            
            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div 
                className="absolute top-14 right-0 w-56 rounded-2xl overflow-hidden z-50"
                style={{
                  backgroundColor: '#FAF8F3',
                  boxShadow: '0 8px 24px rgba(61, 56, 50, 0.15)',
                  border: '2px solid #E8DCC8'
                }}
              >
                {/* User Info Header */}
                <div 
                  className="px-5 py-4"
                  style={{
                    backgroundColor: '#E8DCC8',
                    borderBottom: '1px solid #D4C8B0'
                  }}
                >
                  <p className="text-sm opacity-70" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                    Namaskar
                  </p>
                  <p className="font-medium" style={{ color: '#3D3832', fontFamily: "'Lora', serif" }}>
                    {userName}
                  </p>
                </div>
                
                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Handle profile action
                    }}
                    className="w-full px-5 py-3 flex items-center gap-3 transition-all hover:bg-[#F0EBE0]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#3D3832'
                    }}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Handle settings action
                    }}
                    className="w-full px-5 py-3 flex items-center gap-3 transition-all hover:bg-[#F0EBE0]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#3D3832'
                    }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  <div 
                    className="mx-4 my-2"
                    style={{
                      height: '1px',
                      backgroundColor: '#E8DCC8'
                    }}
                  />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 flex items-center gap-3 transition-all hover:bg-[#F0EBE0]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#C87F5F'
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Instagram-style Tab Bar */}
        <div className="px-2 mt-10">
          <div 
            className="flex gap-0 rounded-2xl p-1"
            style={{
              backgroundColor: '#F0EBE0',
              boxShadow: '0 2px 8px rgba(61, 56, 50, 0.06)'
            }}
          >
            <button
              onClick={() => setActiveTab('routes')}
              className="flex-1 py-3 px-4 rounded-xl transition-all duration-200 relative"
              style={{
                backgroundColor: activeTab === 'routes' ? '#FAF8F3' : 'transparent',
                color: '#3D3832',
                fontFamily: "'Inter', sans-serif",
                boxShadow: activeTab === 'routes' ? '0 2px 8px rgba(61, 56, 50, 0.08)' : 'none'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                <span>Rasta</span>
              </div>
              {activeTab === 'routes' && (
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                  style={{ backgroundColor: '#6B8CA8' }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('updates')}
              className="flex-1 py-3 px-4 rounded-xl transition-all duration-200 relative"
              style={{
                backgroundColor: activeTab === 'updates' ? '#FAF8F3' : 'transparent',
                color: '#3D3832',
                fontFamily: "'Inter', sans-serif",
                boxShadow: activeTab === 'updates' ? '0 2px 8px rgba(61, 56, 50, 0.08)' : 'none'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Khabar</span>
              </div>
              {activeTab === 'updates' && (
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                  style={{ backgroundColor: '#6B8CA8' }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('places')}
              className="flex-1 py-3 px-4 rounded-xl transition-all duration-200 relative"
              style={{
                backgroundColor: activeTab === 'places' ? '#FAF8F3' : 'transparent',
                color: '#3D3832',
                fontFamily: "'Inter', sans-serif",
                boxShadow: activeTab === 'places' ? '0 2px 8px rgba(61, 56, 50, 0.08)' : 'none'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Mountain className="w-4 h-4" />
                <span>Jagah</span>
              </div>
              {activeTab === 'places' && (
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                  style={{ backgroundColor: '#6B8CA8' }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'routes' && (
          <>
            {/* Route Selection */}
            <div className="flex gap-4 px-2 mt-10">
              <button
                onClick={() => setSelectedRoute('fast')}
                className={`flex-1 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  selectedRoute === 'fast'
                    ? 'bg-[#E8DCC8]/60 shadow-sm'
                    : 'bg-[#F5F0E8] hover:bg-[#E8DCC8]/50'
                }`}
                style={{ 
                  border: selectedRoute === 'fast' ? '1px solid #D4C8B0' : '1px solid transparent',
                  fontFamily: "'Inter', sans-serif",
                  color: '#3D3832',
                  fontSize: '0.95rem'
                }}
              >
                <span>Fast Rasto</span>
              </button>
              <button
                onClick={() => setSelectedRoute('calm')}
                className={`flex-1 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  selectedRoute === 'calm'
                    ? 'bg-[#E8DCC8] shadow-md'
                    : 'bg-[#F5F0E8] hover:bg-[#E8DCC8]/50'
                }`}
                style={{ 
                  border: selectedRoute === 'calm' ? '2px solid #8FA8BA' : '1px solid transparent',
                  fontFamily: "'Inter', sans-serif",
                  color: '#3D3832',
                  fontSize: '0.95rem'
                }}
              >
                <span>Shaant Rasto 🌿</span>
              </button>
            </div>

            {/* Map Section with Narrator Card */}
            <div className="relative px-2 mt-8">
              {/* Map Container */}
              <div 
                className="w-full rounded-3xl overflow-hidden relative"
                style={{ 
                  height: '450px',
                  backgroundColor: mood.mapContainerBg,
                  boxShadow: '0 8px 24px rgba(61, 56, 50, 0.08)',
                  border: '3px solid #F0EBE0'
                }}
              >
                {/* Map Placeholder with styled content */}
                <div className="w-full h-full relative bg-gradient-to-br from-[#D4C8B0] to-[#E8DCC8]">
                  {/* Decorative map elements */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                      <path d="M50,200 Q150,100 250,200 T450,200" stroke="#6B8CA8" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                      <path d="M50,220 Q180,180 250,220 T450,220" stroke="#C87F5F" strokeWidth="4" fill="none" />
                    </svg>
                  </div>
                  
                  {/* Map markers */}
                  <div className="absolute top-1/4 left-1/4">
                    <MapPin className="w-8 h-8 text-[#C87F5F]" fill="#C87F5F" />
                  </div>
                  <div className="absolute bottom-1/3 right-1/3">
                    <MapPin className="w-8 h-8 text-[#6B8CA8]" fill="#6B8CA8" />
                  </div>

                  {/* Map center indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full bg-[#6B8CA8]/20 flex items-center justify-center">
                      <Navigation className="w-8 h-8 text-[#6B8CA8]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrator Message Card - Floating over map */}
              <div 
                className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-auto sm:max-w-sm rounded-3xl p-6"
                style={{
                  backgroundColor: '#FAF8F3',
                  borderLeft: '4px solid #C87F5F',
                  boxShadow: '0 6px 20px rgba(61, 56, 50, 0.12)'
                }}
              >
                <p className="text-sm opacity-50 mb-2" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif", fontStyle: 'italic' }}>
                  Sheher kahe...
                </p>
                <p className="text-[1.05rem] leading-relaxed" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                  {selectedRoute === 'calm' 
                    ? "Ee rasto subah-subah shaant re. Dheere chalo, aaram se."
                    : "Ee rasto tez re, par thodi bheed ho sakti hai."}
                </p>
              </div>
            </div>

            {/* Feedback Section */}
            <div 
              className="mx-2 rounded-3xl p-6 sm:p-8 mt-8"
              style={{
                backgroundColor: '#F0EBE0',
                boxShadow: '0 4px 16px rgba(61, 56, 50, 0.06)'
              }}
            >
              <p className="text-base sm:text-lg mb-5" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                Ee rasto kaiso laagyo?
              </p>
              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => handleFeedbackClick('calm')}
                  className={`flex-1 px-4 py-4 sm:px-6 sm:py-5 rounded-3xl transition-all ${
                    feedback === 'calm' ? 'bg-[#E8DCC8] shadow-md' : 'bg-[#FAF8F3] hover:bg-[#E8DCC8]/50'
                  }`}
                  style={{
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    color: '#3D3832'
                  }}
                >
                  <span className="text-4xl sm:text-5xl mb-2 block">😊</span>
                  <span className="text-sm sm:text-base">Shaant</span>
                </button>
                <button
                  onClick={() => handleFeedbackClick('okay')}
                  className={`flex-1 px-4 py-4 sm:px-6 sm:py-5 rounded-3xl transition-all ${
                    feedback === 'okay' ? 'bg-[#E8DCC8] shadow-md' : 'bg-[#FAF8F3] hover:bg-[#E8DCC8]/50'
                  }`}
                  style={{
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    color: '#3D3832'
                  }}
                >
                  <span className="text-4xl sm:text-5xl mb-2 block">😐</span>
                  <span className="text-sm sm:text-base">Theek-thaak</span>
                </button>
                <button
                  onClick={() => handleFeedbackClick('heavy')}
                  className={`flex-1 px-4 py-4 sm:px-6 sm:py-5 rounded-3xl transition-all ${
                    feedback === 'heavy' ? 'bg-[#E8DCC8] shadow-md' : 'bg-[#FAF8F3] hover:bg-[#E8DCC8]/50'
                  }`}
                  style={{
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    color: '#3D3832'
                  }}
                >
                  <span className="text-4xl sm:text-5xl mb-2 block">😟</span>
                  <span className="text-sm sm:text-base">Bojh laagyo</span>
                </button>
              </div>
              {showThankYou && (
                <p className="text-sm text-center mt-4" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                  Dhanyavaad! Aapki madad ka dhanyavaad.
                </p>
              )}
            </div>
          </>
        )}

        {activeTab === 'updates' && (
          <div className="px-2 space-y-7">
            {/* City Updates */}
            <div 
              className="rounded-3xl p-6 sm:p-8"
              style={{
                backgroundColor: '#F0EBE0',
                boxShadow: '0 4px 16px rgba(61, 56, 50, 0.06)'
              }}
            >
              <h3 className="text-xl sm:text-2xl mb-6" style={{ fontFamily: "'Lora', serif", color: '#3D3832' }}>
                Aaj ri khabar
              </h3>
              
              {/* Morning Section */}
              <div className="space-y-5 mb-6">
                <p className="text-base opacity-50" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                  🌅 Subah
                </p>
                <div 
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: '#FAF8F3',
                    borderLeft: '4px solid #6B8CA8'
                  }}
                >
                  <p className="text-xs opacity-50 mb-2" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                    Subah (7 baje)
                  </p>
                  <p className="text-[1.05rem] leading-relaxed" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                    City Palace aaju shaant re. Ghoomne ka accho time hai.
                  </p>
                </div>
              </div>

              {/* Afternoon Section */}
              <div className="space-y-5 mb-6">
                <p className="text-base opacity-50" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                  🌞 Dopahar
                </p>
                <div 
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: '#FAF8F3',
                    borderLeft: '4px solid #C87F5F'
                  }}
                >
                  <p className="text-xs opacity-50 mb-2" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                    Dopahar (2 baje)
                  </p>
                  <p className="text-[1.05rem] leading-relaxed" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                    Hawa Mahal jaane ka rasto thoda rujh re. Baad me jana theek rahega.
                  </p>
                </div>
              </div>

              {/* Evening Section */}
              <div className="space-y-5">
                <p className="text-base opacity-50" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                  🌆 Shaam
                </p>
                <div 
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: '#FAF8F3',
                    borderLeft: '4px solid #6B8CA8'
                  }}
                >
                  <p className="text-xs opacity-50 mb-2" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                    Shaam (6 baje)
                  </p>
                  <p className="text-[1.05rem] leading-relaxed" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                    Lake ke kinare sunset dekhne bahut log aawo. Shanti se baitho.
                  </p>
                </div>
              </div>
            </div>

            {/* Lake Pichola Health Card */}
            <div 
              className="rounded-3xl p-7 sm:p-9"
              style={{
                background: 'linear-gradient(135deg, #7B99AF 0%, #6B8CA8 100%)',
                boxShadow: '0 8px 24px rgba(107, 140, 168, 0.12)'
              }}
            >
              <h3 className="text-xl sm:text-2xl mb-4" style={{ fontFamily: "'Lora', serif", color: '#FAF8F3' }}>
                Pichola ri haalat
              </h3>
              <p className="text-[1.05rem] sm:text-[1.1rem] leading-relaxed" style={{ color: '#FAF8F3', opacity: 0.95, fontFamily: "'Inter', sans-serif" }}>
                Aaj thodi naram hai. Paani sambhaljo. Lake saaf rakho, apno Udaipur sundar rakho.
              </p>
            </div>

            {/* Weather mood */}
            <div 
              className="rounded-3xl p-7 sm:p-9"
              style={{
                background: 'linear-gradient(135deg, #7B99AF 0%, #6B8CA8 100%)',
                boxShadow: '0 8px 24px rgba(107, 140, 168, 0.12)'
              }}
            >
              <h3 className="text-xl sm:text-2xl mb-4" style={{ fontFamily: "'Lora', serif", color: '#FAF8F3' }}>
                Mausam ri baat
              </h3>
              <p className="text-[1.05rem] sm:text-[1.1rem] leading-relaxed" style={{ color: '#FAF8F3', opacity: 0.95, fontFamily: "'Inter', sans-serif" }}>
                Aaj thandi hawa chaal ri hai. Shawl leke niklo. Shaam tak suhano mausam rahego.
              </p>
            </div>

            {/* Feedback Section */}
            <div 
              className="rounded-3xl p-6 sm:p-8"
              style={{
                backgroundColor: '#F0EBE0',
                boxShadow: '0 4px 16px rgba(61, 56, 50, 0.06)'
              }}
            >
              <p className="text-base sm:text-lg mb-4" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                Aaj ri khabar kaisi lagi?
              </p>
              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => handleFeedbackClick('helpful')}
                  className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl transition-all ${
                    feedback === 'helpful' ? 'bg-[#E8DCC8] shadow-md' : 'bg-[#FAF8F3] hover:bg-[#E8DCC8]/50'
                  }`}
                  style={{
                    border: feedback === 'helpful' ? '2px solid #6B8CA8' : '1px solid #E8DCC8',
                    fontFamily: "'Inter', sans-serif",
                    color: '#3D3832'
                  }}
                >
                  <span className="text-2xl sm:text-3xl mb-1 block">😊</span>
                  <span className="text-sm sm:text-base">Madad mili</span>
                </button>
                <button
                  onClick={() => handleFeedbackClick('okay')}
                  className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl transition-all ${
                    feedback === 'okay' ? 'bg-[#E8DCC8] shadow-md' : 'bg-[#FAF8F3] hover:bg-[#E8DCC8]/50'
                  }`}
                  style={{
                    border: feedback === 'okay' ? '2px solid #6B8CA8' : '1px solid #E8DCC8',
                    fontFamily: "'Inter', sans-serif",
                    color: '#3D3832'
                  }}
                >
                  <span className="text-2xl sm:text-3xl mb-1 block">😐</span>
                  <span className="text-sm sm:text-base">Theek-thaak</span>
                </button>
                <button
                  onClick={() => handleFeedbackClick('notuseful')}
                  className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl transition-all ${
                    feedback === 'notuseful' ? 'bg-[#E8DCC8] shadow-md' : 'bg-[#FAF8F3] hover:bg-[#E8DCC8]/50'
                  }`}
                  style={{
                    border: feedback === 'notuseful' ? '2px solid #6B8CA8' : '1px solid #E8DCC8',
                    fontFamily: "'Inter', sans-serif",
                    color: '#3D3832'
                  }}
                >
                  <span className="text-2xl sm:text-3xl mb-1 block">😟</span>
                  <span className="text-sm sm:text-base">Kaam na aai</span>
                </button>
              </div>
              {showThankYou && (
                <p className="text-sm text-center mt-4" style={{ color: '#3D3832', fontFamily: "'Inter', sans-serif" }}>
                  Dhanyavaad! Aapki madad ka dhanyavaad.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'places' && (
          <div className="px-2 space-y-6">
            {/* Heritage Places */}
            <div 
              className="rounded-3xl p-6 sm:p-8"
              style={{
                backgroundColor: '#F0EBE0',
                boxShadow: '0 4px 16px rgba(61, 56, 50, 0.06)'
              }}
            >
              <h3 className="text-xl sm:text-2xl mb-4" style={{ fontFamily: "'Lora', serif", color: '#3D3832' }}>
                Heritage ri jagah
              </h3>
              <div className="space-y-4">
                <div 
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: '#FAF8F3',
                    border: '2px solid #E8DCC8'
                  }}
                >
                  <h4 className="text-lg mb-2" style={{ fontFamily: "'Lora', serif", color: '#3D3832' }}>
                    City Palace
                  </h4>
                  <p className="text-[1.05rem] leading-relaxed mb-2" style={{ color: '#3D3832', opacity: 0.85, fontFamily: "'Inter', sans-serif" }}>
                    Apno sheher ro dil. Mewadon ri kahani yaade bolti.
                  </p>
                  <p className="text-sm italic mb-3" style={{ color: '#6B8CA8', opacity: 0.85, fontFamily: "'Inter', sans-serif" }}>
                    Mewar ri pehchan.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: '#6B8CA8', fontFamily: "'Inter', sans-serif" }}>
                      Subah (9) - Shaam (5)
                    </span>
                  </div>
                </div>
                <div 
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: '#FAF8F3',
                    border: '2px solid #E8DCC8'
                  }}
                >
                  <h4 className="text-lg mb-2" style={{ fontFamily: "'Lora', serif", color: '#3D3832' }}>
                    Lake Pichola
                  </h4>
                  <p className="text-[1.05rem] leading-relaxed mb-2" style={{ color: '#3D3832', opacity: 0.85, fontFamily: "'Inter', sans-serif" }}>
                    Udaipur ri aankh. Shanti ane sukoon ko nivas.
                  </p>
                  <p className="text-sm italic mb-3" style={{ color: '#6B8CA8', opacity: 0.85, fontFamily: "'Inter', sans-serif" }}>
                    Jeevan ka aaina.
                  </p>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" style={{ color: '#6B8CA8' }} />
                    <span className="text-sm" style={{ color: '#6B8CA8', fontFamily: "'Inter', sans-serif" }}>
                      Poora din khula
                    </span>
                  </div>
                </div>
                <div 
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: '#FAF8F3',
                    border: '2px solid #E8DCC8'
                  }}
                >
                  <h4 className="text-lg mb-2" style={{ fontFamily: "'Lora', serif", color: '#3D3832' }}>
                    Saheliyon ki Bari
                  </h4>
                  <p className="text-[1.05rem] leading-relaxed mb-2" style={{ color: '#3D3832', opacity: 0.85, fontFamily: "'Inter', sans-serif" }}>
                    Rani-maharaniyon ro bageeche. Hara-bhara shaant thikana.
                  </p>
                  <p className="text-sm italic mb-3" style={{ color: '#6B8CA8', opacity: 0.85, fontFamily: "'Inter', sans-serif" }}>
                    Prakriti ane kala ka sangam.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: '#6B8CA8', fontFamily: "'Inter', sans-serif" }}>
                      Subah (8) - Shaam (7)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit tip */}
            <div 
              className="rounded-3xl p-7 sm:p-9"
              style={{
                background: 'linear-gradient(135deg, #D4A88C 0%, #C89070 100%)',
                boxShadow: '0 8px 24px rgba(200, 127, 95, 0.12)'
              }}
            >
              <p className="text-[1.05rem] sm:text-[1.1rem] leading-relaxed" style={{ color: '#FAF8F3', fontFamily: "'Inter', sans-serif" }}>
                💫 Yaad rakho: Apni heritage sambhalo. Saaf-suthra rakho, maan rakho.
              </p>
            </div>
          </div>
        )}

        {/* Subtle bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}

export default App; 