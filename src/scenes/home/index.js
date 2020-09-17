import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import DrawerHeaderScrollView from '_components/templates/drawer-header-scroll-view';
import CardComponent from '_atoms/card';
import HorizontalCarousel from '_organisms/horizontal-carousel';
import {useSelector, useDispatch} from 'react-redux';
import actions from './actions';
import {padding} from '_styles/mixins';
import {enumToText} from '_utils/enumUtil';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.home.branches);
  const branchFilter = useSelector((state) => state.home.branchFilter);
  const branchColor = useSelector((state) => state.home.branchColor);
  const [latLng, setLatLng] = useState({});

  useEffect(() => {
    dispatch(actions.listBranches(latLng));
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setLatLng({latitude: coords.latitude, longitude: coords.longitude});
        dispatch(
          actions.listBranches({
            latitude: coords.latitude,
            longitude: coords.longitude,
          }),
        );
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, []);

  const filterBranch = (type, color) => {
    dispatch(actions.filterBranch(type, color));
  };

  const navigateToEstablishment = (branchId) => {
    navigation.navigate('Establishment', {
      branchId: branchId,
    });
  };

  if (!branches) {
    return null;
  }
  return (
    <View style={styles.viewContainer}>
      <DrawerHeaderScrollView
        title={enumToText(branchFilter) + 's'}
        style={styles.containerStyle}
        leftComponentRequire={require('_assets/images/header-icons/menu_black.png')}>
        <View style={styles.container}>
          <HorizontalCarousel
            onPress={filterBranch}
            branchFilter={branchFilter}
          />
          {branches
            .filter((branch) => branch.company.type === branchFilter)
            .map((branch) => {
              return (
                <CardComponent
                  key={branch.id}
                  containerStyle={styles.cardWrapper}
                  title={branch.company.name + ' - ' + branch.name}
                  subtitle={enumToText(branch.company.type)}
                  source={require('_assets/images/establishments/restaurant.png')}
                  backgroundImageStyle={styles.backgroundImageStyle}
                  color={branchColor}
                  onPress={() => navigateToEstablishment(branch.id)}
                />
              );
            })}
        </View>
      </DrawerHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    ...padding(0, 10, 0, 10),
  },
  backgroundImageStyle: {
    // height: 100
  },
  cardWrapper: {
    width: '100%',
    borderWidth: 1,
    marginTop: 10,
  },
});

export default HomeScreen;
