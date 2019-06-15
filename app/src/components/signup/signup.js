import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, DefaultButton, DefaultButtonText } from '../../app.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { Container } from './styles';
import Geocode from 'react-geocode';
import Constants from './../../util/constants.util';
import { UserService } from '../../services/user.service';
import Loading from '../loading/loading';

export default class Signup extends Component {
  state = {
    name: '',
    email: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    password: '',
    phone: '',
    cpf: '',
    neighborhood: '',
    loading: false,
  }

  constructor(props) {
    super(props);

    Geocode.setApiKey(Constants.GOOGLE_API_KEY);    
    this.handlerCadastrar = this.handlerCadastrar.bind(this);
  }

  handlerCadastrar() {
    this.setState({loading: true});
    const { street, number, complement, city, state, cep, neighborhood } = this.state;
    Geocode.fromAddress(`${number}, ${street}, ${neighborhood}, ${city}, ${state}, ${cep}, Brasil`).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      UserService.create({
        email: this.state.email,//
        name: this.state.name,//
        phone: this.state.phone,//
        cpf: this.state.cpf,//
        password: this.state.password,//
        address_attributes: [{
          zip_code: this.state.cep,//
          city_name: this.state.city,//
          street: this.state.street,//
          number: this.state.number,//
          complement: this.state.complement,//
          neighborhood: this.state.neighborhood,//
          uf_name: this.state.state,//
          country: 'Brasil',//
          lat: `${lat}`,//
          lng: `${lng}`,//
        }]
      }).then((response) => {
        this.setState({loading: false});
        alert("Usuário cadastrado");
      }, (error) => {
        this.setState({loading: false});
        alert("Erro, tente novamente mais tarde");
      });
    }, (error) => {
      this.setState({loading: false});
      alert("Erro ao pegar endereço, verifique o endereço digitado");
    });
  }

  handlerInput(value, name) {
    this.setState({[name]: value});
  }

  render() {
    const { name, email, cep, street, number, complement,
      city, state, password, confirmPassword, phone, cpf, neighborhood } = this.state;

    return (
      <ScrollView>  
        <Container>
          <Input 
            placeholder="Nome" 
            type="text"
            value={name}
            onChangeText={(text) => { this.handlerInput(text, 'name')}}
          />
          <Input 
            placeholder="Endereço de Email" 
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => { this.handlerInput(text, 'email')}}
          />
          <Input
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={phone}
            type="tel"
            onChangeText={(text) => { this.handlerInput(text, 'phone')}}
          />
          <Input
            placeholder="CPF"
            keyboardType="phone-pad"
            value={cpf}
            type="tel"
            onChangeText={(text) => { this.handlerInput(text, 'cpf')}}
          />
          <Input 
            placeholder="Endereço" 
            type="text"
            value={street}
            onChangeText={(text) => { this.handlerInput(text, 'street')}}
          />
          <Input 
            placeholder="Número" 
            keyboardType="number-pad"
            value={number}
            onChangeText={(text) => { this.handlerInput(text, 'number')}}
          />
          <Input 
            placeholder="Complemento" 
            type="text"
            value={complement}
            onChangeText={(text) => { this.handlerInput(text, 'complement')}}
          />
          <Input 
            placeholder="Bairro" 
            type="text"
            value={neighborhood}
            onChangeText={(text) => { this.handlerInput(text, 'neighborhood')}}
          />
          <Input 
            placeholder="Cidade" 
            type="text"
            value={city}
            onChangeText={(text) => { this.handlerInput(text, 'city')}}
          />
          <Input 
            placeholder="Estado (Ex. MG)" 
            autoCapitalize="characters"
            type="text"
            value={state}
            onChangeText={(text) => { this.handlerInput(text, 'state')}}
          />
          <Input 
            placeholder="CEP" 
            keyboardType="phone-pad"
            value={cep}
            onChangeText={(text) => { this.handlerInput(text, 'cep')}}
          />
          <Input 
            placeholder="Senha" 
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => { this.handlerInput(text, 'password')}}
          />

          <DefaultButton 
            onPress={this.handlerCadastrar} 
          >
            <DefaultButtonText>
              Cadastrar
            </DefaultButtonText>
          </DefaultButton>
        </Container>
        {
          this.state.loading &&
          <Loading />
        }
      </ScrollView>
    );
  }
}