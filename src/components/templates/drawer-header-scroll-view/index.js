import React, {useState} from 'react';
import {StyleSheet, View, Animated, SafeAreaView} from 'react-native';
import StackHeaderComponent from '_organisms/stack-header';

const DrawerHeaderScrollView = (props) => {
  const HEADER_SCROLL_DISTANCE = 20;
  const TITLE_HEIGHT = 30;
  const [scrollY] = useState(new Animated.Value(0));

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.templateContainer}>
      <StackHeaderComponent
        noLeftComponent={props.noLeftComponent}
        leftComponentRequire={props.leftComponentRequire}
        title={props.title}
        titleOpacity={headerTitleOpacity}
        isDrawer={true}
      />
      <SafeAreaView>
        <Animated.Text style={[styles.viewTitle, {opacity: titleOpacity}]}>
          {props.title}
        </Animated.Text>
      </SafeAreaView>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={[props.style]}>
        <SafeAreaView
          style={[
            styles.childrenWrapper,
            {marginTop: TITLE_HEIGHT},
            props.style,
          ]}>
          {props.children}
        </SafeAreaView>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  templateContainer: {
    flex: 1,
  },
  viewTitle: {
    paddingLeft: 10,
    fontSize: 22,
    fontWeight: '700',
    position: 'absolute',
  },
  childrenWrapper: {
    flex: 1,
  },
});

export default DrawerHeaderScrollView;
