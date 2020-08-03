const config = require('config');
const rp = require('request-promise');

class MercuryDrug {
  constructor(opts={}) {
    this._baseURL = config.get('MERCURY_DRUG.API_URL');
    this._endPoints = config.get('MERCURY_DRUG.END_POINTS');
    this._authorization = '';
  }
  initiateHeaders() {
    let headersOpts = {};

    if ( this._authorization && 
         this._authorization !== undefined && 
         this._authorization !== 'undefined' &&
         this._authorization !== ''
    ) {
      headersOpts = {
        ...headersOpts,
        'Authorization': `Bearer ${this._authorization}`,
      }
    }

    return headersOpts;
  }
  request(
    path, 
    // assign object name on inside data
    // body
    // query 
    data={}
  ) {
    return {
      url: `${this._baseURL}/${path}`,
      opts: {
        json: true,
        headers: this.initiateHeaders(),
        ...data,
      },
    };
  }
  upload(
    path, 
    // assign object name on inside data 
    // body 
    // query 
    data={}
  ) {
    return {
      url: `${this._baseURL}/${path}`,
      opts: {
        headers: this.initiateHeaders(),
        formData: data,
        json: true,
      },
    };
  }
  post({ url, opts }) {
    return rp({
      method: 'POST',
      uri: url,
      ...opts,
    });
  }
  put({ url, opts }) {
    return rp({
      method: 'PUT',
      uri: url,
      ...opts,
    });
  }
  delete({ url, opts }) {
    return rp({
      method: 'DELETE',
      uri: url,
      ...opts,
    });
  }
  get({ url, opts }) {
    return rp({
      method: 'GET',
      uri: url,
      ...opts,
    });
  }
  // ACCOUNTS 
  accountRegister(data) {
    return this.post(this.request(`${this._endPoints.ACCOUNT_REGISTER}`, { body: data }));
  }
  accountLogin(data) {
    return this.post(this.request(`${this._endPoints.ACCOUNT_LOGIN}`, { body: data }));
  }
  accountAccess() {
    return this.get(this.request(`${this._endPoints.ACCOUNT_CHECK_TOKEN}`));
  }
  accountValidateEmail(data) {
    return this.post(this.request(`${this._endPoints.ACCOUNT_VALIDATE_EMAIL}`, { body: data }));
  }
  accountResendProcessingValidateEmail() {
    return this.post(this.request(`${this._endPoints.ACCOUNT_RESEND_PROCESSING_VALIDATE_EMAIL}`));
  }
  accountRequestResetPassword(email) {
    return this.get(this.request(`${this._endPoints.ACCOUNT_REQUEST_RESET_PASSWORD}/${email}`));
  }
  accountProcessResetPassword(data) {
    return this.post(this.request(`${this._endPoints.ACCOUNT_PROCESS_RESET_PASSWORD}`, { body: data }));
  }

  // ADDRESS
  addressAdd(data) {
    return this.put(this.request(`${this._endPoints.ADDRESS_ADD}`, { body: data }));
  }
  addressList() {
    return this.get(this.request(`${this._endPoints.ADDRESS_LIST}`));
  }

  // CART
  cartAddItem(data) {
    return this.put(this.request(`${this._endPoints.CART_ADD_ITEM}/${data.productId}`, {
      qs: {
        quantity: data.quantity,
      }
    }));
  }
  cartAddBulkItems(data) {
    return this.post(this.request(`${this._endPoints.CART_ADD_BULK_ITEMS}`, { body: data }));
  }
  cartUpdateItemQuantity(data) {
    return this.put(this.request(`${this._endPoints.CART_UPDATE_ITEM_QUANTITY}/${data.cartId}`, {
      qs: {
        quantity: data.quantity
      }
    }));
  }
  cartDeleteItem(cartId) {
    return this.delete(this.request(`${this._endPoints.CART_DELETE_ITEM}/${cartId}`));
  }
  cartCountItems() {
    return this.get(this.request(`${this._endPoints.CART_COUNT_ITEMS}`));
  }
  cartGetItems() {
    return this.get(this.request(`${this._endPoints.CART_GET_ITEMS}/0`));
  }
  cartInitiateRedemeemPoints(redeemPoints) {
    return this.get(this.request(`${this._endPoints.CART_GET_ITEMS}/${redeemPoints}`));
  }

  // CHECKOUT
  checkoutProceedPayment(data) {
    return this.post(this.request(`${this._endPoints.CHECKOUT_PROCEED_PAYMENT}`, { body: data }));
  }
  checkoutUpdateStatus(data) {
    return this.get(this.request(`${this._endPoints.CHECKOUT_UPDATE_STATUS}/${data.status}/${data.orderId}/${data.referenceKey}`));
  }
  walletEsukiPtsTotal() {
    return this.get(this.request(`${this._endPoints.WALLET_ESUKI_PTS_TOTAL}`));
  }

  // LOCATIONS
  locationList() {
    return this.get(this.request(`${this._endPoints.LOCATION_LIST}`));
  }
  locationProvinceCityList(regionId) {
    return this.get(this.request(`${this._endPoints.LOCATION_STATE_LIST}/${regionId}`));
  }
  locationBranchList(stateId) {
    return this.get(this.request(`${this._endPoints.LOCATION_BRANCH_LIST}/${stateId}`));
  }

  // PRODUCTS
  bannerCarousel({
    categoryId,
    bannerType
  }) {
    return this.get(this.request(`${this._endPoints.PRODUCT_CATEGORY_BANNERS}/${bannerType}/${categoryId}`));
  }
  categoryList() {
    return this.get(this.request(`${this._endPoints.PRODUCT_CATEGORY_LIST}`));
  }
  productListByCategory(categoryId) {
    return this.get(this.request(`${this._endPoints.PRODUCT_LIST_BY_CATEGORY}/${categoryId}`));
  }
  productListByPurchased() {
    return this.get(this.request(`${this._endPoints.PRODUCT_LIST_BY_PURCHASED}`));
  }
  productSearchAll(searchTerm) {
    return this.get(this.request(`${this._endPoints.SEARCH_PRODUCTS}/${searchTerm}`));
  }
  productSearchByBrandOrGenerics(searchTerm) {
    return this.get(this.request(`${this._endPoints.SEARCH_PRODUCTS_BY_BRAND_GENERICS}/${searchTerm}`));
  }
  productInquiry(data) {
    return this.post(this.request(`${this._endPoints.INQUIRY_PRODUCTS}`, { body: data }));
  }

  // MESSAGE
  messageGeneralInquiry(data) {
    return this.post(this.request(`${this._endPoints.INQUIRY_GENERAL}`, { body: data }));
  }

  // UPLOADER
  uploadPrescriptionCheckout({
    fileName='',
    contentType='',
    data='',
  }) {
    return this.post(this.upload(`${this._endPoints.CHECKOUT_UPLOAD_PRESCRIPTION}`, {
      file: {
        value: data,
        options: {
          filename: fileName,
          contentType: contentType
        }
      }
    }));
  }
  removePrescriptionCheckout(imageId) {
    return this.delete(this.request(`${this._endPoints.CHECKOUT_REMOVE_UPLOADED_PRESCRIPTION}/${imageId}`));
  }
}

module.exports = MercuryDrug;