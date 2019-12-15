export default function allSettled(promises) {
  if (typeof Promise.allSettled !== 'function') {
    const wrappedPromises = promises.map(p => Promise.resolve(p)
      .then(
        val => ({ status: 'fulfilled', value: val }),
        err => ({ status: 'rejected', reason: err })));
    return Promise.all(wrappedPromises);
  }

  return Promise.allSettled(promises);
}
