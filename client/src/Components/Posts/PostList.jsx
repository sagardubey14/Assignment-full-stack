import { useEffect } from 'react'

const PostList = ({ data, title, setLoading, handleScroll , setTitle, content, setContent, createPost } ) => {
  useEffect(()=>{
    window.addEventListener("scroll", handleScroll)
    setLoading(true)
    return () => window.removeEventListener("scroll", handleScroll)
  },[])
  
  return (
    <div>
      <div className="flex flex-col items-center mt-8 sm:mt-12">
        <p>ADD-POST</p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 placeholder-gray-500"
        />
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 placeholder-gray-500"
        />
        <button
          onClick={createPost}
          className="w-max max-w-md px-4 py-2 text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <p className="mt-10 border-t-gray-950 border-t-2 text-center">POSTS</p>
      <div className="container mx-auto px-4">
        {/* Apply margin on the sides by setting max-width */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-10">
          {data.map((d) => (
            <div className="bg-white overflow-hidden shadow rounded-lg mb-4" key={d._id}>
              <div className="px-4 sm:px-6 py-4">
                <h3 className="text-lg font-semibold leading-7 text-gray-900 mb-1">Title</h3>
                <p className="text-sm leading-6 text-gray-500 capitalize">{d.title}</p>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium leading-6 text-gray-900">Content</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{d.content}</dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                </dd>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default PostList;
