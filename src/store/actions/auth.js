import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const fetchUserDataStart = () => {
  return {
    type: actionTypes.FETCH_USER_DATA_START,
  };
};

export const fetchUserDataSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    userData: userData,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup, userData = null) => {
  return (dispatch) => {
    dispatch(authStart());
    const api_key = "AIzaSyA9DzyeqeO-_ij9twoBunZFd8BEXirRxBE";
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`;
    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        if (isSignup && userData) {
          dispatch(saveAuthData(response.data.localId, userData));
        }
        dispatch(fetchUserData(response.data.localId));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const saveAuthData = (userId, userData) => {
  console.log(userData);
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/user/${userId}`, userData)
      .then((resp) => {
        console.log(resp);
      });
  };
};

export const fetchUserData = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserDataStart());
    axios.get(`http://localhost:5000/user/${userId}`).then((resp) => {
      dispatch(fetchUserDataSuccess(resp.data));
    });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(fetchUserData(userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const googleAuth = () => {
  return (dispatch) => {
    dispatch(authStart());
    axios.get("http://localhost:5000/auth/user").then((resp) => {
      if (resp.data.user) {
        const expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        console.log(resp.data.user);
        localStorage.setItem("token", resp.data.cookie.session);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem('userId', resp.data.user.id);
        dispatch(authSuccess(resp.data.cookie.session, resp.data.user.id));
        dispatch(checkAuthTimeout(24 * 60 * 60));
        dispatch(fetchUserData(resp.data.user.id));
      }
    });
  };
};

