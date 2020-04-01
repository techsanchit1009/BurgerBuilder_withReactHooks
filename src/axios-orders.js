import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-myburger-b7ad9.firebaseio.com/'
});

export default instance;