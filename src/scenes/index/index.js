import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import ButtonComponent from '_atoms/button';
import TitleComponent from '_atoms/title';
import SubtitleComponent from '_atoms/subtitle';
import {margin, padding} from '_styles/mixins';
import {SvgXml} from 'react-native-svg';
import indexImage from '_assets/images/index/mainImage.svg';
import {RED_DARK} from '_styles/colors';
// import logo from '_assets/images/logo/purple_logo.svg';

// import crashlytics from '@react-native-firebase/crashlytics'

const IndexScreen = ({navigation}) => {
  const _handleLoginButton = () => {
    navigation.navigate('Login');
  };

  const _handleRegisterButton = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.viewContainer}>
      <SafeAreaView style={styles.containerStyle}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logo}>FastPass</Text>
        </View>
        <View style={styles.mainImageWrapper}>
          <SvgXml xml={indexImage} width="100%" height="100%" fill="#fff" />
        </View>
        <View style={styles.infoContainer}>
          <TitleComponent h4>Seja bem-vindo!</TitleComponent>
          <SubtitleComponent h4 style={{...padding(10, 0, 10, 0)}}>
            Economize seu tempo na fila
          </SubtitleComponent>
          <View style={styles.buttonsContainerStyle}>
            <ButtonComponent
              containerStyle={styles.registerButton}
              redTheme
              title="Quero me cadastrar"
              onPress={_handleRegisterButton}
            />
            <ButtonComponent
              containerStyle={styles.loginButton}
              alternativeRedTheme
              title="Já sou cadastrado"
              onPress={_handleLoginButton}
            />
          </View>
        </View>
      </SafeAreaView>
      {/* </LinearGradient> */}
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerStyle: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '100%',
    height: 180,
  },
  logo: {
    fontSize: 42,
    color: RED_DARK,
    fontWeight: 'bold',
  },
  mainImageWrapper: {
    maxHeight: 400,
    margin: 10,
    width: '100%',
    flex: 1,
  },
  mainImage: {
    maxWidth: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoStyle: {
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  buttonsContainerStyle: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  registerButton: {
    alignSelf: 'center',
    width: '80%',
    ...margin(10, 0, 10, 0),
  },
  loginButton: {
    alignSelf: 'center',
    width: '80%',
  },
});

export default IndexScreen;
