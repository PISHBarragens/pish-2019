import React, { Component, Fragment } from 'react'
import { View, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import { AddressService } from './../../services/address.service';
import firebase from 'react-native-firebase';
import { BarragemService } from './../../services/barragem.service';
import Loading from '../loading/loading';

export default class HomeMap extends Component {
  state = {
    barragens: [],
    loading: false
  }

  constructor(props) {
    super(props);

    this.handlerPressBarragemMarker = this.handlerPressBarragemMarker.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    AddressService.list().then((response) => {
      response.data.forEach((a) => {
        BarragemService.barragensAddress(a.id).then((res) => {
          if(this.state.barragens.filter((b) => b.id == res.data.id).length == 0) {
            const {barragens} = this.state;
            barragens.push(res.data);
            this.setState({barragens})
          }
        }, (error) => {
          alert("Erro, tente novamente");
        });
      })
      this.setState({loading: false});
    }, (error) => {
      this.setState({loading: false});
      alert("Erro, tente novamente");
    });
  }

  handlerPressBarragemMarker(id, title) {
    this.props.navigation.navigate('Barragem', {id, title})
  }

  render() {
    const { barragens } = this.state;
    
    return (
      <View style={{flex: 1}}>
        <MapView 
          style={{flex: 1}}
          region={{
            latitude: -19.8552495, 
            longitude: -43.9198209,
            latitudeDelta: 0.0543,
            longitudeDelta: 0.0534
          }}
          loadingEnabled={true}
        >
          {
            barragens && barragens.map((barragem, index) => {
              return (
                <Fragment key={index}>
                  <Circle 
                    center={{latitude: parseFloat(barragem.lat), longitude: parseFloat(barragem.lng)}}
                    radius={barragem.size}
                    strokeColor='transparent'
                    fillColor='rgba(255,0,0,0.1)'
                  />
                  <Marker 
                    coordinate={{latitude: parseFloat(barragem.lat), longitude: parseFloat(barragem.lng)}}
                    title={barragem.name}
                    onPress={() => this.handlerPressBarragemMarker(barragem.id, barragem.name)}
                  />
                </Fragment>
              )
            })
          }
        </MapView>
        {
          this.state.loading &&
          <Loading />
        }
      </View>
    );
  }
}
