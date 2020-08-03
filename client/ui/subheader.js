import React from 'react';
import styled from 'styled-components';

const SubHeader = styled(({
  bold,
  ...otherProps,
}) => <h4 {...otherProps} />).attrs(props => ({}))`
  color: ${p => p.theme.colors.primary};
  text-align: center;
  width: initial;
  ${p => (p.bold && `font-weight: ${p.theme.font.weight.bold};`)}
`;

export default SubHeader;