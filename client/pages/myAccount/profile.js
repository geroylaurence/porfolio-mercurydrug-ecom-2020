import React from 'react';
import { connect } from 'react-redux';

import StyledContainer from '../../components/layouts/styledContainer';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyledContainer>
        <StyledContainer>
          <div className="col-md">
            <h4>
              PROFILE
            </h4>
            <hr />
          </div>
        </StyledContainer>
        <StyledContainer>
          <div className="col-md">
            <p>
              Below is your mercury online store profile. To update your profile information, please use the form below.
            </p>
          </div>
        </StyledContainer>
        <StyledContainer>
          <StyledContainer>
            <div className="col-md-3">
              <div className="form-group">
                <label>Email Address</label>
                <h4>{this.props.account.userData.email}</h4>
              </div>
            </div>
          </StyledContainer>
          <br />
          <StyledContainer flexDirection="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>First Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={this.props.account.userData.firstName}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={this.props.account.userData.lastName}
                  readOnly
                />
              </div>
            </div>
          </StyledContainer>
        </StyledContainer>
      </StyledContainer>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
});

export default connect(mapStateToProps)(Profile);