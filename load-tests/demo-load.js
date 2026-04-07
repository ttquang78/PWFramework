import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  ext: {
    loadimpact: {
      projectID: 7202443, // Thay bằng ID project của bạn trên Grafana Cloud
      name: 'My Playwright-K6 Demo',
    },
  },
  stages: [
    { duration: '10s', target: 20 },
    { duration: '20s', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // Bước 1: Sửa thành test.k6.io
  const homeRes = http.get('https://k6.io');
  check(homeRes, {
    'homepage status is 200': (r) => r.status === 200,
  });
  sleep(1);

  // Bước 2: Thêm dấu / sau .io và dùng đúng domain test
  const apiRes = http.get('https://k6.iopublic/crocodiles/');
  check(apiRes, {
    'api status is 200': (r) => r.status === 200,
    'api data is valid': (r) => {
      try {
        const data = JSON.parse(r.body);
        return Array.isArray(data) && data.length > 0;
      } catch (e) {
        return false;
      }
    },
  });
  sleep(2);

  // Bước 3: Sửa URL login
  const loginData = { username: 'admin', password: '123' };
  const loginRes = http.post('https://k6.iologin/', loginData);
  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
