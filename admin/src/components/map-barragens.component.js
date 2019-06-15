import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import { BarragemService } from './../services/barragem.service';

export class MapBarragens extends Component {
  state = {
    barragens: [],
  };
  
  componentDidMount() {
    BarragemService.list().then((response) => {
      this.setState({
        barragens: response.data
      });
    }, (error) => {
      alert('Erro');
    });
  }

  selectBarragem(barragem) {
    this.props.history.push(`/barragem/${barragem.id}`);
  }

  render() {
    const { barragens } = this.state;
    
    return (
      <MapBarragensDiv>
        <Map google={this.props.google} zoom={14}
          initialCenter={{
            lat: -19.8552495,
            lng: -43.9198209
          }}
        >
          {
            barragens.map((barragem, index) => 
              <Marker
                key={index} 
                name={barragem.name}
                title={barragem.name}
                position={{lat: parseFloat(barragem.lat), lng: parseFloat(barragem.lng)}}
                onClick={() => this.selectBarragem(barragem)}
              />
            )
          }

          {
            barragens.map((barragem, index) => 
              <Circle
                key={index}
                radius={barragem.size}
                center={{lat: parseFloat(barragem.lat), lng: parseFloat(barragem.lng)}}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.1}
              />
            )
          }
        </Map>
      </MapBarragensDiv>
    );
  }
}

const MapBarragensDiv = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;


export default GoogleApiWrapper({
  apiKey: ('AIzaSyBSODwM7RkBDaNu_BVJ_rkACN7yUYXrFXo'),
})(MapBarragens);