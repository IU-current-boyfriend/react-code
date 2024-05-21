
export const logActionThunk = (store) => {
  const storeDispatch = store.dispatch;
  const nextDispatch = (action) => {
    // action是函数的情况
    if (typeof (action) === 'function') return action(storeDispatch, store.getState);
    // action是对象的情况
    storeDispatch(action);
  }
  store.dispatch = nextDispatch;
};

export const logActionMiddleWare = (store) => {
  const storeDispatch = store.dispatch;
  const nextDispatch = ({ type, payload }) => {
    console.log('触发的行为类型' + type + ', 携带的参数', payload);
    storeDispatch({ type, payload });
    console.log('触发行为后的结果', store.getState());
  };
  store.dispatch = nextDispatch;
};
