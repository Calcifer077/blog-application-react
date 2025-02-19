function Search() {
  return (
    <div className="w-full h-screen p-10 flex flex-col items-center bg-gray-100">
      <h1 className="text-center font-bold text-2xl mb-6">Search here!</h1>
      <form action="">
        <input
          type="text"
          placeholder="Search"
          className="w-md p-3 h-10 border-2 rounded-lg focus:outline-none focus:bg-white"
        />
      </form>
    </div>
  );
}

export default Search;
