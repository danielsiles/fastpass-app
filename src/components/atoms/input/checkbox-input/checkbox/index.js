import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import {
  View, StyleSheet, Text,
} from 'react-native'
import actions from '_atoms/input/actions'
import { GRAY_DARK, PRIMARY } from '_styles/colors';
import CheckBox from 'react-native-check-box'

const CheckboxComponent = (props) => {
  const state = useSelector(state => state.input[props.formName])
  const value = useSelector(state => {
    return state.input[props.formName] ? state.input[props.formName][props.inputName] : []
  });

  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    if (value && value.includes(props.value)) {
      setChecked(true)
    }
    else {
      setChecked(false)
    }
  }, [value])

  const dispatch = useDispatch();

  const _handleInputChange = () => {
    let newState = Object.assign([], value);
    if (newState && newState.length > 0) {
      if (newState.includes(props.value)) {
        dispatch(actions.inputChange(props.formName, props.inputName, newState.filter(ele => ele != props.value)))
      }
      else {
        newState.push(props.value)
        dispatch(actions.inputChange(props.formName, props.inputName, newState))
      }
    }
    else {
      dispatch(actions.inputChange(props.formName, props.inputName, [props.value]))
    }

  }

  return <View>
    <CheckBox
      style={{ paddingBottom: 5, }}
      onClick={_handleInputChange}
      isChecked={isChecked}
      rightText={props.label}
      rightTextStyle={{ color: 'black' }}
      checkedCheckBoxColor={PRIMARY}
      uncheckedCheckBoxColor={PRIMARY}
    />
  </View>
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    color: GRAY_DARK,
    zIndex: 3,
    marginBottom: 10,
    marginTop: 10,
  }

})

export default CheckboxComponent;