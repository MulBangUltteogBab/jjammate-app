import showToast from '../utils/Toast';
import http from '../utils/http';

export const loginPost = async (json: any) => {
  try {
    await http.post('/common/api/login/', json);
    return true;
  } catch (err: any) {
    showToast(err.response.data.message, 'error');
    return false;
  }
};
