import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { backendUrl } from "../url";

export function Existing() {
  const [tripId, setTripId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function findTrip(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/findTrip/` + tripId);
      const resData = await response.json();
      navigate(`/components/main/${resData.tripId}`);
      if (!response.ok) {
        alert(resData.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Header />
      <h3>Existing Trip</h3>
      <form className="logincon" onSubmit={findTrip}>
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
          <button type="submit">Search</button>
          <Link to={"/"}>
            <button>Back</button>
          </Link>
        </div>
      </form>
      {isLoading && <img src="/1481.gif" alt="Loading..." className="loader" />}
    </div>
  );
}
