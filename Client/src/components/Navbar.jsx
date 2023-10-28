import { Link } from "react-router-dom";
import { useUser } from "../Provider/UserProvider";

const Navbar = () => {
    const { user, logout } = useUser();

    //    logout function
    const signOut = () => {
        logout();
    }
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Premier University</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {user ? <li>
                            <Link>Welcome: {user.name}</Link>
                            <Link to="dashboard">Dashboard</Link>
                            <Link>Update Info</Link>
                            <Link onClick={signOut}>Logout</Link>
                        </li>
                            :

                            <Link to='/login'><button>Login</button></Link>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;