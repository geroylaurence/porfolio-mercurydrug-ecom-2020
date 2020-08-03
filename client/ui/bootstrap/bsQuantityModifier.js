import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

import CbContainer from '../classBase/cbContainer';
import { MinusDefault } from '../fas/minus';
import { TextContainer } from '../span';

const CbInputText = styled(({
  width,
  ...otherProps,
}) => <input {...otherProps} />).attrs(props => ({}))`
  background-color: white!important;
`;

class BsQuantityModifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qtyValue: 1,
    }

    this.withLabel = props.withLabel;
    this.width = props.width;
    this.addHandler = this.addHandler.bind(this);
    this.minusHandler = this.minusHandler.bind(this);
  }
  addHandler(e) {
    const qtyCurrentVal = this.state.qtyValue;
    const qtyNewVal = parseInt(qtyCurrentVal + 1);

    this.setState({
      qtyValue: qtyNewVal,
    });
  }
  minusHandler(e) {
    const qtyCurrentVal = this.state.qtyValue;
    const qtyNewVal = (qtyCurrentVal === 1) ? parseInt(1) : parseInt(qtyCurrentVal - 1);

    this.setState({
      qtyValue: qtyNewVal,
    });
  }
  render() {
    return (
      <CbContainer className="input-group">
        <div className="input-group-prepend">
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            id="button-minus"
            onClick={this.minusHandler}
          >
            <TextContainer>
              <i className="fa fa-minus" />
            </TextContainer>
          </button>
          { this.withLabel && this.withLabel !== '' &&
            <span className="input-group-text">{this.withLabel}</span>
          }
        </div>
        <CbInputText 
          type="text" 
          className="form-control"
          value={this.state.qtyValue}
          readOnly
        />
        <div className="input-group-append">
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            id="button-add"
            onClick={this.addHandler}
          >
            <TextContainer>
              <i className="fa fa-plus" />
            </TextContainer>
          </button>
        </div>
      </CbContainer>
    );
  }
}

export default BsQuantityModifier;

