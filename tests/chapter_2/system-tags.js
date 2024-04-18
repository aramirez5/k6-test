import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    'http_req_duration{status:200}': ['p(95)<1000'],
    'http_req_duration{status:201}': ['p(95)<1000']
  }
}

export default function () {
  http.get('https://run.mocky.io/v3/da863da9-7e7b-410c-a2dd-a592beaa26f4');
  http.get('https://run.mocky.io/v3/9a10870f-a90d-46fc-9172-49d8283f63cd?mocky-delay=2000ms');
}
