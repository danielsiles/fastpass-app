import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import StackHeaderView from '_components/templates/stack-header-view';
import ButtonComponent from '_atoms/button';
import TextInputComponent from '_atoms/input/text-input';
import {useSelector, useDispatch} from 'react-redux';

import actions from './actions';
import loginActions from './../login/actions';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleRegisterForm = () => {
    // const data = {
    //   firstName: registerForm.name.split(' ')[0],
    //   lastName: registerForm.name.split(' ')[1],
    //   email: registerForm.email,
    //   password: registerForm.password,
    //   cpf: registerForm.cpf.replace('.', '').replace('.', '').replace('-', ''),
    // };

    const data = {
      firstName: 'daniel',
      lastName: 'dail',
      email: 'd9334@s.com',
      password: '2345566',
      cpf: '2345565433',
      phoneNumber: '21999762585',
    };
    dispatch(
      actions.registerUser(
        data,
        (res) => {
          dispatch(
            loginActions.loginUser(data.email, data.password, () => {
              navigation.navigate('App');
            }),
          );
        },
        (err) => {
          console.log(err);
          setErrors(err.errors[0].errors);
        },
      ),
    );
  };

  console.log('form erros', errors);
  return (
    <View style={styles.viewContainer}>
      <StackHeaderView title="Crie sua conta" style={styles.viewContainer}>
        <KeyboardAvoidingView style={styles.viewContainer} behavior="padding">
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <SafeAreaView style={styles.childrenWrapper}>
              <TextInputComponent
                label="Nome completo"
                inputName="name"
                formName="registerForm"
                style={styles.inputStyle}
                placeholder="Preencha seu nome completo"
                errorMsg={errors?.first_name || errors?.last_name}
                // mask="(99) 9999"
              />

              <TextInputComponent
                label="E-mail"
                inputName="email"
                formName="registerForm"
                style={styles.inputStyle}
                placeholder="Preencha com seu e-mail"
                autoCapitalize="none"
                errorMsg={errors?.email}
                // mask="(99) 9999"
              />

              <TextInputComponent
                label="Senha"
                inputName="password"
                formName="registerForm"
                style={styles.inputStyle}
                placeholder="Crie uma senha para acessar o app"
                secureTextEntry
                autoCapitalize="none"
                errorMsg={errors?.password}
                // mask="(99) 9999"
              />

              <TextInputComponent
                label="CPF"
                inputName="cpf"
                formName="registerForm"
                style={styles.inputStyle}
                placeholder="Preencha com seu CPF"
                errorMsg={errors?.cpf}
                mask="999.999.999-99"
              />

              <TextInputComponent
                label="Tel. Celular"
                inputName="phoneNumber"
                formName="registerForm"
                style={styles.inputStyle}
                placeholder="Preencha com seu e-mail"
                errorMsg={errors?.phone_number}
                mask="(99) 99999-9999"
              />
            </SafeAreaView>
          </ScrollView>
          <SafeAreaView>
            <View style={styles.nextButtonContainer}>
              <ButtonComponent
                primaryTheme
                title="Cadastrar"
                containerStyle={styles.nextButton}
                onPress={handleRegisterForm}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </StackHeaderView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {flex: 1},
  nextButtonContainer: {
    position: 'relative',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor: 'rgba(255,255,255,0.3)',
    minHeight: 80,
  },
  nextButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  scrollViewContainer: {paddingBottom: 20},
  childrenWrapper: {flex: 1, paddingTop: 0},
  inputStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default RegisterScreen;
