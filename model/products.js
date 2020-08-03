import request from '../middleware/request';

const endPoint = 'products';

function categoryBanner({
  categoryId,
  bannerType,
}) {
  const intCategoryId = parseInt(categoryId);
  return request(`${endPoint}/category-banner`, {
    categoryId: intCategoryId,
    bannerType,
  });
}

function categoryList() {
  return request(`${endPoint}/category-list`);
}

function productListByCategory(categoryId) {
  return request(`${endPoint}/by-category`, { categoryId });
}

function productListByPurchased() {
  return request(`${endPoint}/by-purchased`);
}

function productSearchAll(searchTerm) {
  return request(`${endPoint}/search-all`, {
    searchTerm,
  });
}

function productSearchByBrandOrGenerics(searchTerm) {
  return request(`${endPoint}/search-by-brand-generics`, {
    searchTerm,
  });
}

function productInquiry({
  searchTerm,
  message,
}) {
  return request(`${endPoint}/inquiry`, {
    searchTerms: searchTerm,
    message,
  });
}

export {
  categoryBanner,
  categoryList,
  productListByCategory,
  productListByPurchased,
  productSearchAll,
  productSearchByBrandOrGenerics,
  productInquiry,
};