import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'

export default class SideMenu extends Component {
  render() {
    return (
      <View style={{paddingTop: 20, flex: 1}}>
        <ScrollView>
          <View>
            <Text>
              Section 1
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
