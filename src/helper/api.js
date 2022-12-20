import Axios from 'axios';

const apiHelper = Axios.create({
  baseURL: 'https://6398216bfe03352a94c5a9f4.mockapi.io/api/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export default apiHelper;
