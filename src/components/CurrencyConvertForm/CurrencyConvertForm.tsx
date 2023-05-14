import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyConverterFormErrors } from './CurrencyConverterForm.types';

export function CurrencyConvertForm() {
  const [conversionResult, setConversionResult] = useState('');
  const [exchangeRateArr, setExchangeRateArr] = useState<string[]>([]);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const router = useNavigate();

  const getExchangeRate = async (values: { amount: string; fromCurrency: string; toCurrency: string }) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/exchangerates/rates/c/${values.fromCurrency}`);
    const fromRate = response.data.rates[0].bid;

    const response2 = await axios.get(`${import.meta.env.VITE_API_URL}/exchangerates/rates/c/${values.toCurrency}`);
    const toRate = response2.data.rates[0].ask;

    const rate = fromRate / toRate;

    const exchangeRatesText = [
      `1 ${values.fromCurrency} = ${1 * rate} ${values.toCurrency}`,
      `1 ${values.toCurrency} = ${toRate / fromRate} ${values.fromCurrency}`,
    ];
    setConversionResult(`${values.amount} ${values.fromCurrency} = ${Number(values.amount) * rate} ${values.toCurrency}`);
    setExchangeRateArr(exchangeRatesText);
  };

  const validate = (values: { amount: string }) => {
    const errors: CurrencyConverterFormErrors = {};

    if (!values.amount || isNaN(parseFloat(values.amount)) || parseFloat(values.amount) <= 0) {
      errors.amount = 'Please enter a valid number';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: '0',
      fromCurrency: 'USD',
      toCurrency: 'AUD',
    },
    validate: validate,
    onSubmit: (values) => {
      getExchangeRate(values);
    },
  });

  useEffect(() => {
    async function fetchData() {
      const api_url = `${import.meta.env.VITE_API_URL}/exchangerates/tables/c/`;
      const response = await axios.get(api_url);
      const rates: { currency: string; code: string; mid: number }[] = response.data[0].rates;
      const availableCurrencies = rates.map((rate) => {
        return rate.code;
      });
      setAvailableCurrencies(availableCurrencies);
      formik.setFieldValue('fromCurrency', availableCurrencies[0]);
      formik.setFieldValue('toCurrency', availableCurrencies[1]);
    }
    fetchData();
  }, []);

  return (
    <Grid
      sx={{
        padding: '1.5rem',
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem',
        backgroundColor: '#f8f8f5',
        borderRadius: '4px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid
          item
          container
          flexDirection={'row'}
          justifyContent={'space-between'}
          gap={3}
        >
          <TextField
            id='amount'
            name='amount'
            label='Amount'
            type='number'
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
          />
          <Autocomplete
            id='from-currency-select'
            options={availableCurrencies.length > 0 ? availableCurrencies : []}
            sx={{ minWidth: '180px' }}
            value={formik.values.fromCurrency}
            onChange={(_, value) => formik.setFieldValue('fromCurrency', value)}
            onBlur={formik.handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                label='From'
                name='fromCurrency'
                id='fromCurrency'
                value={formik.values.fromCurrency}
                error={formik.touched.fromCurrency && Boolean(formik.errors.fromCurrency)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.fromCurrency && formik.errors.fromCurrency}
              />
            )}
          />

          <Autocomplete
            id='to-currency-select'
            options={availableCurrencies.length > 0 ? availableCurrencies : []}
            sx={{ minWidth: '180px' }}
            getOptionLabel={(option) => option || ''}
            value={formik.values.toCurrency}
            onChange={(_, value) => formik.setFieldValue('toCurrency', value)}
            onBlur={formik.handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                label='To'
                name='toCurrency'
                id='toCurrency'
                value={formik.values.toCurrency}
                error={formik.touched.toCurrency && Boolean(formik.errors.toCurrency)}
                onBlur={formik.handleBlur}
                helperText={formik.touched.toCurrency && formik.errors.toCurrency}
              />
            )}
          />
        </Grid>
        <Grid
          marginTop={4}
          item
          container
          justifyContent={'space-between'}
        >
          {conversionResult && (
            <Grid>
              <Grid>
                <Typography sx={{ color: 'rgba(0,0,0,0.8)', fontSize: '1.5rem' }}> {conversionResult.split('=')[0]} =</Typography>
                <Typography sx={{ fontWeight: '500', fontSize: '2.0rem' }}> {conversionResult.split('=')[1]}</Typography>
                <Typography sx={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)' }}> {exchangeRateArr[0]} </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)' }}> {exchangeRateArr[1]} </Typography>
              </Grid>
            </Grid>
          )}
          <Button
            variant='contained'
            color='inherit'
            sx={{
              height: '52px',
              backgroundColor: '#388087',
              color: '#ffffff',
            }}
            type='submit'
            disabled={formik.errors.amount ? true : false}
          >
            Convert
          </Button>
          <Grid
            container
            marginTop={4}
            justifyContent={'space-between'}
          >
            <Grid
              container
              justifyContent={'space-between'}
            >
              <Button
                onClick={() => {
                  router(`/currency-history?currency=${formik.values.fromCurrency}`);
                }}
                variant='outlined'
              >
                {formik.values.fromCurrency} history
              </Button>
              <Button
                onClick={() => {
                  router(`/currency-history?currency=${formik.values.toCurrency}`);
                }}
                variant='outlined'
              >
                {formik.values.toCurrency} history
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
