import { useSelector } from 'react-redux';
import { getBlogs } from '../features/Blogs/blogSlice';
import SearchItem from './SearchItem';

function SearchContent() {
  const blogs = useSelector(getBlogs);

  if (blogs.length === 0) {
    return (
      <div className="h-full bg-gray-100 text-center text-2xl font-bold">
        No Blog found!
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 justify-items-center gap-10 bg-gray-100 pt-5 pb-50">
      {blogs.map((el) => (
        <SearchItem key={el._id} title={el.title} content={el.content} />
      ))}
    </div>
  );
}

export default SearchContent;
