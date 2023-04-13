import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// eslint-disable-next-line import/no-unresolved
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function ViewAllRoad() {
  const theme = useTheme();
  const ROAD = JSON.parse(localStorage.getItem('road'));
  return (
    <>
      <Helmet>
        <title> Dashboard | Tra cứu tuyến đường nguy hiểm </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <AppNewsUpdate
              title="Các đoạn đường nguy hiểm"
              list={ROAD.map((item, index) => ({
                id: item.id || '',
                title: `Đường ${item.road}, ${item.district}, Thành Phố ${item.city}` || '',
                description: item.description || '',
                image: item.image || '',
                postedAt: item.postedAt || '',
                solution: item.solution || '',
                length: item.length || '',
                width: item.width || '',
                type: item.type || '',
                material: item.material || '',
                start: item.start || '',
                end: item.end || '',
                speed: item.speed || '',
                condition: item.condition || '',
                feature: item.feature || '',
                accident1: item.accident1 || '',
                accident2: item.accident2 || '',
                accident3: item.accident3 || '',
                accident4: item.accident4 || '',
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
