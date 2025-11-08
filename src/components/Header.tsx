import React, { useEffect, useState } from 'react';
import { Box, Link, IconButton } from '@mui/joy';
import { Email, GitHub, Description, Home as HomeIcon, Person, Work, DarkMode, LightMode, Menu, Close } from '@mui/icons-material';

type Mode = 'light' | 'dark' | 'system';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  mode: Mode;
  onModeChange: (mode: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, mode, onModeChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const offset = -66; // scroll with a 20px top offset
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const targetY = Math.max(0, elementTop + offset);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Close menu on route scroll triggers
  const handleNav = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 1.5, sm: 2 },
        py: { xs: 1, sm: 2 },
        backdropFilter: scrolled ? 'blur(4px)' : 'none',
        backgroundColor: scrolled ? (mode === 'dark' ? 'rgba(28, 28, 28, 0.8)' : 'rgba(255, 255, 255, 0.8)') : 'transparent',
        boxShadow: scrolled
          ? (mode === 'dark' ? '0 6px 20px rgba(0,0,0,0.55)' : '0 6px 20px rgba(15,23,42,0.08)')
          : 'none',
        transition: 'backdrop-filter 0.3s, background-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Left side: hamburger (mobile) + contact icons */}
      <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
        <IconButton
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
        >
          <Menu />
        </IconButton>
        <IconButton component="a" href="mailto:charliepsx@yahoo.com" aria-label="Email" title="Send me an email">
          <Email />
        </IconButton>
        <IconButton component="a" href="https://github.com/charliepsx" target="_blank" aria-label="GitHub" title="View my GitHub profile">
          <GitHub />
        </IconButton>
        <IconButton component="a" href="/assets/cv.pdf" target="_blank" aria-label="CV" title="Download my Curriculum">
          <Description />
        </IconButton>
      </Box>

      {/* Centered navigation icons for md+ screens */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'none', md: 'flex' },
          gap: 2,
          alignItems: 'center'
        }}
      >
        <IconButton onClick={() => scrollToSection('home')} aria-label="Go to Home">
          <HomeIcon />
        </IconButton>
        <IconButton onClick={() => scrollToSection('profile')} aria-label="Go to Profile">
          <Person />
        </IconButton>
        <IconButton onClick={() => scrollToSection('projects')} aria-label="Go to Projects">
          <Work />
        </IconButton>
      </Box>

      {/* Mobile navigation row removed (replaced by side menu) */}

      {/* Right-side controls */}
      <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
        <IconButton onClick={() => onModeChange(mode === 'light' ? 'dark' : 'light')}>
          {mode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
        <Link component="button" onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')} sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'none' } }}>
          {language === 'en' ? 'ES' : 'EN'}
        </Link>
      </Box>

      {/* Side menu overlay */}
      {menuOpen && (
        <>
          <Box
            role="presentation"
            onClick={() => setMenuOpen(false)}
            sx={{
              position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)', zIndex: 1400
            }}
          />
          <Box
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            sx={{
              position: 'fixed', top: 0, left: 0, height: '100vh', width: 260,
              zIndex: 1500,
              backgroundColor: mode === 'dark' ? 'rgba(20,20,20,0.9)' : 'rgba(255,255,255,0.95)',
              boxShadow: mode === 'dark' ? '4px 0 24px rgba(0,0,0,0.5)' : '4px 0 24px rgba(15,23,42,0.15)',
              display: 'flex', flexDirection: 'column', p: 2, gap: 2,
              transform: 'translateX(0)',
              animation: 'slideIn 220ms ease-out'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>Menu</Box>
              <IconButton aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component="button"
                onClick={() => handleNav('home')}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  textAlign: 'left', fontSize: '0.95rem', fontWeight: 500,
                  px: 1.5, py: 1, borderRadius: '10px', lineHeight: 1.3,
                  color: mode === 'dark' ? '#f3f4f6' : '#1f2937', textDecoration: 'none',
                  background: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  transition: 'background .22s ease, color .22s ease, transform .15s ease',
                  '&:hover': {
                    background: mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
                    textDecoration: 'none'
                  },
                  '&:active': { transform: 'scale(.96)', background: mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: mode === 'dark' ? '#6366f1' : '#2563eb' }
                }}
              >
                <HomeIcon fontSize="small" /> Home
              </Link>
              <Link
                component="button"
                onClick={() => handleNav('profile')}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  textAlign: 'left', fontSize: '0.95rem', fontWeight: 500,
                  px: 1.5, py: 1, borderRadius: '10px', lineHeight: 1.3,
                  color: mode === 'dark' ? '#f3f4f6' : '#1f2937', textDecoration: 'none',
                  background: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  transition: 'background .22s ease, color .22s ease, transform .15s ease',
                  '&:hover': {
                    background: mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
                    textDecoration: 'none'
                  },
                  '&:active': { transform: 'scale(.96)', background: mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: mode === 'dark' ? '#6366f1' : '#2563eb' }
                }}
              >
                <Person fontSize="small" /> Profile
              </Link>
              <Link
                component="button"
                onClick={() => handleNav('projects')}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  textAlign: 'left', fontSize: '0.95rem', fontWeight: 500,
                  px: 1.5, py: 1, borderRadius: '10px', lineHeight: 1.3,
                  color: mode === 'dark' ? '#f3f4f6' : '#1f2937', textDecoration: 'none',
                  background: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  transition: 'background .22s ease, color .22s ease, transform .15s ease',
                  '&:hover': {
                    background: mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
                    textDecoration: 'none'
                  },
                  '&:active': { transform: 'scale(.96)', background: mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: mode === 'dark' ? '#6366f1' : '#2563eb' }
                }}
              >
                <Work fontSize="small" /> Projects
              </Link>
            </Box>
            <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component="button" onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
                sx={{
                   display: 'flex', alignItems: 'center', gap: 1.25,
                  textAlign: 'left', fontSize: '0.95rem', fontWeight: 500,
                  px: 1.5, py: 1, borderRadius: '10px', lineHeight: 1.3,
                  color: mode === 'dark' ? '#f3f4f6' : '#1f2937', textDecoration: 'none',
                  background: mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  transition: 'background .22s ease, color .22s ease, transform .15s ease',
                  '&:hover': {
                    background: mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
                    textDecoration: 'none'
                  },
                  '&:active': { transform: 'scale(.96)', background: mode === 'dark' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: mode === 'dark' ? '#6366f1' : '#2563eb' }
                }}>
                {language === 'en' ? 'Switch to ES' : 'Cambiar a EN'}
              </Link>
              <IconButton onClick={() => onModeChange(mode === 'light' ? 'dark' : 'light')} aria-label="Toggle color scheme">
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Box>
          </Box>
          <style>{`@keyframes slideIn { from { transform: translateX(-40px); opacity: 0;} to { transform: translateX(0); opacity:1;} }`}</style>
        </>
      )}
    </Box>
  );
};

export default Header;