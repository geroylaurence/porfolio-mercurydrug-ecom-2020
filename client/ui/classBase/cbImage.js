import React from 'react';
import styled from 'styled-components';

const CBImage = styled(({
  width,
  height,
  minWidth,
  minHeight,
  ...otherProps,
}) => <img {...otherProps} />).attrs(props => ({
  width: (props.width) ? props.width : 'initial',
  height: (props.height) ? props.height : 'initial',
}))`
  width: ${p => p.width};
  height: ${p => p.height};
  ${p => (p.width && `min-width: ${p.width};`)}
  ${p => (p.height && `min-height: ${p.height};`)}
`;

export default CBImage;