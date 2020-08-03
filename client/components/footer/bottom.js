import React from 'react';

import StyledContainer from '../layouts/styledContainer';
import ScreenContent from '../screenContent';
import theme from '../../ui/styles/theme';

import {
  FooterExternalLink,
  SmText,
  CopyRightText,
} from './styled';

function Bottom(props) {
  return (
    <StyledContainer 
      backgroundColor={theme.colors.greyDark}
      paddingTop="sm"
      paddingBottom="sm"
    >
      <ScreenContent>
        <SmText>
          <FooterExternalLink href="https://www.mercurydrug.com/terms-of-use.html">Terms of Use</FooterExternalLink> | <FooterExternalLink href="https://www.mercurydrug.com/terms-of-use.html">Privacy Policy</FooterExternalLink>
        </SmText>
        <CopyRightText>
          © 2020 Mercury Drug Corporation. All Rights Reserved.
        </CopyRightText>
      </ScreenContent>
    </StyledContainer>
  );
}

export default Bottom;