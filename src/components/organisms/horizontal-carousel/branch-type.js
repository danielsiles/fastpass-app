import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {BORDER_RADIUS} from '_styles/theme';
import {TERCIARY, WHITE} from '_styles/colors';
import {enumToText} from '_utils/enumUtil';

const BranchType = ({type, color, icon, handlePress, branchFilter}) => {
  const selected =
    branchFilter === type ? (
      <View style={[styles.selected, {borderColor: color}]} />
    ) : null;
  return (
    <TouchableWithoutFeedback
      style={styles.establishmentTypeContainer}
      onPress={() => handlePress(type, color)}>
      <View style={[styles.iconWrapper, {backgroundColor: color}]}>
        {selected}
        <Image style={styles.icon} source={icon} />
      </View>
      <Text>{enumToText(type)}</Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  establishmentTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    height: 80,
    width: 120,
    margin: 5,
    // borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TERCIARY,
  },
  icon: {
    resizeMode: 'contain',
    height: 70,
    width: 110,
  },
  selected: {
    position: 'absolute',
    height: 20,
    width: 20,
    backgroundColor: WHITE,
    top: 0,
    left: 0,
    borderBottomRightRadius: 40,
    borderWidth: 1,
  },
});

export default BranchType;
