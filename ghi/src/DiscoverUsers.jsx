import Search from "./Search";
import UserLists from "./UserLists";


const DiscoverUsers = () => {

  return (<>
        <h1 className="card-header text-center">Discover Users</h1>
        <div className="card text-bg-light mb-3">
          <div className="card-body">
            <Search type="User" />
          </div>
        </div>
        <div>
          <UserLists name="User Search"/>
        </div>
    </>)
};

export default DiscoverUsers;
