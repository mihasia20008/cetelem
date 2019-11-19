import { AUTH_KEY } from "../../constants";

export default function () {
  const authorized = localStorage.getItem(AUTH_KEY);

  return authorized === 'true';
}
