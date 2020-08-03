import React from 'react';
import styled from 'styled-components';

import mercuryBanner from '../assets/mercury-drug.jpg'
import NumberQuantity from './ui/numberQuantity';

import {
  register
} from '../model/account';

import {
  categoryList,
} from '../model/products';

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // register({
    //   "email": "laurence.geroy@octaltech.net",
    //   "password": "password",
    //   "lastName": "Geroy",
    //   "firstName": "John Laurence"
    // })
    // .then(result => {
    //   console.log(result);
    // })
    // .catch(err => {
    //   console.log(err);
    // })
    categoryList()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <React.Fragment>
        <NumberQuantity />
      </React.Fragment>
    );
  }
}

const NavBarDefault = styled.nav`
  background: ${p => p.theme.colors.primary}!important;
  border-radius: 30px!important;
  border-color: transparent!important;
  z-index: 1;

  a {
    color: white;
    margin: 1rem;
  }

  a:hover {
    background-color: ${p => p.theme.colors.primaryLight}!important;
    border-radius: 30px!important;
  }
`;

const NavBarList = styled.ul`
  background: ${p => p.theme.colors.primary}!important;
  border-radius: 30px!important;
  border-color: transparent!important;
  z-index: 1;

  li a {
    color: white;
    margin: 1rem;
  }
  li a:hover {
    background-color: ${p => p.theme.colors.primaryLight}!important;
    border-radius: 30px!important;
  }
`;

const SpanTest = styled.span`
  width: 600px;
  background-color: red;
  padding: 0.2rem 0.5rem;
  color: white;
`

const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.05rem sold;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.05rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: blue;
  }
`

export default Test;