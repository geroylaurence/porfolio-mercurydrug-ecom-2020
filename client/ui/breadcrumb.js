import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from 'react-breadcrumbs';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// import { NavLink as RRLink } from 'react-router-dom';
import styled from 'styled-components';

import StyledContainer from '../components/layouts/styledContainer';

const StaticBreadcrumb = styled(({
  ...otherProps
}) => <Link {...otherProps} />)`
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`;

const StyledBreadcrumb = styled(({
  ...otherProps
}) => <Breadcrumbs {...otherProps} />).attrs(props => ({}))`
  display: inline;
  text-decoration: none;
  color: ${props => props.theme.colors.black};

  .breadcrumbs__inner {
    span { margin-right: 2px; }
  }
  .breadcrumbs__crumb--active, .breadcrumbs__crumb {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
  }
`;

const Breadcrumb = (props) => {
  return (
    <StyledContainer dontGrow flexDirection="row">
      <StyledContainer dontGrow>
        <StaticBreadcrumb to={{ pathname: '/' }}>{`Home`}&nbsp;{'>'}&nbsp;</StaticBreadcrumb>
      </StyledContainer>
      <StyledContainer dontGrow>
        <StyledBreadcrumb {...props} />
      </StyledContainer>
    </StyledContainer>
  );
};

export default Breadcrumb;
