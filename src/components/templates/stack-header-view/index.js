
import React from 'react';
import {
  SafeAreaView, ScrollView, View, StyleSheet,
} from 'react-native';
import StackHeaderComponent from '_organisms/stack-header';

const StackHeaderView = (props) => (
  <View style={{ flex: 1, }}>
    <StackHeaderComponent
      title={props.title}
      noLeftComponent={props.noLeftComponent}
    />
    <View style={props.style}>
      <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
        {props.children}
      </SafeAreaView>
    </View>
  </View>
);

const styles = StyleSheet.create({
});

export default StackHeaderView;