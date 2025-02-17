import appwriteService from "../../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import Container from "../../components/container/Container";
import PostCard from "../../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import HomeSkeletonCard from "./HomeSkeletonCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
    setLoading(false);
  }, []);
  const fetchMoreData = () => {
    appwriteService.getPosts([]).then((posts) => {
      setPosts(posts.documents);
    });
  };

  return (
    <div className="w-full min-h-screen py-8">
      <Container>
        <div >
       {!loading && <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={true}
          loader={loading ? <HomeSkeleton /> : null}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </InfiniteScroll>}
        </div>
      </Container>
    </div>
  );
}

export default Home;

function HomeSkeleton() {
  return (
    <>
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
      <HomeSkeletonCard />
    </>
  )
}
