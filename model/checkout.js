import request from '../middleware/request';

const endPoint = 'checkout';

function removePrescriptionCheckout(imageId) {
  return request(`${endPoint}/remove-prescription-image`, { imageId });
}

function proceedPayment({
  deliveryType,
  addressId,
  branchId,
  rewardPointsRedemption,
}) {
  return request(`${endPoint}/proceed-payment`, {
    deliveryType,
    addressId,
    branchId,
    rewardPointsRedemption,
  });
}

function updateStatus({
  status,
  orderId,
  referenceKey,
}) {
  return request(`${endPoint}/update-status`, {
    status,
    orderId,
    referenceKey,
  });
}

function eSukiPtsTotal() {
  return request(`${endPoint}/esuki-points-total`);
}

function cartInitiateRedeemPoints(redeemPoints) {
  return request(`${endPoint}/cart-initiate-redeem-points`, { redeemPoints });
}

export {
  cartInitiateRedeemPoints,
  eSukiPtsTotal,
  removePrescriptionCheckout,
  proceedPayment,
  updateStatus,
};