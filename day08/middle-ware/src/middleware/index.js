const applyMyMiddleware = (store, ...args) => {
  args.forEach(fn => fn(store));
}

export default applyMyMiddleware;