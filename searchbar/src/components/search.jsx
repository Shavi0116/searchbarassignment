import { useState, useEffect, useRef } from "react";
import { searchQuestions } from "../services/searchService"; 
import "./search.css";

const sampleQuestions = [
  "Rearrange the letters to form a word",
  "Rearrange the words to form a sentence",
  "In my previous job, I often had to complete tasks ______ tight deadlines.",
  "My commitment to journalistic integrity makes me a well-suited candidate to join your ______ team.",
  "In my previous role, I honed an adeptness at navigating through the intricacies of complex legal documents."
];

const SearchBox = () => {
  const [query, setQuery] = useState(""); 
  const [placeholder, setPlaceholder] = useState("");
  const [results, setResults] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [inputWidth, setInputWidth] = useState(300); 

  const placeholderRef = useRef(""); 
  const spanRef = useRef(null); 

  useEffect(() => {
    let typingTimer;
    let charIndex = 0;

    const typeEffect = () => {
      const question = sampleQuestions[currentQuestionIndex];
      if (charIndex < question.length) {
        placeholderRef.current += question[charIndex]; 
        setPlaceholder(placeholderRef.current);
        charIndex++;
        typingTimer = setTimeout(typeEffect, 100);
      } else {
        setTimeout(() => {
          placeholderRef.current = ""; 
          setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % sampleQuestions.length); 
        }, 2000); 
      }
    };

    typeEffect();

    return () => clearTimeout(typingTimer); 
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 20); 
    }
  }, [placeholder]); 

  const handleSearch = async () => {
    try {
      const response = await searchQuestions(query, 1, 10); 
      setResults(response.questions || []); 
    } catch (error) {
      console.error("Error fetching search results:", error); 
    }
  };

  return (
    <div className="search-container">
      <h1>What Can I Help You With?</h1>
      <span
        ref={spanRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          fontSize: "18px",
          padding: "10px"
        }}
      >
        {placeholder}
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          fontSize: "18px",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          margin: "10px auto",
          display: "block",
          width: `${inputWidth}px`,
          transition: "width 0.3s ease", 
          maxWidth: "600px" 
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px"
        }}
      >
        Search
      </button>
      <ul>
        {results.map((question, index) => (
          <li key={index}>{question.title}</li> 
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
