import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

const Geolocation = navigator.geolocation

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.watchId = -1;
    this.state = {
      isRecording: false
    }
  }
  render() {
    const { isRecording } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Text>Map</Text>
        </View>
        <View style={styles.controls}>
          <View style={styles.recBtnWrap}>
            <TouchableWithoutFeedback onPress={this.toggleRecording}>
              <View style={[
                styles.recBtn,
                isRecording && styles.recoding
              ]}></View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
  onWatchPositionSuccess = (geolocation) => {
    const { coords, timestamp } = geolocation
  }
  onWatchPositionError = () => {

  }
  toggleRecording = () => {
    const { isRecording } = this.state
    if (isRecording) {
      Geolocation.clearWatch(this.watchId)
    } else {
      this.watchId = Geolocation.watchPosition(
        this.onWatchPositionSuccess,
        this.onWatchPositionError
      )
    }
    this.setState({
      isRecording: !isRecording,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#adcffb',
    alignSelf: 'stretch',
  },
  controls: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
  },
  recoding: {
    backgroundColor: 'red'
  }
});
