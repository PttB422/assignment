import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAppDispatchContext, useAppStateContext} from '../context/AppContext';

const SearchComponent = () => {
  const {refresh} = useAppStateContext();
  const dispatch = useAppDispatchContext();

  const onReRenderButtonPress = () => {
    return dispatch({type: 'RE-RENDER', payload: {refresh: !refresh}});
  };

  const onChangeText = (text: string) => {
    dispatch({type: 'FILTER_POSTS', payload: {filterValue: text}});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search a text"
        onChangeText={onChangeText}
      />
      <Pressable onPress={onReRenderButtonPress}>
        <View style={styles.button}>
          <Text>Re-render</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#000',
  },
  button: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#ddd',
    alignSelf: 'flex-start',
  },
});

export default SearchComponent;
