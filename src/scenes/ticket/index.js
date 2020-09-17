import React, {useRef} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import StackHeaderScrollView from '_components/templates/stack-header-scroll-view';
import ButtonComponent from '_atoms/button';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import actions from './actions';
import TicketDetails from '_organisms/ticket-details';
import {TERCIARY, WHITE} from '_styles/colors';

const TicketScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.ticket.currentTicket);
  const ticketStatus = useSelector((state) => state.ticket.currentTicketStatus);
  const latestTickets = useSelector((state) => state.ticket.latestTickets);
  const ticketCallNotifier = useRef();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        actions.currentTicket((data) => {
          dispatch(
            actions.latestTickets(data.me.currentTicket.service.branch.id),
          );
          dispatch(
            actions.subscribeTicketCall(
              data.me.currentTicket.id,
              (notifier) => {
                ticketCallNotifier.current = notifier;
              },
              (subscriptionEventData) => {
                dispatch(
                  actions.latestTickets(
                    subscriptionEventData.data.callTicket.service.branch.id,
                  ),
                );
              },
            ),
          );
        }),
      );
    }, []),
  );

  console.log(latestTickets);
  useFocusEffect(
    React.useCallback(() => {
      return function cleanup() {
        // dispatch(actions.unsubscribeTicket(ticketCallNotifier.current))
      };
    }, []),
  );

  const cancelTicket = () => {
    dispatch(
      actions.cancelTicket(ticket.id, () => {
        dispatch(actions.currentTicket());
        navigation.navigate('Home');
      }),
    );
  };

  const handleCheckIn = () => {
    dispatch(
      actions.checkIn(ticket?.id, () => {
        console.log('Foi aqui');
        dispatch(actions.currentTicket());
      }),
    );
  };

  let branchName = '';
  if (ticket) {
    branchName =
      ticket.service.branch.company.name + ' - ' + ticket.service.branch.name;
  }

  // console.log(ticket)
  let calledWarning = null;
  if (ticket && (ticket.status === 'called' || ticket.status === 'recalled')) {
    calledWarning = (
      <View style={styles.calledWarningContainer}>
        <Text style={styles.calledWarningText}>
          É a sua vez! Compareça ao guichê 1.
        </Text>
      </View>
    );
  }
  console.log(ticket);
  return (
    <View style={styles.viewContainer}>
      <StackHeaderScrollView
        title={branchName}
        style={styles.containerStyle}
        leftComponentRequire={require('_assets/images/header-icons/menu_black.png')}>
        {calledWarning}

        <TicketDetails
          ticket={ticket}
          ticketStatus={ticketStatus}
          handleCheckIn={handleCheckIn}
          latestTickets={latestTickets}
          checkIn={ticket?.booking?.checkIn}
        />
      </StackHeaderScrollView>
      {ticket && (
        <SafeAreaView style={styles.actionsContainer}>
          <ButtonComponent
            title="Sair da fila"
            redTheme
            onPress={cancelTicket}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  calledWarningContainer: {
    borderRadius: 12,
    backgroundColor: TERCIARY,
    padding: 10,
    margin: 10,
  },
  calledWarningText: {
    color: WHITE,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default TicketScreen;
