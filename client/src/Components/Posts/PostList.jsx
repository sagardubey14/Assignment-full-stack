import './Styles/page.css'

const PostList = ({ data }) => {
  return (
    <div className='unLI'>
      {data.map(d => 
      <div className="posts-container" key={d._id}>
        <p className='title'>{d.title}</p>
        <p className='content'>{d.content}</p>
      </div>)}
    </div>
  );
}

export default PostList;
