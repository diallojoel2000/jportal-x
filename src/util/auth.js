import { jwtDecode } from "jwt-decode";
import { AES, enc } from "crypto-js";

const PASSPHRASE = import.meta.env.VITE_ENCRYPTION_PASSPHRASE;
const KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const hasToken = () => {
  return getToken();
};

export const getUser = () => {
  return jwtDecode(getToken());
};

export const encrypt = (input) => {
  const passPhrase = enc.Utf8.parse(PASSPHRASE);
  const iv = enc.Utf8.parse(KEY);
  return AES.encrypt(input, passPhrase, { iv: iv }).toString();
};
