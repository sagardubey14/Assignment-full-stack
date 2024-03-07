const Header = ({ profile, logOut }) => {
  return (
    <div>
      POSTS<br />
      {profile.user.pfp === '' ? <></> : <img src={profile.user.pfp} width="150" height="150" />}
      <div>
        <label>{profile.user.name}</label><br />
        <label>{profile.user.username}</label>
      </div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
}

export default Header;
