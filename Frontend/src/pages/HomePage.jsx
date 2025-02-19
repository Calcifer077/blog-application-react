import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import blogService from '../services/apiBlogs';
import BlogItems from '../features/Blogs/BlogItems';

function HomePage() {
  const [expanded, setExpanded] = useState(false);

  // To use query client
  const {
    isLoading,
    data: blogs,
    error,
  } = useQuery({
    // Used to uniquely identify query.
    // It needs to be a array.
    queryKey: ['blogs'],
    // Is responsible for querying(interacting with API).
    // We have already defined the function that will fetch the data.
    queryFn: blogService.getBlogs,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p> Error</p>;
  }

  function handleClick() {
    setExpanded((prev) => !prev);
  }

  return (
    <div>
      <div className="mt-8 flex justify-center">
        <div className="flex w-full max-w-screen-lg flex-col items-center gap-6 pb-50">
          <div className="grid w-full grid-cols-2 justify-items-center gap-10">
            {(expanded ? blogs : blogs.slice(0, 10)).map((el) => (
              <BlogItems
                key={el._id}
                title={el.title}
                content={el.content}
                id={el._id}
              />
            ))}
          </div>
          <button
            className="fixed bottom-36 rounded-lg bg-blue-500 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700"
            onClick={handleClick}
          >
            {expanded ? 'Show Less' : 'Expand'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
