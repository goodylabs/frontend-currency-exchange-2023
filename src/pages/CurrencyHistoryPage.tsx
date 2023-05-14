import { Grid } from '@mui/material';
import { CurrencyHistoryChart } from '../components/CurrencyHistoryChart/CurrencyHistoryChart';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

export function CurrencyHistoryPage() {
  return (
    <Grid
      container
      justifyContent={'space-between'}
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
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <CurrencyHistoryChart />
      </Grid>
      <Footer/>
    </Grid>
  );
}
