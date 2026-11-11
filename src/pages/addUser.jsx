import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddUser() {

    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        image: ""
    });


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
        formData.append("image", userInput.image);


        try {

            const response = await axios.post(
                `${BASE_URL}/api/users`,
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
            <form onSubmit={handleSave}>

                <input
                    type="text"
                    onChange={handleChange}
                    name="name"
                    placeholder="name"
                />

                <input
                    type="text"
                    onChange={handleChange}
                    name="email"
                    placeholder="email"
                />

                <input
                    type="file"
                    onChange={handleChange}
                    name="image"
                />

                <button type="submit">
                    save
                </button>

            </form>
        </>
    );

}


export default AddUser;