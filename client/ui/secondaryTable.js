import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  height: 600px;
  overflow-y: auto;
  overflow-x: auto;
  width: inherit;
`;

const Table = styled.table`
  // border-collapse: collapse;
  // width: 100%;

  border-collapse: collapse;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const TableHeader = styled.thead`
  background-color: ${p => p.theme.colors.shadowColor};
  tr {
    color: ${p => p.theme.colors.primary};
    font: icon;
    font-size: 1em;
  };
  th {
    padding-bottom: ${p => p.theme.padding.sm};
    padding-top: ${p => p.theme.padding.sm};
    text-align: center;
  };
`;

const TableBody = styled.tbody`
  tr {
    color: ${p => p.theme.colors.grey};
    &: nth-child(even) {
      background-color: ${p => p.theme.colors.offWhite};
    }
    // &: hover {
    //   background-color: ${p => p.theme.colors.shadowColor};
    // }
  };
  td {
    padding-bottom: ${p => p.theme.padding.sm};
    padding-top: ${p => p.theme.padding.sm};
    text-align: center;
  };
  td: first-child {
    padding-left: ${p => p.theme.padding.sm};
    text-align: left!important; 
  }
`;

export {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
};