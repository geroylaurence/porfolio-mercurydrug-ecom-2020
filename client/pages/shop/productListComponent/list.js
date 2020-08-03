import React from 'react';
import PropTypes from 'prop-types';

import StyledContainer from '../../../components/layouts/styledContainer';
import { TextPrimary, TextGrey } from '../../../ui/text';
import SmallText from '../../../ui/smallText';

class ProductListComponent extends React.Component {
  constructor(props) {
    super(props);

    // items -> array object
  }
  render() {
    return (
      <StyledContainer>
        <StyledContainer
          flexDirection="row"
          flexWrap
          width="870px"
          marginBottom="lg"
        >
          { this.props.items && 
            this.props.items !== null &&
            this.props.items.map((item, i) => (
              <StyledContainer
                key={i} 
                width="290px"
                height="242px"
                itemsCenter
                marginBottom="lg"
              >
                <img width="200px" src={item.image} />
                <StyledContainer
                  marginLeft="md"
                  marginRight="md"
                 >
                  {/*{ item.generics !== null &&*/}
                  {/*  <SmallText*/}
                  {/*    large*/}
                  {/*    bold*/}
                  {/*    withDefaultBorder*/}
                  {/*    verticalPadding="xs"*/}
                  {/*  >*/}
                  {/*    { item.generics.genericName }*/}
                  {/*  </SmallText>*/}
                  {/*}*/}
                  <TextGrey textCentered>
                    {item.name}
                  </TextGrey>
                </StyledContainer>
              </StyledContainer>
            ))
          }
        </StyledContainer>
      </StyledContainer>
    );
  }
}

ProductListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductListComponent;
