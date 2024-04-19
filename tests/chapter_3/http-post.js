import http from 'k6/http';
import { check } from 'k6';

export default function () {

  const credentials = {
    "username": "test_" + Date.now(),
    "password": "secret_" + Date.now()
  };

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  http.post('https://test-api.k6.io/user/register/', JSON.stringify(credentials), params);

  const body = JSON.stringify({
    "username": credentials.username,
    "password": credentials.password,
  });

  let res = http.post('https://test-api.k6.io/auth/token/login/', body, params);

  const access = res.json().access;

  console.log("This is the access token: " + access);

  res = http.get('https://test-api.k6.io/my/crocodiles/', {
    headers: {
      'Authorization': 'Bearer ' + access
    }
  });

  console.log(res.json().body);

  const body2 = JSON.stringify({
    "name": "Titus",
    "sex": "M",
    "date_of_birth": "1999-12-12"
  });

  const params2 = {
    headers: {
      'Authorization': 'Bearer ' + access,
      'Content-Type': 'application/json'
    }
  };

  res = http.post('https://test-api.k6.io/my/crocodiles/', body2, params2);

  const crocodileId = res.json().id;

  console.log("This is the ID: " + crocodileId);

  res = http.get(`https://test-api.k6.io/my/crocodiles/${crocodileId}/`, {
    headers: {
      'Authorization': 'Bearer ' + access
    }
  });

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Crocodile name is Titus': (r) => r.json().name === 'Titus'
  });
}