import { USER_ID_KEY } from "../../constants";

export default function () {
  return Boolean(localStorage.getItem(USER_ID_KEY));
}
