export const reduceAction = (
  action,
  dataStatusName,
  dataName,
  valueName = 'data',
) => {
  return {
    [action + '_FETCHING']: (state, action) => {
      state[dataStatusName] = 'FETCHING';
    },
    [action + '_SUCCEEDED']: (state, action) => {
      if (Array.isArray(dataName)) {
        for (let i = 0; i < dataName.length; i++) {
          state[dataName[i].data] =
            action.payload[valueName][dataName[i].value];
        }
      } else if (dataName) {
        state[dataName] = action.payload[valueName];
      }
      state[dataStatusName] = 'SUCCEEDED';
    },
    [action + '_FAILED']: (state, action) => {
      state[dataStatusName] = 'FAILED';
    },
  };
};

export const reduceSubscription = (
  action,
  notifierName,
  dataName,
  valueName = 'data',
) => {
  return {
    [action + '_SUBSCRIBE']: (state, action) => {
      state[notifierName] = action.payload;
    },

    [action + '_UNSUBSCRIBE']: (state, action) => {
      // state[notifierName] = action.payload
    },
  };
};

// [action + "_RESULT"]: (state, action) => {
//   // console.log('result', action.payload)
//   if (Array.isArray(dataName)) {
//     for (let i = 0; i < dataName.length; i++) {
//       state[dataName[i].data] = action.payload[valueName][dataName[i].value]
//     }
//   }
//   else if (dataName) {
//     state[dataName] = action.payload[valueName]
//   }
// },
