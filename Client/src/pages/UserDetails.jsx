import { useEffect, useState } from "react";

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user data from your backend API or database when the component mounts
        fetchUserData();
    }, []); // The empty dependency array ensures the effect runs once after initial render

    const fetchUserData = async () => {
        try {
            const response = await fetch("https://attserver.vercel.app/users");
            if (response.ok) {
                const userData = await response.json();
                setUsers(userData);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    console.log(users)


    return (
        <div className="text-center">
            <h2 className="m-8 text-3xl font-bold">User Table</h2>
            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;