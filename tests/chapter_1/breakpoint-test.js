import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [

    // ! NEED TO STOP MANUALLY
    {
      duration: '2h',
      target: 10000
    }
  ]
};

export default function () {
  http.get('https://test.k6.io/');
  sleep(1);
}