import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { SearchBox } from "./SearchBox";
import { useDebounceSearch } from "./Debouncing/useDebounceSearch";

const API_URL = "https://dummyjson.com/recipes/search";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const { text, debounceText } = useDebounceSearch(500);
  const [suggestionList, setSuggestionList] = useState<Array<any>>([]);
  const [cacheResult, setCacheResult] = useState<Record<string, Array<any>>>(
    {}
  );

  useEffect(() => {
    if (cacheResult.hasOwnProperty(text)) {
      setSuggestionList(cacheResult[text]);
      return;
    }
    fetch(`${API_URL}?q=${text}`)
      .then((res) => res.json())
      .then((res) => {
        setSuggestionList(res.recipes);
        setCacheResult({ ...cacheResult, [text]: res.recipes });
      })
      .catch((err) => console.log(err));
  }, [text]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchText: string = e.target.value;
    debounceText(searchText);
    setSearchText(e.target.value);
  };

  return (
    <>
      <SearchBox handleChange={handleChange} searchText={searchText} />
      {suggestionList.map((item: any) => {
        return <p style={{ height: "16px" }}>{item.name ?? ""}</p>;
      })}
    </>
  );
}

export default App;
