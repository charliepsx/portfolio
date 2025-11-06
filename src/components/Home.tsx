import React from 'react';
import { Box, Typography } from '@mui/joy';

interface HomeProps {
  language: 'en' | 'es';
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const texts = {
    en: 'Jr. Developer',
    es: 'Desarrollador Jr.'
  };

  const fullText = texts[language];

  const title = language === 'en'
    ? `Hi there! I'm Charlie, a ${fullText} based in Mexico. Explore my skills and projects below.`
    : `¡Hola! Soy Charlie, un ${fullText} situado en México. Te invito a explorar mis habilidades y proyectos.`;

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Typography
        level="h1"
        sx={{
          textAlign: 'center',
          fontSize: { xs: '2rem', md: '3rem' },
          maxWidth: 800,
        }}
      >
        {title.split(fullText).map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index === 0 && (
              <Box
                component="span"
                sx={{
                  color: '#9b7aff',
                  fontWeight: 'bold',
                }}
              >
                {fullText.split('').map((char, i) => (
                  <Box
                    key={i}
                    component="span"
                    sx={{
                      display: 'inline-block',
                      animation: 'jump 1s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    {char}
                  </Box>
                ))}
              </Box>
            )}
          </React.Fragment>
        ))}
      </Typography>
    </Box>
  );
};

export default Home;