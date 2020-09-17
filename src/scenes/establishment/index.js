import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import StackHeaderScrollView from '_components/templates/stack-header-scroll-view';
import {padding, margin, WINDOW_WIDTH} from '_styles/mixins';
import {BORDER_RADIUS} from '_styles/theme';
import {GRAY_LIGHT, SECONDARY} from '_styles/colors';
import GoogleStaticMap from 'react-native-google-static-map';
import ButtonComponent from '_atoms/button';
import {useDispatch, useSelector} from 'react-redux';
import actions from './actions';
import ticketActions from '_scenes/ticket/actions';
import moment from 'moment';
import ServiceSelector from '_organisms/service-selector';

const EstablishmentScreen = ({navigation, route: {params}}) => {
  const {branchId} = params;
  const dispatch = useDispatch();
  const modalizeRef = useRef(null);
  const branch = useSelector((state) => state.establishment.branch);
  // const branchStatus = useSelector((state) => state.establishment.branchStatus);
  let ticketNotifier = useRef();
  const currentTicket = useSelector((state) => state.ticket.currentTicket);
  const [ticketType, setTicketType] = useState();

  const openServicesModal = (ticketType) => {
    setTicketType(ticketType);
    modalizeRef.current?.open();
  };

  const handleGetInLine = (serviceId) => {
    dispatch(
      actions.createTicket(
        serviceId,
        ticketType,
        () => {
          navigation.navigate('Ticket');
        },
        () => {
          navigation.navigate('Ticket');
        },
      ),
    );
  };

  useEffect(() => {
    dispatch(ticketActions.currentTicket());
    dispatch(actions.getBranchDetails(branchId));
    dispatch(
      actions.subscribeTicket(branchId, (notifier) => {
        ticketNotifier.current = notifier;
      }),
    );
  }, []);

  useEffect(() => {
    return function cleanup() {
      dispatch(actions.unsubscribeTicket(ticketNotifier.current));
    };
  }, []);

  if (!branch) {
    return null;
  }

  return (
    <View style={styles.viewContainer}>
      <StackHeaderScrollView
        title={branch.company.name + ' - ' + branch.name}
        style={styles.containerStyle}
        leftComponentRequire={require('_assets/images/header-icons/menu_black.png')}>
        <View style={styles.container}>
          <View style={styles.basicInfo}>
            <Text>Saudável - Leblon - 0,9 km</Text>
            <Text>4,3 (166)</Text>
          </View>
          {branch.services.map((service) => (
            <View style={styles.serviceContainer} key={service.id}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <View style={styles.waitingTimeContainer}>
                <View style={styles.waitingTimeWrapper}>
                  <Text style={styles.waitingTimeDescription}>
                    Tempo de espera
                  </Text>
                  <Text style={styles.waitingTime}>
                    {service.waitingTime} min
                  </Text>
                </View>
                <View style={styles.waitingTimeWrapper}>
                  <Text style={styles.waitingTimeDescription}>
                    Próximo Fastpass
                  </Text>
                  <Text style={styles.waitingTime}>
                    {moment(
                      service.nextFastPassPeriod.minimumArrivalTime,
                    ).format('LT') +
                      ' - ' +
                      moment(
                        service.nextFastPassPeriod.maximumArrivalTime,
                      ).format('LT')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <GoogleStaticMap
            style={styles.map}
            latitude={branch.latitude}
            longitude={branch.longitude}
            zoom={15}
            size={{width: WINDOW_WIDTH - 20, height: 200}}
            
          />
        </View>
      </StackHeaderScrollView>
      {currentTicket == null && (
        <SafeAreaView style={styles.actionsContainer}>
          <ButtonComponent
            title="Agendar Fastpass"
            redTheme
            onPress={() => openServicesModal('booking')}
          />
          <ButtonComponent
            title="Entrar na fila"
            redTheme
            onPress={() => openServicesModal('ticket')}
          />
        </SafeAreaView>
      )}
      {/* Botar isso em outro component */}
      <ServiceSelector
        modalizeRef={modalizeRef}
        handleGetInLine={handleGetInLine}
        branch={branch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    ...padding(0, 10, 0, 10),
  },
  basicInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceContainer: {
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: GRAY_LIGHT,
    width: '100%',
    padding: 10,
    ...margin(10, 0, 0, 0),
    // backgroundColor: SECONDARY
  },
  serviceName: {
    fontWeight: '700',
  },
  waitingTimeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  waitingTime: {
    fontWeight: '700',
    fontSize: 18,
    color: SECONDARY,
  },
  map: {
    ...margin(10, 0, 10, 0),
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
});

export default EstablishmentScreen;
