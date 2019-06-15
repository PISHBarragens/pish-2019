import React, { Component, Fragment } from 'react'
import { View, Text, Image } from 'react-native';
import { BarragemService } from './../../services/barragem.service';
import Loading from '../loading/loading';

export default class Barragem extends Component {
  state = {
    id: this.props.navigation.getParam('id', 0),
    barragem: null,
    loading: false
  }

  componentDidMount() {
    this.setState({loading: true});
    BarragemService.get(this.state.id)
    .then((response) => {
      this.setState({loading: false});
      this.setState({barragem: response.data});
    }, (error) => {
      this.setState({loading: false});
      alert("Erro, tente novamente");
    });
  }

  render() {
    const { barragem } = this.state;

    return (
      <View style={{flex: 1}}>
        {
          barragem != null && barragem != undefined &&
          <Fragment>
            <View style={{width: '100%'}}>
              <Image style={{width: '100%', minHeight: 300}} source={barragem.photo ? {uri: barragem.photo} : {uri: "https://turismotupa.com.br/imagens/semimagem.jpg"}}/>
            </View>
            <View style={{width: '100%', padding: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{barragem.name} (#{barragem.id})</Text>
              <Text>{barragem.description}</Text>
            </View>
          </Fragment>
        }
        {
          this.state.loading &&
          <Loading />          
        }
      </View>
    )
  }
}

