export default function formatDate(dateText, withTime = true) {
  const dateInstance = new Date(dateText);

  // eslint-disable-next-line eqeqeq
  if (!(dateInstance instanceof Date) || dateInstance == 'Invalid Date') {
    return dateText;
  }

  const day = dateInstance
    .getDate()
    .toString()
    .padStart(2, '0');
  const month = (dateInstance.getMonth() + 1).toString().padStart(2, '0');
  const date = `${day}.${month}.${dateInstance.getFullYear()}`;

  if (!withTime) {
    return date;
  }

  const hours = dateInstance.getHours().toString().padStart(2, '0');
  const minutes = dateInstance.getMinutes().toString().padStart(2, '0');
  const seconds = dateInstance.getSeconds().toString().padStart(2, '0');

  return `${date} ${hours}:${minutes}:${seconds}`;
}
