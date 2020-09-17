import React from 'react';
import {View, StyleSheet} from 'react-native';
import {padding} from '_styles/mixins';
import {ScrollView} from 'react-native-gesture-handler';
import {TERCIARY, ORANGE, RED} from '_styles/colors';
import BranchType from './branch-type';

const HorizontalCarousel = (props) => {
  const {onPress, branchFilter} = props;

  const handlePress = (type, color) => onPress(type, color);

  return (
    <View style={styles.containerStyle}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <BranchType
          branchFilter={branchFilter}
          type="RESTAURANT"
          color={RED}
          handlePress={handlePress}
          icon={require('_assets/images/home/restaurant.png')}
        />
        <BranchType
          branchFilter={branchFilter}
          type="BANK"
          color={TERCIARY}
          handlePress={handlePress}
          icon={require('_assets/images/home/bank.png')}
        />
        <BranchType
          branchFilter={branchFilter}
          type="POST_OFFICE"
          color={ORANGE}
          handlePress={handlePress}
          icon={require('_assets/images/home/post_office.png')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    ...padding(10, 0, 10, 0),
    flexDirection: 'row',
  },
  balanceExplanationTextStyle: {
    padding: 20,
    textAlign: 'center',
  },
});

export default HorizontalCarousel;
