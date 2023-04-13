import { Helmet } from 'react-helmet-async';
// @mui
// eslint-disable-next-line import/no-unresolved

import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import { AppNewsUpdate, AppWidgetSummary, AppCurrentSubject } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const ROAD = JSON.parse(localStorage.getItem('road'));

  const sumAccident1 = ROAD.reduce((acc, cur) => acc + Number(cur.accident1), 0);
  const sumAccident2 = ROAD.reduce((acc, cur) => acc + Number(cur.accident2), 0);
  const sumAccident3 = ROAD.reduce((acc, cur) => acc + Number(cur.accident3), 0);
  const sumAccident4 = ROAD.reduce((acc, cur) => acc + Number(cur.accident4), 0);

  return (
    <>
      <Helmet>
        <title> Dashboard | Tra cứu tuyến đường nguy hiểm </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tai nạn va chạm"
              total={sumAccident1 ?? 0}
              icon="../assets/icons/car-collision.png"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tai nạn liên quan đến người đi bộ"
              total={sumAccident2}
              color="info"
              icon="../assets/icons/standing-up-man-.png"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tai nạn do quá tải"
              total={sumAccident3}
              color="warning"
              icon="../assets/icons/overload.png"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tai nạn do lái xe mệt mỏi"
              total={sumAccident4}
              color="error"
              icon="../assets/icons/dry-eyes.png"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Thông tin giao thông gần bạn"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={ROAD.slice(0, 6).map((item, index) => ({
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
