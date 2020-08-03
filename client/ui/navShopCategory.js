import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NavShopCategory = styled(({
  asChild,
  ...otherProps,
}) => {
  let className = `nav flex-column`;

  if (asChild) {
    className += ` ml-3 pt-2`;
  }

  let propsWithClassName = {
    ...otherProps,
    className,
  };

  return (
    <ul 
      {...propsWithClassName}
     />
  )
}).attrs(props => ({}))`
  display: none;
`;

const ItemShopCategory = styled(({
  ...otherProps,
}) => {
  const propsWithClassName = {
    ...otherProps,
    className: 'nav-item'
  };
  return <li {...propsWithClassName} />
}).attrs(props => ({}))``;

const BrandShopCategory = styled(({
  ...otherProps,
}) => <button {...otherProps} />).attrs(props => ({}))`
  border: none;
  background-color: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.grey};
  display: inline-block;
  font-size: ${p => p.theme.font.size.md};
  font-weight: 500;
  margin-bottom: ${p => p.theme.margin.xs};
  text-align: left;
  text-decoration: none;
  width: 100%;
`;

const SelectShopCategory = styled(({
  ...otherProps,
}) => <button {...otherProps} />).attrs(props => ({}))`
  border: none;
  background-color: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.grey};
  display: inline-block;
  text-align: left;
  text-decoration: none;
  width: 100%;
`;

export {
  NavContainer,
  NavShopCategory,
  ItemShopCategory,
  BrandShopCategory,
  SelectShopCategory,
};