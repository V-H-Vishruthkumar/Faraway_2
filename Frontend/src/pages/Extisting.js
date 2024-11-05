import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { backendUrl } from "../url";

export function Existing() {
  const [tripId, setTripId] = useState("");
  const navigate = useNavigate();
  async function findTrip(e) {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/findTrip` + tripId);
    const resData = await response.json();
    navigate(`/components/main/${resData.tripId}`);
    if (!response.ok) {
      alert(resData.message);
    }
  }
  return (
    <div>
      <Header />
      <h3>Existing Trip</h3>
      <form className="logincon">
        <input
          type="text"
          placeholder="Enter ID"
          value={tripId}
          onChange={(e) => {
            setTripId(+e.target.value);
          }}
          required
        />
        <div className="loginbtn">
          <button onClick={findTrip}>Search</button>
          <Link to={"/"}>
            <button>Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
