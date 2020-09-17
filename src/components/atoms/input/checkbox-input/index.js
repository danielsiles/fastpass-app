import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import {
  View, StyleSheet, Text, Image
} from 'react-native'
import actions from '_atoms/input/actions'
import { GRAY_DARK, RED } from '_styles/colors';
import CheckBox from 'react-native-check-box'
import CheckboxComponent from '_atoms/input/checkbox-input/checkbox';

const CheckboxInputComponent = (props) => {
  const [showError, setShowError] = useState(false)

  const label = props.label ? <Text style={[styles.labelStyle]}>
    {props.label}
  </Text> : <View style={{ marginBottom: 10 }} />

  useEffect(() => {
    if (props.errorMsg && props.errorMsg.length > 0) {
      setShowError(true)
    }
  }, [props.errorMsg])

  let errorLabel = null;
  let errorIcon = null;
  if (showError) {
    errorLabel = <Text style={[styles.errorMsgStyle]}>
      {props.errorMsg}
    </Text>

    errorIcon = <Image
      source={require('_assets/images/input/error.png')}
      style={styles.errorIcon}
    />
  }

  return <View style={{ position: 'relative' }}>
    {label}
    <View>
      {
        props.checkboxProps.map((obj, i) => (
          <CheckboxComponent
            inputName={props.inputName}
            label={obj.label}
            formName={props.formName}
            value={obj.value}
          />
        ))
      }
    </View>
    {errorIcon}
    {errorLabel}
  </View>
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 14,
    color: GRAY_DARK,
    zIndex: 3,
    marginBottom: 10,
    marginTop: 10,
  },
  errorMsgStyle: {
    color: RED,
    marginTop: 5,
    width: '100%',
    textAlign: 'right'
  },
  errorIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 30
  }

})

export default CheckboxInputComponent;