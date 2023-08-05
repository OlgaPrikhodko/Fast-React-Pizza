import SearchOrder from "@/features/order/SearchOrder";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>

      <SearchOrder />

      <p>Olha</p>
    </header>
  );
};
export default Header;
