import React from 'react';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

const Geolocation = navigator.geolocation

const GotoMyLocationButton = ({ onPress, isFollowing }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.circleBtn}>
        <View style={[styles.innerCircleBtn, {
          backgroundColor: isFollowing ? '#357df6' : '#ccc',
        }]}>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
const RecMyLocationButton = ({ onPress, isRecording }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.circleBtn}>
        <View style={[styles.innerCircleBtn, {
          backgroundColor: isRecording ? 'red' : '#ccc',
        }]}>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default class App extends React.Component {
  watchId = -1
  state = {
    isRecording: false,
    isFollowing: true,
    coordinates: []
  }
  componentWillUnmount() {
    Geolocation.stopObserving()
  }
  render() {
    const { isRecording, isFollowing, coordinates } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            // showsMyLocationButton
            showsUserLocation
            followsUserLocation={isFollowing}
            style={{ flex: 1 }}
          >
            <Polyline
              coordinates={coordinates}
              strokeColor="green"
              strokeWidth={12}
            />
          </MapView>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          alert('!!!')
        }}>
        <View style={styles.controls}>
          <GotoMyLocationButton
            isFollowing={isFollowing}
            onPress={this.toggleFollowing} />
          <RecMyLocationButton
            isRecording={isRecording}
            onPress={this.toggleRecording} />
        </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  onWatchPositionSuccess = (geolocation) => {
    const { coords, timestamp } = geolocation
    console.log('>>> coords:', coords)
  }
  onWatchPositionError = (error) => {
    alert(error.message)
  }
  toggleRecording = () => {
    const { isRecording } = this.state
    if (isRecording) {
      Geolocation.clearWatch(this.watchId)
    } else {
      this.watchId = Geolocation.watchPosition(
        this.onWatchPositionSuccess,
        this.onWatchPositionError,
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
        }
      )
    }
    this.setState({
      isRecording: !isRecording,
    })
  }
  toggleFollowing = () => {
    this.setState({
      isFollowing: !this.state.isFollowing
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
    alignSelf: 'stretch',
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 1,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  innerCircleBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  circleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  recBtn: {
    backgroundColor: '#ccc',
  },
  recoding: {
    backgroundColor: 'red'
  }
});
