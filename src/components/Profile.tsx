import React from 'react';
import { Box, Typography } from '@mui/joy';

interface ProfileProps {
  language: 'en' | 'es';
}

const Profile: React.FC<ProfileProps> = ({ language }) => {
  const content = language === 'en' ? {
    title: 'Profile',
    p1: 'I am a junior developer based in Mexico with a degree in computer systems engineering, passionate about learning and exploring web development. I have experience in front-end technologies like HTML, CSS, and JavaScript, focusing on building responsive web pages and enhancing user interfaces.',
    p2: 'I am familiar with version control systems like Git, which help me manage my projects effectively. I also have an interest in design and use tools like Krita and Blender for creative projects.',
    p3: 'I am always eager to contribute to exciting projects and collaborate with others in a team-oriented environment. Feel free to check out my work and reach out if you\'re interested in connecting!'
  } : {
    title: 'Perfil',
    p1: 'Soy un desarrollador junior situado en México, con una licenciatura en ingeniería en sistemas computacionales, apasionado por aprender y explorar el desarrollo web. Tengo experiencia en tecnologías de front-end como HTML, CSS y JavaScript, enfocándome en construir páginas web responsivas y mejorar interfaces de usuario.',
    p2: 'Estoy familiarizado con sistemas de control de versiones como Git, los cuales me ayudan a gestionar mis proyectos de manera efectiva. También tengo interés en el diseño y utilizo herramientas como Krita y Blender para proyectos creativos.',
    p3: 'Siempre estoy dispuesto a contribuir a proyectos emocionantes y a colaborar con otros en un entorno orientado al trabajo en equipo. ¡No dudes en revisar mi trabajo y contactarme si estás interesado en conectar!'
  };

  return (
    <Box
      id="profile"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        maxWidth: 800,
        mx: 'auto',
        px: 2,
      }}
    >
      <Typography
        level="h2"
        sx={{
          mb: 4,
          fontSize: { xs: '1.75rem', sm: '2.1rem', md: '2.6rem' },
          lineHeight: { xs: 1.25, sm: 1.25, md: 1.2 },
          letterSpacing: { xs: '-0.5px', md: '-1px' }
        }}
      >
        {content.title}
      </Typography>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(24,24,27,0.45)' : 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(8px) saturate(120%)',
          WebkitBackdropFilter: 'blur(8px) saturate(120%)',
          borderRadius: 12,
          border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.12)',
          boxShadow: theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(15,23,42,0.12)',
          p: { xs: 1.5, sm: 2 },
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
        })}
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
            lineHeight: { xs: 1.45, md: 1.5 }
          }}
        >
          {content.p1}
        </Typography>
        <Typography
          sx={{
            mb: 2,
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
            lineHeight: { xs: 1.45, md: 1.5 }
          }}
        >
          {content.p2}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
            lineHeight: { xs: 1.45, md: 1.5 }
          }}
        >
          {content.p3}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;