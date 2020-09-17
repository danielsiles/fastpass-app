import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {GRAY_MEDIUM} from '_styles/colors';
import {GRAY_DARK} from '_styles';

const StackHeaderComponent = (props) => {
  const navigation = useNavigation();
  const titleOpacity = props.titleOpacity ? props.titleOpacity : 1;
  const _leftNavigate = () => {
    if (props.leftNavigateTo) {
      navigation.navigate(props.leftNavigateTo);
    } else if (props.isDrawer) {
      navigation.toggleDrawer();
    } else {
      navigation.goBack();
    }
  };

  const _rightNavigate = () => {
    if (props.rightNavigateTo) {
      navigation.navigate(props.rightNavigateTo);
    } else {
      navigation.goBack();
    }
  };

  const leftComponent = () => {
    const source = props.leftComponentRequire
      ? props.leftComponentRequire
      : require('_assets/images/header-icons/back.png');
    if (!props.noLeftComponent) {
      return (
        <TouchableOpacity
          onPress={_leftNavigate}
          style={[styles.leftComponent]}>
          <Image style={styles.headerIcon} source={source} />
        </TouchableOpacity>
      );
    } else {
      return <View style={styles.leftComponent} />;
    }
  };

  const rightComponent = () => {
    if (props.rightComponentRequire) {
      return (
        <TouchableOpacity
          onPress={_rightNavigate}
          style={[styles.rightComponent]}>
          <Image
            style={styles.headerIcon}
            source={props.rightComponentRequire}
          />
        </TouchableOpacity>
      );
    } else {
      return <View style={styles.rightComponent} />;
    }
  };

  const middleComponent = () => {
    if (props.middleComponentRequire) {
      return (
        <Image
          style={styles.middleIcon}
          source={props.middleComponentRequire}
        />
      );
    } else {
      return (
        <Animated.Text style={[styles.headerTitle, {opacity: titleOpacity}]}>
          {props.title}
        </Animated.Text>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.containerStyle}>
        {leftComponent()}
        {middleComponent()}
        {rightComponent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    // backgroundColor: PRIMARY,
    // borderBottomWidth: 1,
    borderColor: GRAY_MEDIUM,
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftComponent: {
    flex: 1,
    paddingLeft: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerIcon: {
    height: 20,
    resizeMode: 'contain',
    width: 20,
  },
  rightComponent: {
    flex: 1,
    paddingRight: 10,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 6,
    textAlign: 'center',
    color: GRAY_DARK,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default StackHeaderComponent;
