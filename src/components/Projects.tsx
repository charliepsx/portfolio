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

  // Shared frosted translucent style for all project cards; theme-aware (dark vs light mode)
  const frostedCardSx = (theme: any) => {
    const isDark = theme.palette.mode === 'dark';
    return {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isDark ? 'rgba(24,24,27,0.45)' : 'rgba(255,255,255,0.65)',
      backdropFilter: 'blur(8px) saturate(120%)',
      WebkitBackdropFilter: 'blur(8px) saturate(120%)',
      borderRadius: 12,
      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,23,42,0.12)',
      boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(15,23,42,0.12)',
      overflow: 'hidden',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease',
      position: 'relative',
      '&:hover': {
        transform: 'translateY(-6px)',
        backgroundColor: isDark ? 'rgba(24,24,27,0.58)' : 'rgba(255,255,255,0.78)',
        boxShadow: isDark
          ? '0 10px 34px rgba(0,0,0,0.55)'
          : '0 12px 34px rgba(15,23,42,0.18)'
      },
      '&:focus-within': {
        outline: '2px solid',
        outlineColor: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(30,64,175,0.55)',
        outlineOffset: 2
      }
    } as const;
  };

  return (
    <Box
      id="projects"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography level="h2" sx={{ textAlign: 'center', mb: 4 }}>
        {content.title}
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* responsive: 1 column xs, 2 columns md, 3 columns lg */}
        <Grid xs={12} md={6} lg={4}>
          <Card sx={frostedCardSx}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Link href="https://web.mediaserviceagency.com" target="_blank" underline="none" sx={{ '&:hover': { textDecoration: 'none' } }}>
                <Typography level="h4" sx={{ fontWeight: 600 }}>{content.landing}</Typography>
              </Link>
              <Box sx={{ mt: 1, flex: 1 }}>
                <Box
                  component="img"
                  src="/images/landing.png"
                  alt="Landing Page"
                  sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 6, border: '1px solid rgba(255,255,255,0.25)' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Card sx={frostedCardSx}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Typography level="h4" sx={{ fontWeight: 600 }}>{content.clock}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
                <Clock />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Additional placeholders in a consistent layout */}
        <Grid xs={6} md={6} lg={4}>
          <Card sx={frostedCardSx}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4" sx={{ fontWeight: 600 }}>{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={6} md={6} lg={4}>
          <Card sx={frostedCardSx}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4" sx={{ fontWeight: 600 }}>{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={6} md={6} lg={4}>
          <Card sx={frostedCardSx}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4" sx={{ fontWeight: 600 }}>{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={6} md={6} lg={4}>
          <Card sx={frostedCardSx}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography level="h4" sx={{ fontWeight: 600 }}>{content.placeholder}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;