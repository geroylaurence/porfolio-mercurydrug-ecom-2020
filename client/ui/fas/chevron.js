import React from 'react';
import styled from 'styled-components';

export const ChevronDown = styled(({
  color,
  ...otherProps,
}) => {
  let elemProps = otherProps;

  // Set FAS Class
  elemProps = {
    ...elemProps,
    className: 'fa fa-chevron-down',
  };

  // Set Manual Style
  elemProps = {
    ...elemProps,
    style: {
      color: 'red'
    }
  }

  return <i {...elemProps} />
}).attrs(props => ({}))``