import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "react-bootstrap";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="dark"
      onClick={() => navigate(-1)}
      className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow"
    >
      <ArrowLeft size={20} />
      Volver
    </Button>
  );
};

export default BackButton;
