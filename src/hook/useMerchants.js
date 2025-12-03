import { useEffect, useState } from "react";
import merchantsSeed from "../data/merchantData.json";

 export default function useMerchants() {
  const [merchants, setMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fake API load
  useEffect(() => {
    const timer = setTimeout(() => {
      setMerchants(merchantsSeed);
      setIsLoading(false);
    }, 500); // simulate latency
    return () => clearTimeout(timer);
  }, []);

  const addMerchant = (merchant) => {
    setMerchants((prev) => [
      ...prev,
      {
        ...merchant,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const updateMerchant = (id, updates) => {
    setMerchants((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  return {
    merchants,
    isLoading,
    addMerchant,
    updateMerchant,
  };
}
