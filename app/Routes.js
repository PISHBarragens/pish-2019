import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import React from 'react';
import { View, Dimensions, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from './src/components/login/login';
import Signup from './src/components/signup/signup';
import Constants from './src/util/constants.util';
import HomeMap from './src/components/home-map/home-map';
import Barragem from './src/components/barragem//barragem';
import AddLocation from './src/components/add-location/add-location';
import SideMenu from './src/components/side-menu/side-menu';
import Profile from './src/components/profile/profile';
import Notification from './src/components/notification/notification';
import AsyncStorage from '@react-native-community/async-storage';

const UserLoggedOut = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: ({navigation}) => ({
        title: 'Cadastrar',
        headerTintColor: Constants.COLOR_2,
        headerTitleStyle: {flexGrow: 1, textAlign: 'center', alignSelf:'center', color: Constants.COLOR_2},
        headerRight: (<View />)
      })
    }
  }, {
    initialRouteName: 'Login'
  }
);

const NotificationNavigation = createStackNavigator(
  {
    Notifiaction: {
      screen: Notification,
      navigationOptions: ({navigation}) => ({
        title: 'Suas Notificações',
        headerLeft: (
          <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{paddingLeft: 10}}>
            <Icon name="dehaze" color={Constants.COLOR_2} size={30}/>
          </TouchableHighlight>
        ),
        headerTintColor: Constants.COLOR_2,
        headerTitleStyle: {flexGrow: 1, textAlign: 'center', alignSelf:'center', color: Constants.COLOR_2},
        headerRight: (<View />)
      })
    }
  }, {
    initialRouteName: 'Notifiaction',
    navigationOptions: ({ navigation }) => ({
      title: 'Notificações'
    })
  }
)

const HomeNavigation = createStackNavigator(
  {
    HomeMap: {
      screen: HomeMap,
      navigationOptions: ({navigation}) => ({
        headerTransparent: true,
        headerLeft: (
          <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{paddingLeft: 10}}>
            <Icon name="dehaze" color={Constants.COLOR_2} size={30}/>
          </TouchableHighlight>
        ),
        headerRight: (
          <TouchableHighlight onPress={async () => {navigation.navigate('UserLoggedOut'); await AsyncStorage.clear();}} style={{paddingRight: 10}}>
            <Icon name="close" color={Constants.COLOR_2} size={30}/>
          </TouchableHighlight>
        ),
      })
    },
    Barragem: {
      screen: Barragem,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTintColor: Constants.COLOR_2,
        headerTitleStyle: {flexGrow: 1, textAlign: 'center', alignSelf:'center', color: Constants.COLOR_2},
        headerRight: (<View />)
      })
    },
  }, {
    initialRouteName: 'HomeMap',
    navigationOptions: ({ navigation }) => ({
      title: 'Mapa'
    })
  }
);

const AddLocationNavigation = createStackNavigator(
  {
    AddLocation: {
      screen: AddLocation,
      navigationOptions: ({ navigation }) => ({
        title: 'Adicionar Localização',
        headerLeft: (
          <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{paddingLeft: 10}}>
            <Icon name="dehaze" color={Constants.COLOR_2} size={30}/>
          </TouchableHighlight>
        ),
        headerTintColor: Constants.COLOR_2,
        headerTitleStyle: {flexGrow: 1, textAlign: 'center', alignSelf:'center', color: Constants.COLOR_2},
        headerRight: (<View />)
      })
    }
  }, {
    navigationOptions: ({ navigation }) => ({
      title: 'Adicionar Localização'
    })
  }
);

const ProfileNavigation = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        title: 'Perfil',
        headerLeft: (
          <TouchableHighlight onPress={() => navigation.toggleDrawer()} style={{paddingLeft: 10}}>
            <Icon name="dehaze" color={Constants.COLOR_2} size={30}/>
          </TouchableHighlight>
        ),
        headerTintColor: Constants.COLOR_2,
        headerTitleStyle: {flexGrow: 1, textAlign: 'center', alignSelf:'center', color: Constants.COLOR_2},
        headerRight: (<View />)
      })
    }
  }, {
    navigationOptions: ({ navigation }) => ({
      title: 'Perfil'
    })
  }
)

const UserLoggedIn = createDrawerNavigator(
  {
    HomeNavigation,
    AddLocationNavigation,
    NotificationNavigation,
    // ProfileNavigation
  }
);

export const Routes = createAppContainer(
  createSwitchNavigator({ 
    UserLoggedOut: UserLoggedOut,
    UserLoggedIn: UserLoggedIn
  }, {
    initialRouteName: 'UserLoggedOut'
  })
);
