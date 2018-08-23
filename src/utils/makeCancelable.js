// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
// with some improvements
const makeCancelable = (promise) => {
  let hasCanceled_ = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    )
  })

  return {
    promise: wrappedPromise,

    then(cb) {
      wrappedPromise.then(cb)
    },

    cancel() {
      hasCanceled_ = true
    },
  }
}

export default makeCancelable
