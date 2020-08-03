import request from '../middleware/request';

const endPoint = 'cart';

function addItem(data) {
  return request(`${endPoint}/add-item`, data);
}

function addBulkItems(data=[]) {
  return request(`${endPoint}/add-bulk-items`, { items: data });
}

function updateItemQuantity({
  cartId,
  quantity,
}) {
  return request(`${endPoint}/update-item-quantity`, {
    cartId,
    quantity,
  });
}

function deleteItem(cartId) {
  return request(`${endPoint}/delete-item`, { cartId });
}

function countItems() {
  return request(`${endPoint}/count-items`);
}

function getItems() {
  return request(`${endPoint}/get-items`);
}

export {
  addItem,
  addBulkItems,
  updateItemQuantity,
  deleteItem,
  countItems,
  getItems,
};
