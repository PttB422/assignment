import {useEffect, useState} from 'react';
import {Post} from '../types/Post';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        },
      );
      const data: Post[] = await response.json();
      const duplicatedData = Array(30).fill(data).flat() as Post[];
      setPosts(duplicatedData);
    } catch (error) {
      console.log(error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {posts};
};
