import { Cards, Container } from "./styles";
import { FaUserPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Cards onClick={() => navigate("/create")}>
        <FaUserPlus style={{ color: "var(--accent-color)", fontSize: 40 }} />
        <span>Cadastrar Currículo</span>
      </Cards>
      <Cards onClick={() => navigate("/search")}>
        <FaSearch style={{ color: "var(--accent-color)", fontSize: 40 }} />
        <span>Pesquisar Currículo</span>
      </Cards>
    </Container>
  );
};

export default Home;
