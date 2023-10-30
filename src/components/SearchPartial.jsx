import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";

const SearchPartial = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  
  const searchSubmit = (ev) => {
    console.log("submitted");
    ev.preventDefault();
    const pathname = location.pathname;
    navigate(`${pathname}?filter=${searchInput}`);
  };
  
  const handleInput = (ev) => {
    setSearchInput(ev.target.value);
    const pathname = location.pathname;
    navigate(`${pathname}?filter=${ev.target.value}`);
  };
  
  return (
    <Form onSubmit={searchSubmit}>
      <input
        type="text"
        value={searchInput}
        onInput={handleInput}
        placeholder="Search"
        className="Search"
        aria-label="Search"
      />
    </Form>
  );
};

export default SearchPartial;
