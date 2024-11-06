import { Link } from "react-router-dom";
export function Header() {
  return (
    <div>
      <Link to={"/"} className="Home">
        <h1>✈️ Faraway</h1>
      </Link>
    </div>
  );
}
