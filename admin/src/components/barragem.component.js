import React, { Component } from 'react';
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import { BarragemService } from '../services/barragem.service';

class Barragem extends Component {
  state = {
    id: this.props.match.params.identifier,
    barragem: null,
    medicoes: {
      labels: [],
      datasets: [
        {
          label: 'Umidade do solo',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          width: '500px',
          data: []
        }
      ],
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                }
            }]
        }
      }
    },
    vibracao: {
      labels: [],
      datasets: [
        {
          label: 'Vibração do solo',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(35,59,65,1)',
          borderColor: 'rgba(35,59,65,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(35,59,65,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(35,59,65,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          width: '500px',
          data: [],
        }
      ],
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 1,
                }
            }]
        }
      }
    }
  };

  constructor(props) {
    super(props);

    this.addMedicao = this.addMedicao.bind(this);
  }

  componentDidMount() {
    BarragemService.get(this.state.id)
    .then((response) => {
      this.setState({barragem: response.data}, () => {
        var { medicoes } = this.state;
        medicoes.labels = [];
        medicoes.datasets[0].data = [];
        for(var i = 0; i < 15; i++) {
          medicoes.labels.push(`${i + 1}`);
          medicoes.datasets[0].data.push(this.state.barragem.nivels[i].moisture);
        }

        this.setState({medicoes});
      });
    }, (error) => {
      alert("Erro");
    });

    // Get Data from service
    // request a cada 1 minuto
    

    // var { vibracao } = this.state;
    // date = new Date();
    // date.setMinutes(date.getMinutes() - 20);
    // for(i = 0; i < 20; i++) {
    //   vibracao.labels.push(`${date.getHours()}:${date.getMinutes()}`);
    //   vibracao.datasets[0].data.push(this.getRandomArbitrary(0, 2));
    //   date.setMinutes(date.getMinutes() + 1);
    // }

    // this.setState({vibracao});

    setInterval(() => {
      this.requisicaoDadosDaBarragem();
      //this.addVibracao();
    }, 30000);
  }

  requisicaoDadosDaBarragem() {
    BarragemService.get(this.state.id)
    .then((response) => {
      this.setState({barragem: response.data}, () => {
        var { medicoes } = this.state;
        medicoes.labels = [];
        medicoes.datasets[0].data = [];
        for(var i = 0; i < 15; i++) {
          medicoes.labels.push(`${i + 1}`);
          medicoes.datasets[0].data.push(this.state.barragem.nivels[i].moisture);
        }
        
        this.setState({medicoes});
      });
    }, (error) => {
      alert("Erro");
    });
  }

  getRandomArbitrary(min, max) {
      return Math.trunc(Math.random() * (max - min) + min);
  }

  addVibracao() {
    var { vibracao } = this.state;
    var newMed = [];
    var newLabels = [];
    var dateNow = new Date();

    if(vibracao.labels.length >= 20) {
      for(var i = 0; i < vibracao.labels.length - 1; i++) {
        newMed.push(vibracao.datasets[0].data[i + 1]);
        newLabels.push(vibracao.labels[i + 1]);
      }
    } else {
      for(var j = 0; j < vibracao.labels.length; j++) {
        newMed.push(vibracao.datasets[0].data[j]);
        newLabels.push(vibracao.labels[j]);
      } 
    }

    newLabels.push(`${dateNow.getHours()}:${dateNow.getMinutes()}`);
    newMed.push(this.getRandomArbitrary(0, 2));

    var newDataSet = {
      ...vibracao.datasets[0]
    };

    newDataSet.data = newMed;

    var newState = {
      labels: newLabels,
      datasets: [newDataSet]
    }

    this.setState({
      vibracao: newState
    });
  }

  addMedicao() {
    var { medicoes } = this.state;
    var newMed = [];
    var newLabels = [];
    var dateNow = new Date();

    if(medicoes.labels.length >= 20) {
      for(var i = 0; i < medicoes.labels.length - 1; i++) {
        newMed.push(medicoes.datasets[0].data[i + 1]);
        newLabels.push(medicoes.labels[i + 1]);
      }
    } else {
      for(var j = 0; j < medicoes.labels.length; j++) {
        newMed.push(medicoes.datasets[0].data[j]);
        newLabels.push(medicoes.labels[j]);
      } 
    }

    newLabels.push(`${dateNow.getHours()}:${dateNow.getMinutes()}`);
    newMed.push(this.getRandomArbitrary(30, 60));

    var newDataSet = {
      ...medicoes.datasets[0]
    };

    newDataSet.data = newMed;

    var newState = {
      labels: newLabels,
      datasets: [newDataSet]
    }

    this.setState({
      medicoes: newState
    });
  }

  render() {
    const { medicoes, vibracao, barragem } = this.state;

    return (
      <div>
        {
          barragem &&
          <DescricaoDiv>
            <div className="text">
              <div>
                <h1>
                  {barragem.name}(#{barragem.id})
                </h1>
              </div>
              <div>
                <p>
                  Sobre: {barragem.description}
                </p>
              </div>
            </div>
            <div className="imagem">
              <img src={barragem.photo ? barragem.photo : "https://turismotupa.com.br/imagens/semimagem.jpg"} alt="foto barragem"/>
            </div>
          </DescricaoDiv>
        }
        <GraficosDiv>
          <div style={{marginBottom: '2em'}}>
            <Line
              data={medicoes}
              options={medicoes.options}
            />
          </div>
          {/* <div style={{marginBottom: '2em'}}>
            <Line
              data={vibracao}
              options={vibracao.options}
            />
          </div> */}
        </GraficosDiv>
      </div>
    )
  }
}

const DescricaoDiv = styled.div`
  display: flex;
  margin: auto;
  width: fit-content;
  padding: 2em;
  div.imagem img{
    max-width: 30em;
    max-height: 30em;
    margin-left: 3em;
    border: 1px solid black;
  }
  div.text {
    max-width: 40em;
  }
`;

const GraficosDiv = styled.div`
  width: 70em;
  margin: auto;
`;

export default Barragem;