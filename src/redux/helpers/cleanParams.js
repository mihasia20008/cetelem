import _pick from "lodash/pick";

const availableParams = ['page', 'per_page', 'sort', 'order', 'query'];

export default function cleanParams(query) {
  return _pick(query, availableParams);
}
