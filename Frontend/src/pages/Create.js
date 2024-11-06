import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../url";
export function Create() {
  const [tripName, setTripName] = useState("");
  const [tripId, setTripId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function createNewTrip(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/newTrip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripName: tripName }),
      });
      if (!response.ok) {
        alert(resData.message);
      }
      const resData = await response.json();
      alert(
        `Use this Trip ID to share the Trip requirements (ID:${resData.tripId})`
      );
      return navigate(`/components/main/${resData.tripId}`);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <h3>Create Trip</h3>
      <form className="logincon" onSubmit={createNewTrip}>
        <input
          type="text"
          placeholder="Enter trip name"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          required
        />
        <div className="loginbtn">
          <button type="submit">Create</button>
          <Link to={"/"}>
            <button>Back</button>
          </Link>
        </div>
      </form>
      {isLoading && <img src="/1493.gif" alt="Loading..." className="loader" />}
    </div>
  );
}
