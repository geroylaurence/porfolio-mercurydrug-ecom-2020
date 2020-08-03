import React from 'react';
import styled from 'styled-components';

const CBContainer = styled(({
  applyBgPrimary,
  width,
  height,
  ...otherProps,
}) => <div {...otherProps} />).attrs(props => ({
  width: (props.width) ? props.width : 'initial',
  height: (props.height) ? props.height : 'initial',
}))`
  width: ${p => p.width};
  height: ${p => p.height};
  background-color: ${props => {
    if (props.applyBgPrimary) return props.theme.colors.primary;
    return `initial`;
  }}!important;
`;

export default CBContainer;