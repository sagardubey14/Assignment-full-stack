import './Styles/page.css'

const PostList = ({ data }) => {
  return (
    <div className='unLI'>
      {data.map(d => 
      <div className="posts-container" key={d._id}>
        <p>{d._id}</p>
        <div>HELLO</div>
        <div>HELLO</div>
        <div>HELLO</div>
        <div>HELLO</div>
      </div>)}
    </div>
  );
}

export default PostList;
