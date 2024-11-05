import { useState, useEffect } from "react";
import { Item } from "./Item";
import { useParams } from "react-router-dom";
import { backendUrl } from "../url";
export function PackingList({
  items,
  onDeleteItem,
  updateItem,
  clearItem,
  setItems,
  getTripName,
}) {
  const [sortBy, setSortBy] = useState("input");
  let { tripId } = useParams();
  useEffect(() => {
    findTrip();
  }, [tripId]);

  console.log(tripId);
  let sortedItem;
  if (sortBy === "input") {
    sortedItem = items;
  }
  if (sortBy === "discription") {
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  async function addItems() {
    const response = await fetch(`${backendUrl}/addItems`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripItems: items, tripId: tripId }),
    });

    const resData = await response.json();
    console.log(resData);
    if (!response.ok) {
      alert(resData.message);
    }
  }
  async function findTrip() {
    const response = await fetch(`${backendUrl}/findTrip/` + tripId);
    const resData = await response.json();
    setItems(resData.items);
    getTripName(resData.name);
  }
  return (
    <div className="list">
      <ul>
        {sortedItem.map((s) => (
          <Item
            item={s}
            key={s.id}
            onDeleteClick={onDeleteItem}
            updateItem={updateItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By input order</option>
          <option value="discription">Sort By description</option>
          <option value="packed">Sort By packed</option>
        </select>
        <button onClick={() => clearItem()}>Clear list</button>
      </div>
      <button
        onClick={() => {
          addItems();
          alert("The Items have been Saved");
        }}
      >
        Save
      </button>
    </div>
  );
}
