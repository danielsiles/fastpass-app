import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WINDOW_HEIGHT} from '_styles/mixins';
import {Modalize} from 'react-native-modalize';
import ButtonComponent from '_atoms/button';

const ServiceSelector = ({modalizeRef, branch, handleGetInLine}) => {
  return (
    <Modalize ref={modalizeRef} modalHeight={(2 * WINDOW_HEIGHT) / 3}>
      <View style={styles.serviceSelectionContainer}>
        <Text style={styles.selectServiceText}>Selecione o serviço</Text>
        {branch.services.map((service) => (
          <ButtonComponent
            key={service.id}
            title={service.name}
            redTheme
            onPress={() => handleGetInLine(service.id)}
            containerStyle={styles.buttonContainer}
          />
        ))}
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  // MODALIZER
  serviceSelectionContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  selectServiceText: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonContainer: {width: '100%', marginTop: 10},
});

export default ServiceSelector;
