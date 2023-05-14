import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  background: rgba(130, 130, 255, 0.2);
  color: #fff;
  padding: 20px;
  width: 80%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(130, 130, 255, 0.3);
  }
`;

const TableData = styled.td`
  padding: 10px;
`;

const StatisticsTable = ({ minPrice, maxPrice, averagePrice, minPriceDate, maxPriceDate }) => {
  return (
    <TableContainer>
      <Table>
        <tbody>
        <TableRow>
            <TableHeader><h4>Title</h4></TableHeader>
            <TableData><h4>Price (PLN)</h4></TableData>
            <TableData><h4>Date</h4></TableData>
          </TableRow>
          <TableRow>
            <TableHeader>Minimum Price</TableHeader>
            <TableData>{minPrice}</TableData>
            <TableData>{minPriceDate}</TableData>
          </TableRow>
          <TableRow>
            <TableHeader>Maximum Price</TableHeader>
            <TableData>{maxPrice}</TableData>
            <TableData>{maxPriceDate}</TableData>
          </TableRow>
          <TableRow>
            <TableHeader>Average Price</TableHeader>
            <TableData>{averagePrice}</TableData>
            <TableData></TableData>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default StatisticsTable;
