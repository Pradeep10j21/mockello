import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GDRoom() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to GD Portal
    navigate("/gd-portal", { replace: true });
  }, [navigate]);

  return null;
}
