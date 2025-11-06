import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Grid } from '@mui/joy';

interface Skill {
  name: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', icon: '/images/javascript.svg' },
  { name: 'HTML', icon: '/images/html.svg' },
  { name: 'CSS', icon: '/images/css.svg' },
  { name: 'Markdown', icon: '/images/markdown.svg' },
  { name: 'Bootstrap', icon: '/images/bootstrap.svg' },
  { name: 'NPM', icon: '/images/npm.svg' },
  { name: 'Node', icon: '/images/node.svg' },
  { name: 'Git', icon: '/images/git.svg' },
  { name: 'Github', icon: '/images/github.svg' },
  { name: 'VSCode', icon: '/images/vscode.svg' },
  { name: 'Trello', icon: '/images/trello.svg' },
  { name: 'Slack', icon: '/images/slack.svg' },
  { name: 'Discord', icon: '/images/discord.svg' },
  { name: 'Krita', icon: '/images/krita.svg' },
  { name: 'Blender', icon: '/images/blender.svg' },
  { name: 'Inkscape', icon: '/images/inkscape.svg' },
  { name: 'Office', icon: '/images/office.svg' },
  { name: 'Drive', icon: '/images/drive.svg' },
];

const Skills: React.FC = () => {
  const [pulsatingCard, setPulsatingCard] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * skills.length);
      setPulsatingCard(randomIndex);
      setTimeout(() => setPulsatingCard(null), 5000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      id="skills"
      sx={{
        py: 8,
        px: 2,
      }}
    >
      <Typography level="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Skills
      </Typography>
      <Grid container spacing={2} sx={{ maxWidth: 1200, mx: 'auto' }}>
        {skills.map((skill, index) => (
          <Grid key={skill.name} xs={4} sm={3} md={2}>
            <Card
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                transition: 'transform 0.3s',
                transform: pulsatingCard === index ? 'scale(1.1)' : 'scale(1)',
                boxShadow: 'none',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            >
              <Box
                component="img"
                src={skill.icon}
                alt={skill.name}
                sx={{
                  width: 48,
                  height: 48,
                  mb: 1,
                }}
              />
              <Typography level="body-sm" sx={{ textAlign: 'center' }}>
                {skill.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;