import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

class LoadingModal extends React.Component {

  
  componentDidMount() {
    this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {

    return (
      <View style={styles.container}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 350,
            height: 350,
            // backgroundColor: '#fff',

          }}
          source={require('../assets/01.json')}
        />
        <Text style={{fontSize: 25, color:'#27292b', fontWeight: '600' }}>Please Wait...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingModal;