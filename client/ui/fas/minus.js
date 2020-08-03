import React from 'react';
import styled from 'styled-components';

export const MinusDefault = styled(({
  color,
  ...otherProps,
}) => 
  <i
    {
      ...{
        ...otherProps,
        className: "fa fa-minus",
      }
    }
  />
).attrs(props => ({}))``;