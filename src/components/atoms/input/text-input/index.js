import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, TextInput, Text, Image} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import actions from '_atoms/input/actions';
import {PRIMARY, GRAY_DARK, RED} from '_styles/colors';

const TextInputComponent = (props) => {
  const value = useSelector((state) => {
    return state.input[props.formName]
      ? state.input[props.formName][props.inputName]
      : '';
  });
  const dispatch = useDispatch();
  const [isFocused, setFocused] = useState(false);
  const [, setFilled] = useState(false);
  const [showError, setShowError] = useState(false);
  // let inputRef = useRef(null);

  useEffect(() => {
    if (props.errorMsg && props.errorMsg.length > 0) {
      setShowError(true);
    }
  }, [props.errorMsg]);

  const _handleInputChange = (text) => {
    setShowError(false);
    dispatch(actions.inputChange(props.formName, props.inputName, text));
    if (text === '') {
      setFilled(false);
    } else {
      setFilled(true);
    }
  };

  const inputFocusedStyle = {
    borderColor: isFocused ? PRIMARY : GRAY_DARK,
  };

  const labelFocusedStyle = {
    color: isFocused ? PRIMARY : GRAY_DARK,
  };

  let inputErrorStyle = props.errorMsg
    ? {
        borderColor: showError ? RED : GRAY_DARK,
      }
    : {};

  let labelErrorStyle = props.errorMsg
    ? {
        color: showError ? RED : GRAY_DARK,
      }
    : {};

  const _renderMaskComponent = () => {
    if (props.mask) {
      return (
        <TextInputMask
          value={value}
          // ref={(ref) => (inputRef = ref)}
          {...props}
          style={[styles.inputStyle, inputFocusedStyle, inputErrorStyle]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={_handleInputChange}
          placeholder={props.placeholder}
          blurOnSubmit
          type={'custom'}
          options={{
            /**
             * mask: (String | required | default '')
             * the mask pattern
             * 9 - accept digit.
             * A - accept alpha.
             * S - accept alphanumeric.
             * * - accept all, EXCEPT white space.
             */
            mask: props.mask,
          }}
        />
      );
    } else {
      return (
        <TextInput
          value={value}
          // ref={(ref) => (inputRef = ref)}
          {...props}
          style={[styles.inputStyle, inputFocusedStyle, inputErrorStyle]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChangeText={_handleInputChange}
          placeholder={props.placeholder}
          blurOnSubmit
        />
      );
    }
  };

  let errorLabel = null;
  let errorIcon = null;
  if (showError) {
    errorLabel = <Text style={[styles.errorMsgStyle]}>{props.errorMsg}</Text>;

    errorIcon = (
      <Image
        source={require('_assets/images/input/error.png')}
        style={styles.errorIcon}
      />
    );
  }

  return (
    <View style={[styles.containerStyle, labelFocusedStyle, props.style]}>
      <Text style={[styles.labelStyle, labelFocusedStyle, labelErrorStyle]}>
        {props.label}
      </Text>
      <View style={styles.inputWrapper}>
        {_renderMaskComponent()}
        {errorIcon}
      </View>

      {errorLabel}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    // height: 67.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    height: 40,
    fontSize: 14,
    color: GRAY_DARK,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: GRAY_DARK,
    position: 'relative',
  },
  labelStyle: {
    // position: 'absolute',
    // top: !isFocused && !isFilled ? 9 : 0,
    // fontSize: !isFocused && !isFilled ? 16 : 12,
    fontSize: 14,
    color: GRAY_DARK,
    zIndex: 3,
  },
  errorMsgStyle: {
    color: RED,
    marginTop: 5,
    width: '100%',
    textAlign: 'right',
  },
  errorIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // flex: 1,
    position: 'absolute',
    right: 0,
    // bottom: 40
  },
});

export default TextInputComponent;
