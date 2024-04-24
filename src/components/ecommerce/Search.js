import { useRouter } from "next/router";
import React, { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    console.log("click");
    router.push({
      pathname: "/products",
      query: {
        search: searchTerm,
      },
    });
    setSearchTerm("");
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <>
      <form>
        <select className="select-active">
          <option>Categorías</option>
          <option>Mujer</option>
          <option>Hombre</option>
          <option>Celulares</option>
          <option>Computadoras</option>
          <option>Electrónica</option>
          <option>Accesorios</option>
          <option>Hogar y Jardín</option>
          <option>Maletas</option>
          <option>Zapatos</option>
          <option>Madre e hijos</option>
        </select>

        <input
          value={searchTerm}
          onKeyDown={handleInput}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Buscar"
        />
      </form>

      {/* <Button>Search</Button> */}
      {/* <button onClick={handleSearch}>search</button> */}
    </>
  );
};

export default Search;
