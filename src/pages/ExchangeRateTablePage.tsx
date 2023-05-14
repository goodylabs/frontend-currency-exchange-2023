import { Grid } from '@mui/material';
import { ExchangeRateTable } from '../components/ExchangeRateTable/ExchangeRateTable';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

export function ExchangeRateTablePage() {
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
      </Grid>

      <Grid
        item
        container
        justifyContent={'center'}
        marginTop={4}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <ExchangeRateTable />
      </Grid>
      <Footer />
    </Grid>
  );
}
