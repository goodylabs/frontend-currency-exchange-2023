import { Grid } from '@mui/material';
import { CurrencyConvertForm } from '../components/CurrencyConvertForm/CurrencyConvertForm';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

export function CurrencyConverterPage() {
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
        <Header></Header>
      </Grid>
      <Grid item>
        <CurrencyConvertForm></CurrencyConvertForm>
      </Grid>
      <Footer />
    </Grid>
  );
}
