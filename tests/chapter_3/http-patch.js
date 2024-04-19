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

  const body3 = JSON.stringify({
    "date_of_birth": "1990-01-01"
  });

  const params3 = {
    headers: {
      'Authorization': 'Bearer ' + access,
      'Content-Type': 'application/json'
    }
  };

  http.patch(`https://test-api.k6.io/my/crocodiles/${crocodileId}/`, body3, params3);
}