import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Images} from '../assets';
import PostsComponent from './components/PostsComponent';
import SearchComponent from './components/SearchComponent';

const Assignment = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.doggoWalk}
        style={styles.gif}
        resizeMode="contain"
      />
      <SearchComponent />
      <PostsComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  gif: {
    width: '100%',
  },
});

export default Assignment;
