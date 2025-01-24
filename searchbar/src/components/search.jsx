import { useState } from "react";
import "./search.css"
function SearchBar(){
    const [search, setSearch]=useState("");
    const handleIpChange=e=>{
        setSearch(e.target.value);
    }
    const handleSearch=()=>{
        alert(`You are searching for ${search}`);
    }
    return(
        <>
        <div className="seachbar">
            <input type="text" value={search} onChange={handleIpChange} className="changeinput" placeholder="Seach here...."></input>
            <button className="searchbtn" onClick={handleSearch}>Search</button>
        </div>
        </>
    )
}
export default SearchBar;