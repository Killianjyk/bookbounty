

const UserCard = ({ user }) => {
    return (<>
        <div className="card mb-3 txt">
            <div className="card-title">{user.username}</div>
        </div>
    </>);
}

export default UserCard;
