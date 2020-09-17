import React from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {FONT_SIZE_12} from '_styles/typography';
import {
  PRIMARY,
  WHITE,
  RED_DARK,
  PRIMARY_LIGHT,
  FACEBOOK,
} from '_styles/colors';

const buttonThemeStyle = (props) => {
  if (props.primaryTheme) {
    return {
      buttonStyle: {
        backgroundColor: PRIMARY,
      },
      titleStyle: {
        color: WHITE,
      },
    };
  } else if (props.primaryAlternativeTheme) {
    return {
      buttonStyle: {
        backgroundColor: WHITE,
        borderColor: PRIMARY,
        borderWidth: 1,
      },
      titleStyle: {
        color: PRIMARY,
      },
    };
  } else if (props.primaryLightTheme) {
    return {
      buttonStyle: {
        backgroundColor: PRIMARY_LIGHT,
      },
      titleStyle: {
        color: PRIMARY,
      },
    };
  } else if (props.redTheme) {
    return {
      buttonStyle: {
        backgroundColor: RED_DARK,
      },
      titleStyle: {
        color: WHITE,
      },
    };
  } else if (props.alternativeRedTheme) {
    return {
      buttonStyle: {
        borderColor: RED_DARK,
        borderWidth: 1,
        backgroundColor: 'rgba(255,0,0,0.25)',
      },
      titleStyle: {
        color: RED_DARK,
      },
    };
  } else if (props.facebookTheme) {
    return {
      buttonStyle: {
        backgroundColor: FACEBOOK,
      },
      titleStyle: {
        color: WHITE,
      },
    };
  } else {
    return {
      buttonStyle: {},
      titleStyle: {},
    };
  }
};

const ButtonComponent = (props) => {
  const buttonTheme = buttonThemeStyle(props);

  const handleButtonPress = () => {
    if (!props.loading) {
      props.onPress ? props.onPress() : null;
    }
  };

  return (
    <Button
      containerStyle={[styles.containerStyle, props.containerStyle]}
      buttonStyle={[
        styles.buttonStyle,
        buttonTheme.buttonStyle,
        props.buttonStyle,
      ]}
      titleStyle={[styles.titleStyle, buttonTheme.titleStyle, props.titleStyle]}
      onPress={handleButtonPress}
      title={props.title}
      loading={props.loading}
      loadingProps={buttonTheme.titleStyle}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 0,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  buttonStyle: {
    height: 40,
    minWidth: 160,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: FONT_SIZE_12,
    fontWeight: '700',
  },
});

export default ButtonComponent;
