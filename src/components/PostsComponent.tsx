import React, {memo, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useAppStateContext} from '../context/AppContext';
import useFilterPosts from '../hooks/useFilterPosts';
import {Post} from '../types/Post';

type PostItemProps = {
  post: Post;
  refresh: boolean;
};

const PostItem = memo(({post, refresh}: PostItemProps) => {
  const getRandomNumber = useMemo(() => {
    return Math.floor(Math.random() * (8000000000 + 1) + 1000000000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  return (
    <View style={styles.postItemContainer}>
      <Text>{`${post.id}: ${post.body} - `}</Text>
      <Text style={styles.postItemRandomNumber}>{getRandomNumber}</Text>
    </View>
  );
});

const PostsComponent = () => {
  const {refresh} = useAppStateContext();
  const {filteredData} = useFilterPosts();
  const renderItem = ({item: post}: {item: Post}) => (
    <PostItem post={post} refresh={refresh} />
  );
  const keyExtractor = (post: Post, index: number) =>
    `${index} ${post.id} ${post.userId}`;

  return (
    <FlatList
      data={filteredData}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={30}
      initialNumToRender={8}
      removeClippedSubviews={true}
      style={styles.postsFlatList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  postsFlatList: {
    paddingHorizontal: 8,
  },
  postItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postItemRandomNumber: {fontWeight: 'bold', alignSelf: 'flex-end'},
});

export default PostsComponent;
