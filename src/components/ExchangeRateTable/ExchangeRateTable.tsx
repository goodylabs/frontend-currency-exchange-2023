import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CurrencyRate, CurrencyTableValues } from './ExchangeRateTable.types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, Grid } from '@mui/material';

export function ExchangeRateTable() {
  const [tableValues, setTableValues] = React.useState<CurrencyTableValues[]>([]);
  const tableAURL = `${import.meta.env.VITE_API_URL}/exchangerates/tables/a/`;
  const [isLoading, setIsLoading] = useState(true);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, editable: false },
    { field: 'code', headerName: 'Currency', minWidth: 100, editable: false, flex: 1 },
    {
      field: 'mid',
      headerName: 'Value(PLN)',
      editable: false,
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Exchange date',
      editable: false,
      flex: 1,
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
        const tableValues: CurrencyTableValues[] = response.data[0].rates.map((rate: CurrencyRate, index: any) => {
          return {
            id: index,
            code: rate.code,
            mid: rate.mid,
            date: response.data[0].effectiveDate,
          } as CurrencyTableValues;
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
      sx={{ backgroundColor: '#f8f8f5' }}
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
          pageSizeOptions={[25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
}
