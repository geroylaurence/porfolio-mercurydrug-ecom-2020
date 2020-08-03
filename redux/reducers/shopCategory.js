import {
  SET_SELECTED_CATEGORY,
  SET_SELECTED_CATEGORY_ONSUCCESS_CATEGORY_LIST,

  CATEGORY_LIST_LOADING,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_ERROR,

  SET_CATEGORY_BANNER_TOP,
  SET_CATEGORY_BANNER_BOTTOM,
} from '../actions/shopCategory';

const initialState = {
  loading: false,
  data: null,
  dataMappedBottomLevel: null,
  error: null,
  selectedCategory: null,
  bannerTop: null,
  bannerBottom: null,
};

function categoryDataMapping({
  categoryKey,
  name,
  isMainCategory,
  isFeatured,
  lastEditedDate,
  mainCategoryId,
  categoryId,
  productsPerPage,
}) {
  return {
    categoryKey,
    name,
    isMainCategory,
    isFeatured,
    lastEditedDate,
    mainCategoryId,
    categoryId,
    productsPerPage,
  };
}

function categoryBannerMapping({
  id,
  type,
  imageFile,
  referenceId,
  linkUrl,
  position,
}) {
  return {
    id,
    type,
    imageFile,
    referenceId,
    linkUrl,
    position,
  }
}

function shopCategory(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_CATEGORY: {
      const {
        categoryKey,
        name,
        isMainCategory,
        isFeatured,
      } = action.data;

      return {
        ...state,
        selectedCategory: {
          categoryKey,
          name,
          isMainCategory,
          isFeatured,
        },
      };
    }
    case SET_SELECTED_CATEGORY_ONSUCCESS_CATEGORY_LIST: {
      let categoryId = action.data ? `${action.data}` : `12`;

      let updatedData = null;
      let findCategoryById = state.data.find(item => `${item.categoryId}` === categoryId);
      if (findCategoryById) {
        const {
          categoryKey,
          name,
          isMainCategory,
          isFeatured,
        } = findCategoryById;
        updatedData = {
          categoryKey,
          name,
          isMainCategory,
          isFeatured,
        };
      }

      return {
        ...state,
        selectedCategory: updatedData
      };
    }
    case CATEGORY_LIST_LOADING: 
      return {
        ...state,
        loading: true,
        selectedCategory: null,
        error: null,
      };
    case CATEGORY_LIST_SUCCESS: {
      let categoryBottomLevel = [];
      let chainMapCategory = (({
        subCategories,
        ...otherProps
      }) => {
        if (subCategories && subCategories !== null && subCategories.length > 0) {
          subCategories.forEach(chainMapCategory);
        } else {
          // categoryBottomLevel = [
          //   ...categoryBottomLevel, 
          //   categoryDataMapping(otherProps)
          // ];
          categoryBottomLevel.push(categoryDataMapping(otherProps));
        }
      });
      action.data.forEach(chainMapCategory);

      return {
        ...state,
        loading: false,
        data: action.data,
        dataMappedBottomLevel: categoryBottomLevel,
      };
    }
    case CATEGORY_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SET_CATEGORY_BANNER_TOP: {
      return {
        ...state,
        bannerTop: action.data.map(categoryBannerMapping)
      }
    };
    case SET_CATEGORY_BANNER_BOTTOM: {
      return {
        ...state,
        bannerBottom: action.data.map(categoryBannerMapping)
      }
    };

    default: 
      return state; 
  }
}

export default shopCategory;