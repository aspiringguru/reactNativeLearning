/**
*
*
*   react-native init Movies
*   copy this file into Movies directory to replace index.android.js
*   react-native run-android
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  ListView,
  Text,
  View,
} from 'react-native';


export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
  }
}/* end constructor(props) */


  componentDidMount() {
      return fetch("https://raw.githubusercontent.com/aspiringguru/reactNativeDemo2/master/ch5-5-fetch_data/mydata.json")
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.movies),
          }, function() {
            // do something with new state
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }/* end componentDidMount */

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
      /*  if not (this.state.isLoading)  */
      return (
        <View style={{flex: 1, paddingTop: 20}}>
        <Text>-----------------</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <Text>{rowData.title}, {rowData.releaseYear}, {rowData.rating}
              </Text>}
          />
        </View>
      ); /* end return */
    }/* end render */


}/* end export default class Movies extends Component */

/*
*   api references docs
*   https://facebook.github.io/react-native/docs/listview.html
*   
*/



const styles = StyleSheet.create({
});

AppRegistry.registerComponent('Movies', () => Movies);
