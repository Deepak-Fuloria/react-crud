import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EditUser() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        image: null
    });


    const getUser = async () => {

        try {

            const response = await axios.get(
                `${BASE_URL}/api/users/${id}`
            );

            const user = response.data.user;

            setUserInput({
                name: user.name,
                email: user.email,
                image: null
            });

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getUser();

    }, []);


    const handleChange = (e) => {

        if (e.target.name === "image") {

            const data = {
                ...userInput,
                image: e.target.files[0]
            };

            setUserInput(data);

            return;
        }


        const data = {
            ...userInput,
            [e.target.name]: e.target.value
        };

        setUserInput(data);

    };


    const handleSave = async (e) => {

        e.preventDefault();


        const formData = new FormData();

        formData.append("name", userInput.name);
        formData.append("email", userInput.email);


        if (userInput.image) {

            formData.append("image", userInput.image);

        }


        try {

            const response = await axios.put(
                `${BASE_URL}/api/users/${id}`,
                formData
            );

            console.log(response.data);

            navigate("/users");

        } catch (error) {

            console.log(error);

        }

    };


    return (
        <>

            <h1>Edit User</h1>

            <form onSubmit={handleSave}>

                <input
                    type="text"
                    name="name"
                    value={userInput.name}
                    onChange={handleChange}
                    placeholder="name"
                />

                <input
                    type="text"
                    name="email"
                    value={userInput.email}
                    onChange={handleChange}
                    placeholder="email"
                />

                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                />

                <button type="submit">
                    Update
                </button>

            </form>

        </>
    );

}


export default EditUser;