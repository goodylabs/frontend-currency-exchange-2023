import { Grid } from '@mui/material';
import { Footer } from '../components/Footer/Footer';
import { GoldPriceChart } from '../components/GoldPriceChart/GoldPriceChart';
import { Header } from '../components/Header/Header';

export function GoldPricePage() {
  return (
    <Grid
      container
      justifyContent={'center'}
      alignContent={'space-between'}
      minHeight={'100vh'}
      height={'auto'}
      sx={{ backgroundColor: '#f6f6f2' }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Header />
        <GoldPriceChart />
      </Grid>
      <Footer />
    </Grid>
  );
}
