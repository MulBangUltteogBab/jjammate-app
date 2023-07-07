import showToast from '../utils/Toast';
import http from '../utils/http';

export const registerPost = async (json: any) => {
  try {
    if (json.passwordConfirm) {
      delete json.passwordConfirm;
    }
    await http.post('/common/api/register/', json);
    return true;
  } catch (err: any) {
    showToast(err.response.data.message, 'error');
    return false;
  }
};
