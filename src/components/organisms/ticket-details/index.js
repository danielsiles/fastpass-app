import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import GoogleStaticMap from 'react-native-google-static-map';
import moment from 'moment';

import {GOOGLE_API_KEY} from '../../../config';
import {padding, margin, WINDOW_WIDTH} from '_styles/mixins';
import {BORDER_RADIUS} from '_styles/theme';
import {GRAY_LIGHT, SECONDARY, WHITE} from '_styles/colors';
import {enumToText} from '_utils/enumUtil';
import ButtonComponent from '_atoms/button';

const TicketDetails = (props) => {
  const {ticket, ticketStatus, handleCheckIn, checkIn} = props;
  let latestTickets = props.latestTickets;
  const {booking} = ticket || {};
  const {minimumArrivalTime, maximumArrivalTime} = booking || {
    minimumArrivalTime: '',
    maximumArrivalTime: '',
  };
  let checkInButton = null;

  if (ticketStatus === 'FETCHING') {
    return <ActivityIndicator />;
  }

  if (minimumArrivalTime && maximumArrivalTime) {
    if (
      moment().isBetween(moment(minimumArrivalTime), moment(maximumArrivalTime))
    ) {
      if (!checkIn) {
        checkInButton = (
          <ButtonComponent
            containerStyle={styles.checkInButton}
            redTheme
            title="Fazer Check in"
            onPress={handleCheckIn}
          />
        );
      } else {
        checkInButton = (
          <Text>Check in realizado às {moment(checkIn).format('LT')}h</Text>
        );
      }
    } else if (!checkIn && moment().isAfter(moment(maximumArrivalTime))) {
      checkInButton = <Text>Seu ticket foi expirado e será cancelado.</Text>;
    }
  }

  if (ticket) {
    return (
      <View style={styles.container}>
        <View style={styles.basicInfo}>
          <Text>
            {enumToText(ticket.service.branch.company.type)} {'\u2022'}{' '}
            {ticket.service.branch.neighborhood} {'\u2022'} 0,9 km
          </Text>
          <Text>4,3 (166)</Text>
        </View>
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceName}>{ticket.service.name}</Text>
          <View style={styles.ticketInfoContainer}>
            <View style={styles.ticketNumberWrapper}>
              <Text style={styles.waitingTimeDescription}>
                Número do ticket
              </Text>
              <Text style={styles.ticketNumberText}>{ticket.ticketNumber}</Text>
            </View>
            {!ticket.isFastpass && (
              <View style={styles.waitingTimeContainer}>
                <Text style={styles.waitingTimeDescription}>
                  Tempo estimado
                </Text>
                <Text style={styles.waitingTime}>
                  {ticket.estimatedWaitingTime}
                </Text>
                <Text style={styles.waitingTimeUnit}>minutos</Text>
              </View>
            )}
            {ticket.isFastpass && (
              <View style={styles.waitingTimeContainer}>
                <Text style={styles.waitingTimeDescription}>
                  Faixa de horário
                </Text>
                <Text style={styles.timeSection}>
                  {moment(minimumArrivalTime).format('HH:mm')} -
                  {moment(maximumArrivalTime).format('HH:mm')}
                </Text>
              </View>
            )}
          </View>
        </View>
        {checkInButton}
        <View style={styles.latestTicketsContainer}>
          <Text style={styles.latestTicketsTitle}>Últimos tickets:</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.latestTicketsContainer}
            contentContainerStyle={styles.latestTicketsWrapper}
            horizontal={true}>
            {latestTickets &&
              latestTickets.length > 0 &&
              [].concat(latestTickets).map(({ticketNumber}) => (
                <View style={styles.latestTicketWrapper}>
                  <Text style={styles.latestTicket} key={ticketNumber}>
                    {ticketNumber}
                  </Text>
                </View>
              ))}
          </ScrollView>
        </View>
        <GoogleStaticMap
          style={styles.map}
          latitude={ticket.service.branch.latitude}
          longitude={ticket.service.branch.longitude}
          zoom={15}
          size={{width: WINDOW_WIDTH - 20, height: 200}}
          apiKey={GOOGLE_API_KEY}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Você não está em nenhuma fila.</Text>
    </View>
  );
};

export default TicketDetails;

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
  ticketInfoContainer: {
    flexDirection: 'row',
  },
  ticketNumberWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...margin(20, 0, 20, 0),
  },
  ticketNumberText: {
    fontSize: 40,
    color: SECONDARY,
  },
  waitingTimeContainer: {
    flex: 1,
    flexDirection: 'column',
    // width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...margin(20, 0, 20, 0),
    width: '100%',
  },
  waitingTimeDescription: {
    // fontSize: 40,
    // fontWeight: '700'
  },
  waitingTime: {
    fontSize: 40,
    // fontWeight: '700',
    color: SECONDARY,
  },
  timeSection: {
    fontSize: 25,
    // fontWeight: '700',
    color: SECONDARY,
  },
  waitingTimeUnit: {
    fontSize: 16,
    color: SECONDARY,
    fontWeight: '700',
  },
  map: {
    ...margin(10, 0, 0, 0),
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  latestTicketsContainer: {
    width: '100%',
    paddingTop: 10,
    flexGrow: 0,
    // paddingBottom: 10,
  },
  latestTicketsTitle: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'left',
    width: '100%',
  },
  latestTicketsWrapper: {
    flexDirection: 'row',
    // height: 50,
    flexGrow: 0,
  },
  latestTicketWrapper: {
    padding: 10,
    backgroundColor: SECONDARY,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 12,
  },
  latestTicket: {
    fontSize: 18,
    color: WHITE,
  },
  checkInButton: {
    width: '100%',
    marginTop: 10,
  },
});
