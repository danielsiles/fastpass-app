import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import StackHeaderComponent from '_organisms/stack-header';
import ButtonComponent from '_atoms/button';
import {PRIMARY} from '_styles/colors';
import {WINDOW_WIDTH} from '_styles/mixins';

const RegisterView = (props) => {
  const progressBarWidth = WINDOW_WIDTH - 40;
  const [barWidth] = useState(
    new Animated.Value(progressBarWidth * (props.progress - 0.1)),
  );

  const _start = () => {
    Animated.timing(barWidth, {
      toValue: progressBarWidth * props.progress,
      duration: 1000,
    }).start();
  };

  useEffect(() => {
    _start();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <StackHeaderComponent
        title={props.title}
        noLeftComponent={props.noLeftComponent}
      />

      <KeyboardAvoidingView style={styles.viewContainer} behavior="padding">
        <ScrollView
          style={props.style}
          contentContainerStyle={styles.scrollViewContainer}>
          <SafeAreaView style={styles.childrenWrapper}>
            {props.children}
          </SafeAreaView>
        </ScrollView>
        <SafeAreaView>
          <View style={styles.nextButtonContainer}>
            <ButtonComponent
              primaryTheme
              title="Próximo"
              containerStyle={styles.nextButton}
              onPress={props.onPress}
            />
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, {width: barWidth}]} />
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {flex: 1},
  nextButtonContainer: {
    position: 'relative',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor: 'rgba(255,255,255,0.3)',
    minHeight: 80,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  progressBarContainer: {
    width: WINDOW_WIDTH - 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PRIMARY,
    height: 10,
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  progressBar: {
    borderRadius: 20,
    height: 8,
    borderWidth: 0,
    backgroundColor: PRIMARY,
    position: 'absolute',
  },
  scrollViewContainer: {paddingBottom: 20},
  childrenWrapper: {flex: 1, paddingTop: 0},
});

export default RegisterView;
