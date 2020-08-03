import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import universal from 'react-universal-component';
import { injectIntl } from 'react-intl'; 

import BodyContainer from './components/layouts/bodyContainer';
import ScreenContent from './components/screenContent';

import { HrMedium } from './ui/hr';
import AppHeader from './appHeader';

import NavBar from './components/navigationMenu/component';
import NavBarMobile from './components/navigationMenuMobile/component';

import Banner from './components/banner';
import BreadCrumb from './components/breadcrumb';
import Footer from './components/footer/component';
import FooterBottom from './components/footer/bottom';

import PrivateRoute from './routing/privateRoute';
import PrivateCrumbRoute from './routing/privateCrumbRoute';
import CrumbRoute from './routing/crumbRoute';

const Login = universal(import('./pages/login'));
const CreateAccount = universal(import('./pages/createAccount'));
const Shop = universal(import('./pages/shop'));
const Cart = universal(import('./pages/cart'));

import TermsConditions from './pages/termsConditions';
import DataPrivacy from './pages/dataPrivacy';

import ErrorMainContent from './pages/errorCodes/main-content';
import NotFound from './pages/errorCodes/404';
import AccountUnverified from './pages/redirect/accountUnverified';

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);

    this.renderDataWatcher = this.renderDataWatcher.bind(this);
  }
  renderDataWatcher() {
    if (this.props.dataMonitoring !== null) {
      return (
        <ScreenContent>
          <strong>Data Watcher</strong>
          <pre style={{ height: '170px' }}>
            {JSON.stringify(this.props.dataMonitoring, undefined, 2)}
          </pre>
        </ScreenContent>
      )
    } else {
      return null;
    }
  }
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <BodyContainer>
        <HrMedium />
        <ScreenContent>
          <AppHeader />
          <NavBar />
        </ScreenContent>
        <NavBarMobile />
        <Banner />
        <ScreenContent>
          <BreadCrumb />
        </ScreenContent>

        { // remove on production, for dev only
          this.renderDataWatcher()
        }

        <ScreenContent>
          <div style={{ minHeight: '650px', marginBottom: '200px' }}>
            <ErrorMainContent>
              <Switch>
                <Route exact path="/" component={Shop} />
                <Route path="/shop" component={Shop} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <Route path="/terms-conditions" component={TermsConditions} />
                <Route path="/data-privacy" component={DataPrivacy} />
                <Route component={NotFound} />
              </Switch>
            </ErrorMainContent>
          </div>
        </ScreenContent>
        <Footer />
        <FooterBottom />
      </BodyContainer>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,

  // for dev only, remove soon
  dataMonitoring: null
});

export default injectIntl(connect(mapStateToProps)(AppRoutes));