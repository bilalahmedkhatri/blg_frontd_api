import { Card, CardContent, Typography, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDashboardStats } from './useDashboardStats';

const StatsCard = ({ title, value, loading }: { title: string; value?: number; loading: boolean }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      {loading ? (
        <Skeleton variant="rectangular" width={100} height={32} />
      ) : (
        <Typography variant="h4" component="div">
          {value?.toLocaleString()}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export const DashboardPage = () => {
//   const { stats, loading } = useDashboardStats();
  const { stats, loading } = useDashboardStats();

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Overview
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Posts" value={stats?.posts} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Comments" value={stats?.comments} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Active Users" value={stats?.users} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Draft Posts" value={stats?.drafts} loading={loading} />
        </Grid>
      </Grid>
    </>
  );
};