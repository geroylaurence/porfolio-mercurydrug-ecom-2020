import React from 'react';
import styled from 'styled-components';

export const CbH6 = styled(({
  noMargin,
  ...otherProps,
}) => <h6 {...otherProps} />).attrs(props => ({}))`
  ${props => (props.noMargin) && `margin: 0` };
`;