import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if(!token) navigate('/login');
  }, [token]);
  return (
    <div>WowWow!</div>
  );
}

export default Home;