import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useAppStateContext} from '../context/AppContext';
import {useGetPosts} from '../hooks/useGetPosts';
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
  const {posts} = useGetPosts();
  const {refresh, filterValue} = useAppStateContext();
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const renderItem = ({item: post}: {item: Post}) => (
    <PostItem post={post} refresh={refresh} />
  );
  const keyExtractor = (post: Post, index: number) =>
    `${index} ${post.id} ${post.userId}`;

  const itemHeight = 140;
  const getItemLayout = useCallback(
    (posts: Post[] | null | undefined, index: number) => ({
      length: itemHeight,
      offset: index * itemHeight,
      index,
    }),
    [],
  );

  useEffect(() => {
    if (posts.length === 0) {
      return;
    }
    let filtered = posts;
    if (filterValue.length !== 0) {
      filtered = posts.filter(post => post.body.includes(filterValue));
    }
    setFilteredData(filtered);
  }, [posts, filterValue]);

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
      getItemLayout={getItemLayout}
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
