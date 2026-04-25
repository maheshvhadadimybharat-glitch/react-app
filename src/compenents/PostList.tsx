import React, { useState, useEffect } from "react";

interface Post {
  id: number,
  title: string
}

const PostList = () => {
const [posts, setPosts] = useState<Post[]>([]);
const [loading, setLoading] = useState<boolean>(true);

const [error, setError] = useState<string | null>(null);

const fetchData = async () => {
  setLoading(true);
  setError(null); // Reset error before trying again

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    // 2. Check if the response is "ok" (status 200-299)
    if(!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    setPosts(data);

  } catch(err: any) {
    // 3. Catch network errors or the thrown error above
    setError(err.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
} 


  // 4. Conditional Rendering for UI States
  if (loading) return <p>🌀 Loading posts...</p>;

  if(error) return (
    <div style={errorCard}>
      <p>⚠️ Error: {error}</p>
      <button onClick={fetchData}>Retry</button>
    </div>
  )

  return (
    <div>
      <h3>Latest Posts</h3>
      {posts.map(post =>(
        <p key={post.id}>📌 {post.title}</p>
      ))}
    </div>
  )


}

const errorCard = { padding: '15px', border: '1px solid red', borderRadius: '8px', backgroundColor: '#fff5f5' };

export default PostList