import { useState } from "react";
import { TbBackground } from "react-icons/tb";

function AddArticles() {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");



  return (
    <div style={{ padding: "2rem", backgroundColor: "#2e2b2bff" }}>
      <h1>Aggiungi Articoli (autore: io)</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
        <input
          type="text"
          placeholder="Titolo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Anteprima"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenuto"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
        />
        <input
          type="text"
          placeholder="URL immagine"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Inserisci Articolo</button>
      </form>
    </div>
  );
}

export default AddArticles;
