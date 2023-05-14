import { Grid, CircularProgress } from '@mui/material';
import { GridColDef, DataGrid, GridCellParams } from '@mui/x-data-grid';
import clsx from 'clsx';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { CryptoCurrencyTableValues, CryptoTicker } from './CryptoCurrencyTable.types';

export function CryptoCurrencyTable() {
  const [tableValues, setTableValues] = React.useState<CryptoCurrencyTableValues[]>([]);
  const tableAURL = `${import.meta.env.VITE_CRYPTO_URL}/tickers/`;
  const [isLoading, setIsLoading] = useState(true);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, editable: false, sortable: false },
    { field: 'symbol', headerName: 'Symbol', minWidth: 100, editable: false, sortable: false, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 100, editable: false, sortable: false, flex: 1 },
    { field: 'price', headerName: 'Price(USD)', editable: false, sortable: false, flex: 1 },
    {
      field: 'percent_change_7d',
      headerName: 'Change in %(7d)',
      type: 'number',
      editable: false,
      sortable: false,
      flex: 1,
      cellClassName: (params: GridCellParams<any, number>) => {
        if (params.value == null) {
          return '';
        }

        return clsx('super-app', {
          negative: params.value < 0,
          positive: params.value > 0,
        });
      },
    },
  ];

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(tableAURL, {
          signal: controller.signal,
        });
        //create a new array with the data from the response
        //and the date from the response
        const tableValues: CryptoCurrencyTableValues[] = response.data.data.map((ticker: CryptoTicker) => {
          return {
            id: ticker.rank,
            symbol: ticker.symbol,
            name: ticker.name,
            price: ticker.price_usd,
            percent_change_7d: Number(ticker.percent_change_7d),
          } as CryptoCurrencyTableValues;
        });
        setTableValues(tableValues);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled');
        } else {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Grid
      item
      width={'70%'}
      justifyContent={'center'}
      sx={{
        backgroundColor: '#f8f8f5',
        '& .super-app.negative': {
          color: '#ac1917',
          fontWeight: '600',
        },
        '& .super-app.positive': {
          color: '#237f5d',
          fontWeight: '600',
        },
      }}
    >
      {!isLoading ? (
        <DataGrid
          rows={tableValues}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[15, 25, 40]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
}
