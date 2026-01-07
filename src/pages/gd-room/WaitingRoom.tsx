import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to GD Portal
    navigate("/gd-portal", { replace: true });
  }, [navigate]);

  return null;
};

export default WaitingRoom;
