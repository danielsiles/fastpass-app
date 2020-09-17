import React, { useState, useEffect } from 'react';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useSelector, useDispatch } from 'react-redux'
import {
  View, StyleSheet, Text, Image
} from 'react-native'
import actions from '_atoms/input/actions'
import { GRAY_DARK, PRIMARY, RED } from '_styles/colors';

const RadioInputComponent = (props) => {
  const [showError, setShowError] = useState(false)

  const value = useSelector(state => {
    return state.input[props.formName] ? state.input[props.formName][props.inputName] : ""
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.errorMsg && props.errorMsg.length > 0) {
      setShowError(true)
    }
  }, [props.errorMsg])

  const _handleInputChange = (text) => {
    setShowError(false)
    dispatch(actions.inputChange(props.formName, props.inputName, text))

  }

  const buttonWrapStyle = {
    marginRight: props.horizontal ? 0 : 10
  }

  const labelWrapStyle = {
    marginRight: props.horizontal ? 10 : 0
  }

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

  return <View>
    <Text style={[styles.labelStyle]}>
      {props.label}
    </Text>
    <View >
      <RadioForm
        formHorizontal={props.horizontal}
        animation={true}
        style={{ flexWrap: 'wrap' }}
      >

        {/* To create radio buttons, loop through your array of options */}
        {
          props.radioProps.map((obj, i) => (
            <RadioButton labelHorizontal={props.horizontal} key={i} >
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={value === obj.value}
                onPress={_handleInputChange}
                borderWidth={1}
                buttonInnerColor={PRIMARY}
                buttonOuterColor={PRIMARY}
                buttonSize={15}
                buttonOuterSize={25}
                buttonStyle={{}}
                buttonWrapStyle={buttonWrapStyle}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={props.horizontal}
                onPress={_handleInputChange}
                labelStyle={{ fontSize: 14, color: GRAY_DARK }}
                labelWrapStyle={labelWrapStyle}
              />
            </RadioButton>
          ))
        }
        {errorIcon}
      </RadioForm>
      {errorLabel}
    </View>

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
    // bottom: 40
  }

})

export default RadioInputComponent;