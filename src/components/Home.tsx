import React from 'react';
import { Box, Typography} from '@mui/joy';
interface HomeProps {
  language: 'en' | 'es';
}

interface Skill {
  name: string;
  icon: string;
}

const skills_row1: Skill[] = [
  { name: 'JavaScript', icon: '/images/javascript.svg' },
  { name: 'TypeScript', icon: '/images/typescript.svg' },
  { name: 'HTML', icon: '/images/html.svg' },
  { name: 'CSS', icon: '/images/css.svg' },
  { name: 'Markdown', icon: '/images/markdown.svg' },
  { name: 'LaTeX', icon: '/images/latex.svg' },
  { name: 'Bootstrap', icon: '/images/bootstrap.svg' },
  { name: 'NPM', icon: '/images/npm.svg' },
  { name: 'Node', icon: '/images/node.svg' },
  { name: 'Git', icon: '/images/git.svg' },
  { name: 'Github', icon: '/images/github.svg' },
  { name: 'Bash', icon: '/images/bash.svg' },
  { name: 'Docker', icon: '/images/docker.svg' }
];

const skills_row2: Skill[] = [
  { name: 'Postman', icon: '/images/postman.svg' },
  { name: 'VSCode', icon: '/images/vscode.svg' },
  { name: 'Trello', icon: '/images/trello.svg' },
  { name: 'Slack', icon: '/images/slack.svg' },
  { name: 'Discord', icon: '/images/discord.svg' },
  { name: 'Krita', icon: '/images/krita.svg' },
  { name: 'Blender', icon: '/images/blender.svg' },
  { name: 'Inkscape', icon: '/images/inkscape.svg' },
  { name: 'Office', icon: '/images/office.svg' },
  { name: 'Drive', icon: '/images/drive.svg' },
  { name: 'Material UI', icon: '/images/material-ui.svg' },
  { name: 'Tailwind CSS', icon: '/images/tailwind.svg' },
  { name: 'React', icon: '/images/react.svg' },
];



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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Typography
        level="h1"
        sx={{
          textAlign: 'center',
          fontSize: { xs: '1.7rem', sm: '2rem', md: '3rem' },
          pb: { xs: 26 , md: 32, },
          maxWidth: 800,
          lineHeight: { xs: 1.25, md: 1.2 },
          wordBreak: 'keep-all',
          overflowWrap: 'normal',
          hyphens: 'manual',
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
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  whiteSpace: 'nowrap',
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
                      verticalAlign: 'baseline',
                      willChange: 'transform',
                      transform: 'translateY(0)',
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
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          py: { xs: 2, md: 0 },
          overflow: 'hidden',
          position: 'relative',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
        aria-label="Skills carousel"
      >
        {/* Two-row conveyor: top goes left, bottom goes right */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Row 1: leftward, two tracks for seamless loop */}
          <Box sx={{ display: 'flex', width: 'max-content' }}>
            {[0, 1].map((track) => (
              <Box
                key={`row1-track-${track}`}
                aria-hidden={track === 1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  animation: 'scrollLeft 26s linear infinite',
                  willChange: 'transform',
                }}
              >
                {skills_row1.map((skill, idx) => (
                  <Box key={`row1-${track}-${skill.name}-${idx}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 72, p: { xs: 1, sm: 2, md: 3 } }}>
                    <Box
                      component="img"
                      src={skill.icon}
                      alt={skill.name}
                      sx={{
                        width: { xs: 32, sm: 44 },
                        height: { xs: 32, sm: 44 },
                        animation: 'pulse 2.4s ease-in-out infinite',
                        animationDelay: `${idx * 0.10}s`,
                        willChange: 'transform',
                      }}
                    />
                    <Typography level="body-xs" sx={{ mt: 0.5, whiteSpace: 'nowrap' }}>
                      {skill.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>

          {/* Row 2: rightward (reverse of scrollLeft), two tracks for seamless loop */}
          <Box sx={{ display: 'flex', width: 'max-content' }}>
            {[0, 1].map((track) => (
              <Box
                key={`row2-track-${track}`}
                aria-hidden={track === 1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  animation: 'scrollLeft 30s linear infinite',
                  animationDirection: 'reverse',
                  willChange: 'transform',
                }}
              >
                {skills_row2.map((skill, idx) => (
                  <Box key={`row2-${track}-${skill.name}-${idx}`} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 72, p: { xs: 1, sm: 2, md: 3 } }}>
                    <Box
                      component="img"
                      src={skill.icon}
                      alt={skill.name}
                      sx={{
                        width: { xs: 32, sm: 44 },
                        height: { xs: 32, sm: 44 },
                        animation: 'pulse 2.6s ease-in-out infinite',
                        animationDelay: `${idx * 0.10}s`,
                        willChange: 'transform',
                      }}
                    />
                    <Typography level="body-xs" sx={{ mt: 0.5, whiteSpace: 'nowrap' }}>
                      {skill.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
        <style>{`
          @keyframes scrollLeft {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-100%, 0, 0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.12); }
          }
        `}</style>
      </Box>

    </Box>
  );
};

export default Home;