import appwriteService from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full min-h-screen py-8">
        <Container>
          <div className="flex flex-wrap">
            <h1>Login to read posts</h1>
          </div>
        </Container>
      </div>
    );
  }
  const fetchMoreData = () => {
    appwriteService.getPosts([]).then((posts) => {
      setPosts(posts.documents);
    });
  };

  return (
    <div className="w-full min-h-screen py-8">
      <Container>
        <div >
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </InfiniteScroll>
        </div>
      </Container>
    </div>
  );
}

export default Home;
