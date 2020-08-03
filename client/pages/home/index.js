import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateAccount from './createAccount';
import Login from './loginAccount';

import StyledContainer from '../../components/layouts/styledContainer'; 
import { H3Grey } from '../../ui/headers'; 
import { TextGrey } from '../../ui/text'; 
import CbButton from '../../ui/classBase/cbButton';

function Home(props) {
  if (props.account && props.account.authenticated) {
    return <Redirect to="/shop" />
  }

  return (
    <StyledContainer itemsCenter paddingTop="sm">
      <H3Grey>Welcome to Mercury Drug Online!</H3Grey>
      <TextGrey fontWeight="normal">
        This is an expanded version of Order Online which allows our customers to choose
      </TextGrey>
      <TextGrey fontWeight="normal">
        how they want to shop - by generic or brand name, by product category, or by order history.
      </TextGrey>
      <br />
      <TextGrey fontWeight="normal">
        Should you wish to continue using Order Online, It, will still be available.
      </TextGrey>
      <TextGrey fontWeight="normal">
        But if you wish to switch to Mercury Drug Online, you will need to
      </TextGrey>
      <TextGrey fontWeight="normal">
        create a new account which will be given a new Customer Code.
      </TextGrey>
      <StyledContainer marginTop="md" marginBottom="md" flexDirection="row" height="80px">
        <StyledContainer>
          <CbButton 
            type="button" 
            className="btn" 
            style={{ height: '100%' }}
          >
            Continue with Order Online
          </CbButton>
        </StyledContainer>
        &nbsp;&nbsp;
        <StyledContainer>
          <Login />
        </StyledContainer>
        &nbsp;&nbsp;
        <StyledContainer>
          <CreateAccount />
        </StyledContainer>
      </StyledContainer>
      <TextGrey fontWeight="normal">
        All products in Mercury Drug Online and Order Online are FDA-approved.
      </TextGrey>
    </StyledContainer>
  )
}

// redux
const mapStateToProps = state => ({
  app: state.app,
  account: state.account,
});

export default connect(mapStateToProps)(Home);
