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

    // delete a user by id
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("User deleted successfully");
                alert("User deleted successfully");
                fetchUserData(); // Refresh the user data after deletion
            } else {
                console.error("Failed to delete user");
                console.error(await response.text()); // Log any error message from the server
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.category}</td>
                                <td className="flex text-center">
                                    <div>
                                        <button className="p-1 bg-blue-600 rounded-lg text-white mx-6">Edit</button>
                                        <button onClick={() => deleteUser(user._id)} className="p-1 bg-red-600 rounded-lg text-white">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;