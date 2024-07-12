import { useEffect, useState } from "react";
import api from "../service/api";

const useCategories = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/v1/categories") // Adjust the URL to match your endpoint
      .then((response) => {
        const categories = response.data.map((category) => ({
          title: category.name,
          id: category.id.toString(),
          column: "Verfügbare Kategorien",
        }));
        setCards(categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { cards, setCards, loading, error };
};

export default useCategories;
