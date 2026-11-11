import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Users() {

    const [users, setUsers] = useState([]);


    const getUsers = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/api/users`
            );

            setUsers(response.data.users);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getUsers();

    }, []);


    const handleDelete = async (id) => {

        try {

            const response = await axios.delete(
                `${BASE_URL}/api/users/${id}`
            );

            console.log(response.data);

            getUsers();

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <>

            <Link to="/users/add">
                Add User.
            </Link>


            <table border="1">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Image</th>

                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.id}</td>

                            <td>{user.name}</td>

                            <td>{user.email}</td>

                            <td><img
                                width={50}
                                src={`${BASE_URL}/uploads/${user.image}`}
                                alt={user.name}
                            /></td>

                            <td>

                                <Link to={`/users/edit/${user.id}`}>
                                    Edit
                                </Link>


                                <button
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </>

    );

}


export default Users;