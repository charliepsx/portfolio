import React, { useEffect, useState } from 'react';
import { Box, Link, IconButton } from '@mui/joy';
import { Email, GitHub, Description, Home as HomeIcon, Person, Work, DarkMode, LightMode } from '@mui/icons-material';

type Mode = 'light' | 'dark' | 'system';

interface HeaderProps {
  language: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  mode: Mode;
  onModeChange: (mode: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, mode, onModeChange }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        p: 2,
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        backgroundColor: scrolled ? (mode === 'dark' ? 'rgba(28, 28, 28, 0.8)' : 'rgba(255, 255, 255, 0.8)') : 'transparent',
        // subtle drop shadow when header becomes sticky to lift it above content
        boxShadow: scrolled
          ? mode === 'dark'
            ? '0 6px 20px rgba(0,0,0,0.55)'
            : '0 6px 20px rgba(15,23,42,0.08)'
          : 'none',
        transition: 'backdrop-filter 0.3s, background-color 0.3s, box-shadow 0.3s',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton
          component="a"
          href="mailto:charliepsx@yahoo.com"
          aria-label="Email"
          title="Send me an email"
        >
          <Email />
        </IconButton>
        <IconButton
          component="a"
          href="https://github.com/charliepsx"
          target="_blank"
          aria-label="GitHub"
          title="View my GitHub profile"
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="/assets/cv.pdf"
          target="_blank"
          aria-label="CV"
          title="Download my Curriculum"
        >
          <Description />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <IconButton onClick={() => onModeChange(mode === 'light' ? 'dark' : 'light')}>
          {mode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
        <Link
          component="button"
          onClick={() => onLanguageChange(language === 'en' ? 'es' : 'en')}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          {language === 'en' ? 'ES' : 'EN'}
        </Link>
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
    </Box>
  );
};

export default Header;