import {useEffect, useState} from 'react';
import {useAppStateContext} from '../context/AppContext';
import {Post} from '../types/Post';
import {useGetPosts} from './useGetPosts';

const useFilterPosts = () => {
  const {posts} = useGetPosts();
  const {filterValue} = useAppStateContext();
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  useEffect(() => {
    if (posts.length === 0) {
      return;
    }
    let filtered = posts;
    if (filterValue.length !== 0) {
      filtered = posts.filter(post => {
        const formattedFilterValue = filterValue.toLowerCase().trim();
        const formattedPostBody = post.body.toLowerCase();
        return formattedPostBody.includes(formattedFilterValue);
      });
    }
    setFilteredData(filtered);
  }, [posts, filterValue]);
  return {filteredData};
};

export default useFilterPosts;
