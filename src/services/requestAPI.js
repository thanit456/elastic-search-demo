import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:9100/api",
  proxyHeaders: false,
  credentials: true,
  crossdomain: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosClient = {
  method: null,
  url: null,
  data: {},
};

export const requestAPI = (args) =>
  new Promise((resolve, reject) => {
    AxiosClient = { ...AxiosClient, ...args };
    AxiosClient.data = args.body;
    AxiosInstance.request(AxiosClient)
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });
