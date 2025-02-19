import { useNavigate } from 'react-router-dom';

function BlogItems({ title, content, id }) {
  const navigate = useNavigate();

  return (
    // In 'img' you can see that we have used 'group-hover'. What it means is that it activates when parent element is hovered.
    <div className="group relative min-h-80 w-120 rounded-xl border-2 border-zinc-400 bg-gray-700 text-stone-100 transition-all duration-300 hover:bg-gray-900 hover:text-stone-50 focus:outline-2 focus:outline-offset-2 focus:outline-gray-800">
      {/* Edit Icon - Appears Only on Hover & Has Cursor Pointer */}
      <img
        src="icons8-edit-50.png"
        className="absolute top-2 right-2 h-6 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        onClick={() => navigate(`/updateBlog/${id}`)}
      />
      <h1 className="mb-8 p-2 text-center text-2xl font-bold">{title}</h1>
      <div className="p-4 text-justify text-lg font-[400]">{content}</div>
    </div>
  );
}

export default BlogItems;
