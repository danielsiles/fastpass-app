import React, { useCallback, MutableRefObject } from 'react'

/** Based on https://github.com/facebook/react/issues/13029#issuecomment-497641073 */
export function useCombinedRefs(...refs) {
  return useCallback(
    (element) =>
      refs.forEach(ref => {
        if (!ref) {
          return
        }

        // Ref can have two types - a function or an object. We treat each case.
        if (typeof ref === 'function') {
          return ref(element)
        }

        // As per https://github.com/facebook/react/issues/13029
        // it should be fine to set current this way.
        // eslint-disable-next-line no-param-reassign
        (ref).current = element
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  )
}