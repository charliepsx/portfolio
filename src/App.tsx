import { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Box } from '@mui/joy';
import Header from './components/Header';
import Home from './components/Home';
import Skills from './components/Skills';
import Profile from './components/Profile';
import Projects from './components/Projects';
import ModelViewer from './components/ModelViewer';

function InnerApp() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <CssBaseline />
      <ModelViewer />
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          // translucent frosted glass with subtle gradient
          backgroundColor: mode === 'dark' ? 'rgba(75, 70, 75, 0.2)' : 'rgba(107, 105, 105, 0.1)',
        }}
      >
        <Header language={language} onLanguageChange={setLanguage} mode={mode || 'dark'} onModeChange={(m) => setMode(m)} />
        <Home language={language} />
        <Skills />
        <Profile language={language} />
        <Projects language={language} />
      </Box>
    </>
  );
}

function App() {
  return (
    <CssVarsProvider defaultColorScheme="dark">
      <InnerApp />
    </CssVarsProvider>
  );
}

export default App;