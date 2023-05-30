import { Link } from "react-router-dom"


const UserCard = ({ user }) => {
    return (<>
        <div className="card mb-3 txt">
            <div className="card-title">{user.username}</div>
            <Link to={`/books/favorites/${user.username}/`}>Favorites</Link>
            <Link to={`/books/previous/${user.username}/`}>Previously Read</Link>
            <Link to={`/books/next/${user.username}/`}>Read Next</Link>
        </div>
    </>);
}

export default UserCard;
