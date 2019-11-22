import { AUTH_KEY } from "../../constants";

export default function () {
  const token = localStorage.getItem(AUTH_KEY);

  return Boolean(token);
}
