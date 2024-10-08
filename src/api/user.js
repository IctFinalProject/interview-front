// src/api/user.js
import axios from './axios';

const baseUrl = "/api/auth";

export const singUp = (singUpData) => {
    return axios.post(baseUrl + "/user", singUpData).then(res => {
        return res;
    });
}

export const login = async (loginData, authStore, userStore) => {  // authStore를 인자로 받음
  const response = await axios.post("/login", loginData, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
  const token = response.headers['authorization'] || response.headers['Authorization'];
  if (token) {
    const pureToken = token.split(' ')[1];
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', pureToken);
      localStorage.setItem('isAdmin', response.data.isAdmin);
      localStorage.setItem('refresh', response.data.refresh);
      userStore.setId(response.data.id);
      userStore.setEmail(response.data.username);
      userStore.setUsername(response.data.name);
      userStore.setAddress(response.data.address);
      userStore.setGender(response.data.gender);
      userStore.setBirth(response.data.birth);
      userStore.setPhone(response.data.phone);
      authStore.setIsAdmin(response.data.isAdmin);
      authStore.setLoggedIn(response.data.status == 200 ? true : false);
    }
  }
  return response.data;
};

export const logout = async (authStore, userStore, mqttStore) => {
  return axios.post("/logout").then(res =>{
    localStorage.clear(); // 로컬 스토리지 비우기
    authStore.setLoggedIn(false);
    userStore.setEmail('');
    userStore.setUsername('');
    userStore.setAddress('');
    userStore.setGender('');
    userStore.setBirth('');
    userStore.setPhone('');
    userStore.setProfile('');
    userStore.setId('');
    mqttStore.setMqttClient('');
    return res
  });
};


export const getProfileImage = async (email, userStore) => {
  try {
    const response = await axios.get(`${baseUrl}/profile-image`, {
      params: { email },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      userStore.setProfile(response.data); // 프로필 이미지를 userStore에 저장
      return response.data;  // 성공시 profile URL 반환
    }
  } catch (error) {
    console.error("프로필 이미지를 불러오는 중 오류가 발생했습니다:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await axios.get(`${baseUrl}/findAllUser`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return allUsers;
  } catch (error) {
    console.error("유저목록을 가져오는데 오류가 발생했습니다:", error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await axios.get(`${baseUrl}/findUserByEmail`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        email: email  // 이메일을 쿼리 파라미터로 전달
      }
    });
    return user;
  } catch (error) {
    console.error("유저 정보를 가져오는 데 오류가 발생했습니다:", error);
  }
};

export const editUser = async (editUserData) => {
  const res = await axios.post(baseUrl + "/edituser", editUserData);
  return res;
}

export const paymentCheck = async (orderId, paymentKey, amount, id) => {
  const res = await axios.post(baseUrl + "/paymentCheck", null, {
    params: {
      orderId: orderId,
      paymentKey: paymentKey,
      amount: amount,
      id: id
    }
  });
  return res;
}

export const cancelPayment = async (selectedPaymentKey, refundReason) => {
  const res = await axios.post(baseUrl + "/paymentCancel", null, {
      params: {
        paymentKey: selectedPaymentKey,
        cancelReason: refundReason
      }
  });
  return res;
}

export const getPayInfoByUserId = async (id) => {
  try {
    const user = await axios.get(`${baseUrl}/findPaymentInfoById`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        id: id  // 아이디를 쿼리 파라미터로 전달
      }
    });
    return user;
  } catch (error) {
    console.error("결제 정보를 가져오는 데 오류가 발생했습니다:", error);
  }
};

export const getAllPayInfo = async () => {
  try {
    const user = await axios.get(`${baseUrl}/findAllPaymentInfo`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return user;
  } catch (error) {
    console.error("결제 정보를 가져오는 데 오류가 발생했습니다:", error);
  }
};

export const getAllRefundInfo = async () => {
  try {
    const user = await axios.get(`${baseUrl}/findAllRefundInfo`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return user;
  } catch (error) {
    console.error("결제 정보를 가져오는 데 오류가 발생했습니다:", error);
  }
};