import { useEffect, useState } from "react";
import merchantsSeed from "../data/merchantData.json";

export default function useMerchants() {
  const [merchants, setMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // dummy  API to load merchant data
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setIsLoading(true);
        setError(null);

        if (!Array.isArray(merchantsSeed)) {
          throw new Error("Merchant dataset is invalid");
        }

        setMerchants(merchantsSeed);
      } catch (err) {
        console.error("Failed to load merchants:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const addMerchant = (merchant) => {
    try {
      setMerchants((prev) => [...prev, { ...merchant, id: crypto.randomUUID() }]);
    } catch (err) {
      console.error("Failed to add merchant", err);
      setError(err);
    }
  };

  const updateMerchant = (id, updates) => {
    try {
      setMerchants((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      );
    } catch (err) {
      console.error("Failed to update merchant", err);
      setError(err);
    }
  };

  return {
    merchants,
    isLoading,error,
    addMerchant,
    updateMerchant,
  };
}
