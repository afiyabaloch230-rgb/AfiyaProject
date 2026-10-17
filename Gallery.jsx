// import axios from "axios";
// import { useState } from "react";
// function Gallery() {
// const [query, setQuery] = useState("");
// const [images, setImages] = useState([]);
// const searchImages = async () => {
// const response = await axios.get("https://api.unsplash.com/search/photos", {
//       params: { query: query, per_page: 10 },
//       headers: { Authorization: `Client-ID ${import.meta.env.VITE_Afiya}` },
//     });
//     setImages(response.data.results);
//   };
//   return (
//     <div className="container">
//       <h1>Image Search App </h1>
//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search images..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={searchImages}>Search</button>
//       </div>

//       <div className="image-grid">
//         {images.map((image) => (
//           <div className="card" key={image.id}>
//             <img src={image.urls.small} alt={image.alt_description} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Gallery;


import axios from "axios";
import { useState } from "react";

function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const searchImages = async () => {
    if (!query.trim()) {
      setImages([]);
      setMessage("Please enter an image name!");
      return;
    }

    setLoading(true);
    setMessage("");
    setImages([]);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query.trim(),
            per_page: 10,
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_Afiya}`,
          },
        }
      );

      if (response.data.results.length > 0) {
        setImages(response.data.results);
      } else {
        setMessage("Image is not found!");
      }
    } catch (error) {
      console.error("Image search error:", error);
      setMessage("Unable to load images. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Image Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchImages();
            }
          }}
        />

        <button onClick={searchImages} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="image-grid">
        {images.map((image) => (
          <div className="card" key={image.id}>
            <img
              src={image.urls.small}
              alt={image.alt_description || "Searched image"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
