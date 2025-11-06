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
        {/* responsive: 1 column xs, 2 columns md, 3 columns lg */}
        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.18s, box-shadow 0.18s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 10px 30px rgba(2,6,23,0.12)' } }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Link href="https://web.mediaserviceagency.com" target="_blank">
                <Typography level="h4">{content.landing}</Typography>
              </Link>
              <Box sx={{ mt: 1, flex: 1 }}>
                <Box
                  component="img"
                  src="/images/landing.png"
                  alt="Landing Page"
                  sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Typography level="h4">{content.clock}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
                <Clock />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Additional placeholders in a consistent layout */}
        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4">{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4">{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4">{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4">{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;