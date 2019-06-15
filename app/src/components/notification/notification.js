import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { NotificationService } from '../../services';
import Loading from './../loading/loading';

export default class Notification extends Component {
  state = {
    notifications: [],
    loading: false,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const token = await firebase.messaging().getToken();
    console.log(token);
    this.setState({loading: true});
    NotificationService.list().then((response) => {
      this.setState({loading: false});
      this.setState({notifications: response.data});
    }, (error) => {
      this.setState({loading: false});
      alert("Erro, tente novamente mais tarde");
    })
  }

  render() {
    const { notifications } = this.state;

    return (
      <View style={{flex: 1}}>
        {
          this.state.notifications.length > 0 ?
          notifications.map((not, index) => {
            return (
              <Fragment key={index}>
                <View style={{padding: 5, margin: 5, borderBottomColor: "black", borderBottomWidth: 1}}>
                  <Text style={{margin: 5}}>Titulo: {not.title}</Text>
                  <Text style={{margin: 5}}>Mensagem: {not.message}</Text>
                </View>
              </Fragment>
            )
          }) :
          <Text style={{margin: 20}}>Você nao possui notificações</Text>
        }
        {
          this.state.loading &&
          <Loading />
        }
      </View>
    )
  }
}
