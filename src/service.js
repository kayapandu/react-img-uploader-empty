import axios from 'axios';

export function upload(str) {
  return axios.post(
    'https://api.jsonbin.io/b',
    {
      img: str
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'secret-key':
          '$2a$10$bMtNJ5..lMW4994WIeunpO6GnSaL4EIAGVraZBLdUtNXv03MdRrBe',
        private: false
      }
    }
  );
}

export function download(id) {
  return axios.get(`https://api.jsonbin.io/b/${id}`);
}
