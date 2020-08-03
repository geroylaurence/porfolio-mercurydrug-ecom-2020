import {
  CREATE_ACCOUNT_LOADING,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,

	LOGIN_ACCOUNT_LOADING,
  LOGIN_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT_ERROR,

  LOGOUT_ACCOUNT_LOADING,
  LOGOUT_ACCOUNT_SUCCESS,
  LOGOUT_ACCOUNT_ERROR,
  LOGOUT_ACCOUNT_TO_APP,

  VALIDATE_EMAIL_ACCOUNT_LOADING,
  VALIDATE_EMAIL_ACCOUNT_SUCCESS,
  VALIDATE_EMAIL_ACCOUNT_FAILED,

  CLEAR_ACCESS_ACCOUNT,
  CLEAR_CREATE_ACCOUNT_ERROR,
  CLEAR_LOGIN_ACCOUNT_ERROR,

  REQUEST_RESET_PASSWORD_LOADING,
  REQUEST_RESET_PASSWORD_SUCCESS,
  REQUEST_RESET_PASSWORD_ERROR,

  PROCESS_RESET_PASSWORD_LOADING,
  PROCESS_RESET_PASSWORD_SUCCESS,
  PROCESS_RESET_PASSWORD_ERROR,
} from '../actions/account';

const initialState = {
  loading: false,
  userData: null,
  accessToken: null,
  authenticated: false,
  verified: false,
  error: null,
  register: {
    loading: false,
    data: null,
    error: null,
  },
  login: {
    loading: false,
    data: null,
    error: null,
  },
  validateEmail: {
    loading: false,
    data: null,
    error: null,
  },
  resetPassword: {
    loading: false,
    data: null,
    error: null,
  },
  processResetPassword: {
    loading: false,
    data: null,
    successful: false,
    error: null,
  },
};

function account(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACCOUNT_LOADING: 
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          error: null,
        }
      };
    case LOGIN_ACCOUNT_SUCCESS:
      const userData = action.data;

      return {
        ...state,
        userData: userData,
        authenticated: true,
        verified: userData.isVerified,
        login: {
          ...state.login,
          loading: false,
          data: userData,
        },
      };
    case LOGIN_ACCOUNT_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: action.error,
        }
      };

    // LOGOUT ACCOUNT
    case LOGOUT_ACCOUNT_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case LOGOUT_ACCOUNT_SUCCESS: {
      if (typeof document !== undefined) {
        // remove accessToken
        document.cookie = 'accessToken=; expires=0; path=/';
      }
      return initialState;
    }
    case LOGOUT_ACCOUNT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    } 
    case LOGOUT_ACCOUNT_TO_APP: {
      if (typeof document !== undefined) {
        // remove accessToken
        document.cookie = 'accessToken=; expires=0; path=/';
      }
      return initialState;
    }

    // CREATE ACCOUNT
    case CREATE_ACCOUNT_LOADING: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
          error: null,
        }
      }
    }
    case CREATE_ACCOUNT_SUCCESS: {
      const userData = action.data;

      return {
        ...state,
        userData: userData,
        accessToken: userData.accessToken,
        authenticated: true,
        verified: userData.isVerified,
        register: {
          ...state.register,
          loading: false,
          data: userData,
        }
      };
    };
    case CREATE_ACCOUNT_ERROR: {
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: action.error,
        }
      };
    }

    case VALIDATE_EMAIL_ACCOUNT_LOADING: {
      return {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          loading: true,
          error: null,
        },
      };
    };
    case VALIDATE_EMAIL_ACCOUNT_SUCCESS: {
      const {
        email,
        validationSuccess,
        isVerified,
        message,
        invalidEmail,
      } = action.data;

      let updatedState = {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          loading: false,
          data: {
            email,
            validationSuccess,
            isVerified,
            message,
            invalidEmail,
          },
        },
      };

      if (state.authenticated) {
        updatedState = {
          ...updatedState,
          userData: {
            ...updatedState.userData,
            isVerified: isVerified,
          },
          verified: isVerified,
        }
      }

      return updatedState;
    };
    case VALIDATE_EMAIL_ACCOUNT_FAILED: {
      return {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          loading: false,
          error: action.error,
        },
      };
    };
    case REQUEST_RESET_PASSWORD_LOADING: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          loading: true,
          error: null,
        }
      };
    };
    case REQUEST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          loading: false,
          data: action.data,
        }
      };
    };
    case REQUEST_RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          loading: false,
          error: action.error,
        }
      };
    };

    /*process-reset-password*/
    case PROCESS_RESET_PASSWORD_LOADING: {
      return {
        ...state,
        processResetPassword: {
          ...state.processResetPassword,
          loading: true,
          error: null,
        }
      };
    }
    case PROCESS_RESET_PASSWORD_SUCCESS: {
      const resetPasswordData = action.data;

      return {
        ...state,
        processResetPassword: {
          ...state.processResetPassword,
          loading: false,
          data: action.data,
          successful: resetPasswordData.successful,
        },
      };
    };
    case PROCESS_RESET_PASSWORD_ERROR: {
      return {
        ...state,
        processResetPassword: {
          ...state.processResetPassword,
          loading: false,
          error: action.error,
        }
      };
    }

    case CLEAR_ACCESS_ACCOUNT:
      return initialState;
    case CLEAR_CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          error: null,
        },
      };
    case CLEAR_LOGIN_ACCOUNT_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: null,
        }
      }
    default:
      return state;
  }
}

export default account;