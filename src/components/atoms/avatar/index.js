import React from 'react';
import {Avatar} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const AvatarComponent = (props) => {
  return (
    <Avatar
      overlayContainerStyle={[
        {borderRadius: props.borderRadius},
        styles.containerStyle,
        props.containerStyle,
      ]}
      imageProps={{borderRadius: props.borderRadius}}
      containerStyle={props.style}
      size={props.size}
      rounded={props.rounded}
      source={props.source}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
  },
});

export default AvatarComponent;
