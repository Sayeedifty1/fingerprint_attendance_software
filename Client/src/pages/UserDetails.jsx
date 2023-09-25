import { useEffect, useState } from "react";

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    // Fetch users from your backend API or database
    useEffect(() => {
        // Replace this URL with the endpoint that fetches your user data
        fetch("http://localhost:3000/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

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
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.category}</td>
                                <td>{user.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;