import React from 'react';
import styled from 'styled-components';

let maskNumeric = null;
try {
  navigator
  maskNumeric = require('inputmask/dist/inputmask/inputmask.numeric.extensions')
} catch (error) {}

const InputNumber = styled.input`
  align-text: center;  
`;

class NumberQuantity extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const quantityElem = document.getElementById('quantity');
    maskNumeric('integer',{
      integerDigits: 3,
      digitsOptional: false,
      numericInput: true,
    }).mask(quantityElem);
  }
  render() {
    return (
      <div className="input-group input-group-sm  mb-3">
        <div className="input-group-prepend">
          <button 
            id="button-minus"
            type="button" 
            className="btn btn-outline-secondary" 
          >
            <i className="fa fa-minus" />
          </button>
        </div>
        <InputNumber
          type="text" 
          className="form-control" 
          id="quantity"
          aria-label="Sizing example input" 
          aria-describedby="inputGroup-sizing-sm"
        />
        <div className="input-group-append">
          <button 
            id="button-plus"
            type="button" 
            className="btn btn-outline-secondary" 
          >
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
    );
  }
}

export default NumberQuantity;