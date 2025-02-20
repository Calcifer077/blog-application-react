import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { addBlog, clearBlog } from '../features/Blogs/blogSlice';
import blogService from '../services/apiBlogs';
import SearchContent from '../components/SearchContent';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [searched, setSearched] = useState(false);

  // To dispatch actions of reducers.
  const dispatch = useDispatch();

  if (searchText !== ' ') {
    if (searchText.charAt(searchText.length - 1) === ' ') {
      onSubmit(searchText, searchBy);
    }
  }

  async function onSubmit(searchText, searchBy) {
    try {
      const res = await blogService.searchBlog(searchText, searchBy);

      dispatch(clearBlog());

      res.forEach((el) => {
        dispatch(addBlog(el));
      });

      setSearched(true);
    } catch (err) {
      toast.error(err.message || 'Something went wrong! Please try again.');
    }
  }

  return (
    <>
      <div
        className={`flex w-full flex-col items-center overflow-auto bg-gray-100 p-10 ${searched ? '' : 'h-screen'}`}
      >
        <h1 className="mb-6 text-center text-2xl font-bold">Search here!</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(searchText, searchBy);
          }}
          className="flex gap-4"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-10 w-md rounded-lg border-2 p-3 focus:bg-white focus:outline-none"
          />
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="h-10 cursor-pointer rounded-lg border-2 bg-white p-2"
          >
            <option value="title">Search By Title</option>
            <option value="content">Search By Content</option>
          </select>
        </form>
      </div>
      <div>{searched && <SearchContent />}</div>
    </>
  );
}

export default Search;
