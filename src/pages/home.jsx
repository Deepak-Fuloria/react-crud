import { Link } from "react-router-dom";


function Home() {


    return (
        <>
            <Link to="/users/add">
                add user
            </Link>
        </>
    );

}


export default Home;