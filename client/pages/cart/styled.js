import React from 'react';
import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  width: inherit;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const TableHeader = styled.thead`
  background-color: ${p => p.theme.colors.primary};
  tr {
    color: ${p => p.theme.colors.white};
    font: icon;
    font-size: 1em;
  };
  th {
    padding-bottom: ${p => p.theme.padding.sm};
    padding-top: ${p => p.theme.padding.sm};
    text-align: center;
  };
  th#image {
    width: 100px;
  }
  th#name {
    width: 150px;
  }
  th#updater {
    width: 150px;
  }
`;

export const TableBody = styled.tbody`
  tr {
    color: ${p => p.theme.colors.grey};
    &: nth-child(even) {
      background-color: ${p => p.theme.colors.offWhite};
    }
    &: hover {
      background-color: ${p => p.theme.colors.shadowColor};
    }
  };
  td {
    padding-bottom: ${p => p.theme.padding.sm};
    padding-top: ${p => p.theme.padding.sm};
    text-align: center;
  }
`;

export const TDDelete = styled.td`
  padding-bottom: initial!important;
  padding-top: initial!important;
`;

export const ItemsTableMediaQuery = styled.div`
  @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
    width: 900px;
  };
`;

export const OrderSummaryMediaQuery = styled.div`
  @media (min-width: ${props => props.theme.webScreenContent.pointer_mobile}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: inherit;
  };
  @media (min-width: ${props => props.theme.webScreenContent.pointer_desktop}) {
    width: 422px;
  };
`;
