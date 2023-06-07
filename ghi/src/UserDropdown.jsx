import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutMutation } from "./app/authApiSlice";


const UserDropdownDropdown = () => {
    const navigate = useNavigate();
    const { data: user } = useGetUserQuery();
    const [logout] = useLogoutMutation();

    return (
        <>
            <li tabIndex={0}>
            <div className="dark:hover:text-gray-300 hover:text-gray-700 justify-between dark:hover:bg-[#D3D3D325]">
                {user.full_name}
                <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                >
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
            </div>

            <ul className="p-2 z-10 bg-orange-50 dark:bg-slate-900">
                <div className="border-b border-gray-500">
                <li>
                    <NavLink
                    className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
                    to={"/users/"}
                    >
                    User Home
                    </NavLink>
                </li>
                </div>
                <li>
                <NavLink
                    className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
                    to={"/books/favorites/" + user.username}
                >
                    Favorites
                </NavLink>
                </li>
                <li>
                <NavLink
                    className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
                    to={"/books/previous/" + user.username}
                >
                    Previously Read
                </NavLink>
                </li>
                <li>
                <NavLink
                    className="dark:hover:text-gray-300 dark:hover:bg-slate-700"
                    to={"/books/next/" + user.username}
                >
                    Read Next
                </NavLink>
                </li>
                <div className="border-t border-gray-500">
                <li>
                    <NavLink
                    onClick={async () => {
                        await logout();
                        navigate("/");
                    }}
                    className="bg-orange-50 dark:bg-slate-900 hover:bg-red-400 dark:hover:bg-[#dc262690] txt"
                    >
                    Logout
                    </NavLink>
                </li>
                </div>
            </ul>
            </li>
        </>
    );
};
export default UserDropdownDropdown;
