import React from 'react';

import { 
  OptNavContent,
  OptNavUl,
  OptNavItem,
  OptNavHRef,
  OptReactLink,
} from './styled';
import StyledContainer from '../../../components/layouts/styledContainer';
import { H5Grey } from '../../../ui/headers';
import theme from '../../../ui/styles/theme';

class MobileMedia extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      OptSelected: null,
      OptCaption: null,  
    }
  }
  render() {
    return (
      <StyledContainer 
        disableFlex 
        backgroundColor={theme.colors.greySky}
        paddingLeft="sm"
        marginBottom="sm"
      >
        <OptNavContent>
          { this.state.OptSelected !== null && this.state.OptCaption !== null &&
            <React.Fragment>
              <OptNavHRef 
                href="#" 
                onClick={e => this.setState({ OptSelected: null, OptCaption: null })}
                withPaddingY
              >
                <H5Grey>
                  <span className="fa fa-minus" />
                  &nbsp;&nbsp;
                  { this.state.OptCaption }
                </H5Grey>
              </OptNavHRef>
            </React.Fragment>
          }
          { this.state.OptCaption === null &&
            <OptNavUl>
              <OptNavItem>
                <OptReactLink 
                  to="/my-account"
                  onClick={e => this.setState({ OptSelected: 'account-profile', OptCaption: 'Profile' })}
                >
                  <H5Grey>
                    <span className="fa fa-plus" />
                    &nbsp;&nbsp;
                    Profile
                  </H5Grey>
                </OptReactLink>
              </OptNavItem>
              <OptNavItem>
                <OptReactLink 
                  to="/my-account/address-book" 
                  onClick={e => this.setState({ OptSelected: 'account-address', OptCaption: 'Address Book' })}
                >
                  <H5Grey>
                    <span className="fa fa-plus" />
                    &nbsp;&nbsp;
                    Address Book
                  </H5Grey>
                </OptReactLink>
              </OptNavItem>
            </OptNavUl>
          }
        </OptNavContent>
      </StyledContainer>
    );
  }
}

export default MobileMedia;
