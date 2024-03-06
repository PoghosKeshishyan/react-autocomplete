import { useState, useEffect, useRef } from "react"

export function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [display, setDisplay] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide);
    
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
      .then(response => response.json())
      .then(json => setData(json))
  }, []);

  const handleClickOutSide = (e) => {
    if (!appRef.current.contains(e.target)) setDisplay(false);
  }

  const update = (title) => {
    let str = title.split('').splice(0, 15).join('') + '...';
    setSearch(str);
    setDisplay(false);
  }

  return (
    <div className="App" ref={appRef}>
      <h1>Autocomplete</h1>

      <input
        type='search'
        value={search}
        placeholder="Type to search"
        onChange={e => setSearch(e.target.value)}
        onClick={() => setDisplay(true)}
      />
      
      <div className="Container">
        {
          display && data
            .filter(el => el.title.includes(search))
            .map((el) =>
              <div className="item" key={el.id} onClick={() => update(el.title)}>
                <span>{el.title}</span>
                <img src={el.thumbnailUrl} alt="" width="50px" heigth="50px" />
              </div>
            )
        }
      </div>
    </div>
  )
}
