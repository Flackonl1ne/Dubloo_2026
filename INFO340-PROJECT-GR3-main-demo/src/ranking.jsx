import React, { useState } from "react";
import { Link } from "react-router";

import "./index.css";

const restroomData = [
  {
    image: "img/marygates.jpeg",
    title: "Mary Gates Hall - Basement Restroom",
    building: "Mary Gates Hall",
    submitter: "uw_explorer",
    supplies: true,
    wait: "Moderate",
    comfort: "High",
    score: 4.7,
    stars: 5,
    genderNeutral: true,
  },
  {
    image: "img/ode.jpeg",
    title: "Odegaard Library - 1st Floor",
    building: "Odegaard Library",
    submitter: "uw_student",
    supplies: true,
    wait: "Short",
    comfort: "Moderate",
    score: 4.6,
    stars: 4.5,
    genderNeutral: true,
  },
  {
    image: "img/suzzalo.jpeg",
    title: "Suzallo Library - Basement",
    building: "Suzallo Library",
    submitter: "uw_hiddenrestroom",
    supplies: true,
    wait: "Moderate",
    comfort: "Medium",
    score: 4.5,
    stars: 4.5,
    genderNeutral: true,
  },
  {
    image: "img/kanehall.jpeg",
    title: "Kane Hall - 3rd Floor",
    building: "Kane Hall",
    submitter: "uw_panther",
    supplies: true,
    wait: "Short",
    comfort: "Moderate",
    score: 4.5,
    stars: 4.5,
    genderNeutral: false,
  },
  {
    image: "img/sav.jpeg",
    title: "Savery Hall - Ground Floor",
    building: "Savery Hall",
    submitter: "uw_psych101",
    supplies: true,
    wait: "Short",
    comfort: "Fair",
    score: 4.2,
    stars: 4,
    genderNeutral: false,
  },
  {
    image: "img/allen.jpeg",
    title: "Paul G. Allen Center for Computer Science & Engineering - 2nd Floor",
    building: "Paul G. Allen Center for Computer Science & Engineering",
    submitter: "uw_reader",
    supplies: true,
    wait: "Short",
    comfort: "High",
    score: 4.8,
    stars: 5,
    genderNeutral: true,
  },
  {
    image: "img/denny.jpeg",
    title: "Denny Hall - Basement",
    building: "Denny Hall",
    submitter: "uw_historybuff",
    supplies: false,
    wait: "Moderate",
    comfort: "Low",
    score: 3.8,
    stars: 3.5,
    genderNeutral: false,
  },
  {
    image: "img/bagley.jpeg",
    title: "Bagley Hall - 1st Floor Restroom",
    building: "Bagley Hall",
    submitter: "uw_chem101",
    supplies: true,
    wait: "Short",
    comfort: "Fair",
    score: 4.2,
    stars: 4,
    genderNeutral: true,
  },
  {
    image: "img/paccar.jpeg",
    title: "Paccar Hall - Main Floor Restroom",
    building: "Paccar Hall",
    submitter: "uw_bizstudent",
    supplies: true,
    wait: "Moderate",
    comfort: "High",
    score: 4.6,
    stars: 4.5,
    genderNeutral: true,
  },
  {
    image: "img/hub.jpeg",
    title: "HUB - Ground Floor Restroom",
    building: "HUB",
    submitter: "uw_unionvisitor",
    supplies: false,
    wait: "Short",
    comfort: "Moderate",
    score: 4.0,
    stars: 4,
    genderNeutral: false,
  },
];

// List of buildings available for filtering
const buildings = [
  { value: "all", label: "All" },
  { value: "suzzalo", label: "Suzallo Library" },
  { value: "marygates", label: "Mary Gates Hall" },
  { value: "odegaard", label: "Odegaard Library" },
  { value: "kane", label: "Kane Hall" },
  { value: "savery", label: "Savery Hall" },
  { value: "allen", label: "Paul G. Allen Center for Computer Science & Engineering" },
  { value: "denny", label: "Denny Hall" },
  { value: "bagley", label: "Bagley Hall" },
  { value: "paccar", label: "Paccar Hall" },
  { value: "hub", label: "HUB" },
];

// Wait times options for filtering
const waits = [
  { value: "all", label: "All" },
  { value: "wait-short", label: "Short" },
  { value: "wait-moderate", label: "Moderate" },
];

// Supplies available options for filtering
const suppliesOptions = [
  { value: "all", label: "All" },
  { value: "supplies-yes", label: "✅ Yes" },
  { value: "supplies-no", label: "❌ No" },
];

// Gender neutrality options for filtering
const genderOptions = [
  { value: "all", label: "All" },
  { value: "gender-yes", label: "Yes" },
  { value: "gender-no", label: "No" },
];

// Function to filter restrooms based on selected filters
// I used AI (ChatGPT) to help me understand and mark the purpose of each logical judgment
// The debugging efficiency has been improved because it is known that each step may cause some data to be filtered out.
function filterRestrooms(data, filters) {
  return data.filter((item) => {
    if (
      filters.building !== "all" &&
      item.building !== buildings.find((b) => b.value === filters.building).label
    )
      return false;
    if (
      filters.wait !== "all" &&
      item.wait.toLowerCase() !== filters.wait.replace("wait-", "")
    )
      return false;
    if (
      filters.supplies !== "all" &&
      ((filters.supplies === "supplies-yes" && !item.supplies) ||
        (filters.supplies === "supplies-no" && item.supplies))
    )
      return false;
    if (
      filters.gender !== "all" &&
      ((filters.gender === "gender-yes" && !item.genderNeutral) ||
        (filters.gender === "gender-no" && item.genderNeutral))
    )
      return false;
    return true;
  });
}

export default function Ranking() {
  const [filters, setFilters] = useState({
    building: "all",
    wait: "all",
    supplies: "all",
    gender: "all",
  });

// With AI's help, I learned how to use object spread syntax and computed property names.
// This lets me handle updates to multiple filter fields with just one function.
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFilters({
      building: "all",
      wait: "all",
      supplies: "all",
      gender: "all",
    });
  };

  const filteredRestrooms = filterRestrooms(restroomData, filters);

  return (
    <div className="page-content">
      <p>
        Explore the most comfortable and well-maintained restrooms near you.
        Ratings include supplies, wait times, comfort, and gender neutrality.
      </p >
      <div className="filter-bar">
        <button className="clear-filters" onClick={handleClear}>
          Clear Filters
        </button>

        <div className="filter-group">
          <label htmlFor="building-select">Building</label>
          <select
            id="building-select"
            name="building"
            value={filters.building}
            onChange={handleChange}
          >
            {buildings.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="wait-select">Wait Time</label>
          <select
            id="wait-select"
            name="wait"
            value={filters.wait}
            onChange={handleChange}
          >
            {waits.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="supplies-select">Supplies Available</label>
          <select
            id="supplies-select"
            name="supplies"
            value={filters.supplies}
            onChange={handleChange}
          >
            {suppliesOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="gender-select">Gender Neutral</label>
          <select
            id="gender-select"
            name="gender"
            value={filters.gender}
            onChange={handleChange}
          >
            {genderOptions.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ranking-content-container">
        {filteredRestrooms.map((item, idx) => (
          <div className="ranking-item" key={idx}>
            <div
              className="ranking-image"
              style={{ backgroundImage: `url('${item.image}')` }}
            ></div>
            <div className="ranking-content">
              <Link
                to={`/dashboard/${encodeURIComponent(item.title)}`}
                className="ranking-title"
              >
                {item.title}
              </Link>
              <div className="ranking-subtext">
                📍 UW Seattle | Submitted by {item.submitter}
              </div>
              <div className="ranking-details">
                <div>Supplies: {item.supplies ? "✅" : "❌"}</div>
                <div>Wait Time: {item.wait}</div>
                <div>Comfort: {item.comfort}</div>
                <div>
                  Score: {"⭐".repeat(Math.floor(item.score))}
                  {item.score % 1 >= 0.5 ? "☆" : ""} ({item.score}/5)
                </div>
              </div>
              <div className="gender-neutral">
                🚻 Gender Neutral Restroom: {item.genderNeutral ? "✅" : "❌"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}