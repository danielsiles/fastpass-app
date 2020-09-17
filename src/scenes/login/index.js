import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {padding, margin} from '_styles/mixins';
import TextInputComponent from '_atoms/input/text-input';
import ButtonComponent from '_atoms/button';
import {PRIMARY, GRAY_LIGHT_1, SECONDARY} from '_styles/colors';
// import actions from './actions'
import StackHeaderView from '_components/templates/stack-header-view';
import TitleComponent from '_atoms/title';
import SubtitleComponent from '_atoms/subtitle';
// import {
//   LoginButton,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';
import {loginUserFacebook} from '_utils/authUtil';
import actions from './actions';
import {GRAY_DARK} from '_styles';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const authForm = useSelector((state) => state.input['authForm']);
  const loginStatus = useSelector((state) => state.auth.loginUserStatus);
  const getUserStatus = useSelector((state) => state.auth.getUserStatus);
  // const token = useSelector((state) => state.auth);
  const _handleLoginButton = () => {
    dispatch(
      actions.loginUser(
        'd@s.com',
        '123456',
        () => {
          navigation.navigate('App');
        },
        (err) => {
          console.log('Credenciais incorretas', err);
        },
      ),
    );
  };

  const _handleFacebookLoginButton = () => {
    dispatch(loginUserFacebook());
  };

  return (
    <View style={styles.viewContainer}>
      <StackHeaderView title="Acesse sua conta" style={styles.containerStyle}>
        <ButtonComponent
          containerStyle={styles.facebookButton}
          facebookTheme
          title="Entrar com Facebook"
          onPress={_handleFacebookLoginButton}
        />
        {/* {fbLogin} */}
        <View style={styles.contentStyle}>
          <View style={styles.orDividerContainer}>
            <View style={styles.orDivider} />
            <SubtitleComponent style={{...padding(0, 10, 0, 10)}}>
              ou
            </SubtitleComponent>
            <View style={styles.orDivider} />
          </View>
          <TitleComponent h5 style={styles.loginTitle}>
            Entrar com seu e-mail
          </TitleComponent>
          <TextInputComponent
            label="E-mail"
            inputName="email"
            formName="authForm"
            // containerStyle={{borderWidth: 0}}
            style={styles.inputStyle}
            placeholder="Preencha com seu e-mail"
            // errorMsg={"E-mail inválido"}
            // mask="(99) 9999"
          />

          <TextInputComponent
            label="Senha"
            inputName="password"
            formName="authForm"
            style={styles.inputStyle}
            placeholder="Preencha sua senha"
          />
          <ButtonComponent
            containerStyle={styles.loginButton}
            redTheme
            title="Entrar"
            onPress={_handleLoginButton}
            loading={loginStatus === 'FETCHING' || getUserStatus === 'FETCHING'}
          />
          <SubtitleComponent style={styles.forgotPassword}>
            Esqueci a senha
          </SubtitleComponent>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerContent}>
            <SubtitleComponent>Não tem conta?</SubtitleComponent>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <SubtitleComponent style={styles.registerButton}>
                Cadastre-se grátis
              </SubtitleComponent>
            </TouchableOpacity>
          </View>
        </View>
      </StackHeaderView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
    paddingTop: 10,
  },
  facebookButton: {
    ...margin(10, 20, 0, 20),
  },
  contentStyle: {
    width: '100%',
    padding: 20,
    // backgroundColor: 'red'
  },
  orDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...margin(0, 0, 10, 0),
  },
  orDivider: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: GRAY_LIGHT_1,
  },
  loginTitle: {textAlign: 'center', marginBottom: 20},
  loginButton: {
    marginTop: 20,
  },
  forgotPassword: {
    margin: 20,
    textAlign: 'center',
    color: GRAY_DARK,
    textDecorationLine: 'underline',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerContent: {
    borderTopWidth: 1,
    borderColor: GRAY_LIGHT_1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  registerButton: {
    color: SECONDARY,
    paddingLeft: 5,
  },
});

export default LoginScreen;
