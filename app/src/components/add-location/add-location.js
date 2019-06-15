import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input, DefaultButton, DefaultButtonText } from '../../app.styles';
import { Container } from './../login/styles';
import { ScrollView } from 'react-native-gesture-handler';
import Geocode from 'react-geocode';
import Constants from './../../util/constants.util';
import { AddressService } from './../../services/address.service';
import Loading from './../loading/loading';

export default class AddLocation extends Component {
  state = {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    loading: false,
  };

  constructor(props) {
    super(props);

    Geocode.setApiKey(Constants.GOOGLE_API_KEY);    
    this.handlerAddLocation = this.handlerAddLocation.bind(this);
  }

  handlerInput(value, name) {
    this.setState({[name]: value});
  }

  handlerAddLocation() {
    const { street, number, complement, city, state, cep, neighborhood } = this.state;
    this.setState({loading: true});
    Geocode.fromAddress(`${number}, ${street}, ${neighborhood}, ${city}, ${state}, ${cep}, Brasil`).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      AddressService.create({
        zip_code: cep, 
        city_name: city, 
        street: street, 
        number: number,
        complement: complement,
        neighborhood: neighborhood, 
        uf_name: state, 
        country: 'Brasil', 
        lat: `${lat}`, 
        lng: `${lng}`
      }).then(() => {
        this.setState({loading: false});
        alert("Endereço cadastrado com sucesso");
      }, (error) => {
        this.setState({loading: false});
        alert("Erro, tente novamente mais tarde");
      })
    }, (error) => {
      this.setState({loading: false});
      alert("Erro ao pegar endereço, verifique o endereço digitado");
    });
  }

  render() {
    const { cep, street, number, complement, city, state, neighborhood } = this.state;

    return (
      <ScrollView>
        <Container>
          <Input 
            placeholder="Endereço" 
            type="text"
            value={street}
            onChangeText={(text) => { this.handlerInput(text, 'street')}}
          />
          <Input 
            placeholder="Número" 
            type="number"
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
            value={state}
            onChangeText={(text) => { this.handlerInput(text, 'state')}}
          />
          <Input 
            placeholder="CEP"
            keyboardType="phone-pad"
            value={cep}
            onChangeText={(text) => { this.handlerInput(text, 'cep')}}
          />

          <DefaultButton 
            onPress={this.handlerAddLocation}
          >
            <DefaultButtonText>
              Adicionar
            </DefaultButtonText>
          </DefaultButton>
        </Container>
        {
          this.state.loading &&
          <Loading />
        }
      </ScrollView>
    )
  }
}
