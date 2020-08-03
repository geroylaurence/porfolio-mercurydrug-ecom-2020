import React from 'react';
import styled from 'styled-components';

export const FooterContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  width: 100%;
  display: block;

  @media (max-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  };
`;

export const FooterItemLinks = styled(({
  borderRight,
  ...otherProps,
}) => <div {...otherProps} />).attrs(props => ({}))`
  display: block;
  float: left;
  margin-right: 10px;
  padding-right: 30px;

  ${props => props.borderRight && `border-right: 1px solid #929292;`}
  @media (max-width: ${props => props.theme.webScreenContent.pointer_tablet}) {
    width: 50%;
  };
`;

export const FooterItemToConnect = styled.div`
  display: block;
  float: right;
  height: 150px;
  margin-right: 10px;
  min-width: 170px;
  padding-right: 30px;
`;

export const MdText = styled.span`
  color: white;
  font-weight: 700;
`;

export const SmText = styled.span`
  color: white;
  font-weight: 10px;
`;

export const CopyRightText = styled.span`
  color: white;
  font-size: 12px;
  float: right;
  right: 0;
`;

export const FooterExternalLink = styled.a`
  &:link, &:visited {
    color: white;
    text-decoration: none;
    font-size: 12px;
  }
`;

export const FaStack = styled.div`
  position: relative;
  display: inline-block;
  width: 2em;
  height: 2em;
  line-height: 2em;
  vertical-align: middle;
  margin-right: 0.3em;

  .email {
    color: #2849bd;
  }

  .facebook {
    color: #3b5998;
  }

  .twitter {
    color : #54abee;
  }
`;