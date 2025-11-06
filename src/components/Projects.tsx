import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Link } from '@mui/joy';
import { Clock } from './Clock.tsx';

interface ProjectsProps {
  language: 'en' | 'es';
}

const Projects: React.FC<ProjectsProps> = ({ language }) => {
  const content = language === 'en' ? {
    title: 'Projects',
    landing: 'Landing Page',
    clock: 'Clock',
    model: '3D Model Viewer',
    placeholder: 'placeholder'
  } : {
    title: 'Proyectos',
    landing: 'Landing Page',
    clock: 'Reloj',
    model: 'Visor de Modelos 3D',
    placeholder: 'marcador de posición'
  };

  return (
    <Box
      id="projects"
      sx={{
        py: 8,
        px: 2,
      }}
    >
      <Typography level="h2" sx={{ textAlign: 'center', mb: 4 }}>
        {content.title}
      </Typography>
      <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Link href="https://web.mediaserviceagency.com" target="_blank">
                <Typography level="h4">{content.landing}</Typography>
              </Link>
              <Box
                component="img"
                src="/images/landing.png"
                alt="Landing Page"
                sx={{ width: '100%', mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography level="h4">{content.clock}</Typography>
              <Clock />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography level="h4">{content.model}</Typography>
              {/* ModelViewer moved to background */}
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography level="h4">{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography level="h4">{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;