import React, { Component } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { Container } from './styles';
import Logo from './logo';
import { Input, DefaultButton, OutlineButton, DefaultButtonText, OutlineButtonText } from '../../app.styles';
import Constants from './../../util/constants.util';
import firebase from 'react-native-firebase';
import { UserService } from './../../services/user.service';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
  }

  constructor(props) {
    super(props);

    this.redirectSignup = this.redirectSignup.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {

    const logado = await AsyncStorage.getItem("access-token");
    
    if(logado) {
      this.props.navigation.navigate('UserLoggedIn');
    }

    firebase.messaging().hasPermission()
    .then(async (enabled) => {
      if (!enabled) {
        try {
          await firebase.messaging().requestPermission();
        } catch(error) {
          alert("Sem permisão de notificação");
        }
      } 
    });
  }

  redirectSignup() {
    this.props.navigation.navigate('Signup');
  }

  async login() {
    this.setState({loading: true});
    UserService.login(this.state.email, this.state.password, await firebase.messaging().getToken(), "android")
    .then(async (response) => {
      this.setState({loading: false});
      await AsyncStorage.setItem('access-token', response.headers["access-token"]);
      await AsyncStorage.setItem('client', response.headers["client"]);
      await AsyncStorage.setItem('resource-type', response.headers["resource-type"]);
      await AsyncStorage.setItem('uid', response.headers["uid"]);
      this.props.navigation.navigate('UserLoggedIn');
    }, (error) => {
      this.setState({loading: false});
      alert("Erro - tente novamente");
    });
  }
  
  handlerInput(value, name) {
    this.setState({[name]: value});
  }

  render() {
    const { email, password } = this.state;

    return(
      <Container>
        <Logo />
        <Input 
          placeholder="Email" 
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => { this.handlerInput(text, 'email') }}
        />
        <Input 
          placeholder="Senha" 
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={(text) => { this.handlerInput(text, 'password') }}
        />
        <Text>Esqueceu sua senha?</Text>
        <DefaultButton
          onPress={this.login}
        >
          <DefaultButtonText>
            Entrar
          </DefaultButtonText>
        </DefaultButton>
        <OutlineButton 
          onPress={this.redirectSignup}
        >
          <OutlineButtonText>
            Cadastrar
          </OutlineButtonText>
        </OutlineButton>
        {
          this.state.loading &&
          <LoadingBackground>
            <ActivityIndicator size={50} color={Constants.COLOR_2} />
          </LoadingBackground>
        }
      </Container>
    );
  }
}

const LoadingBackground = styled.View`
  position: absolute;
  flex: 1;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00000061;
  width: 300%;
  height: 300%;
`;