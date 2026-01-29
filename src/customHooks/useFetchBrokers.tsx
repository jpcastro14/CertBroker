import { useEffect, useState, type SetStateAction } from "react";
import type { BrokerStateProps } from "../contexts/brokerProvider";
import { fetchBrokers } from "../services/api";

export function useFetchBrokers(filtered?:string, id?:string) {
  const [brokers, setBrokers] = useState<BrokerStateProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;

    fetchBrokers()
      .then((data: BrokerStateProps[]) => {
        if (isMounted) setBrokers(data);
      })
      .catch((e: { message: SetStateAction<string | null> }) => {
        if (isMounted) setError(e.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

      return () => {
        isMounted = false;
      };

  }, [filtered]);
  

  let filteredBrokers: BrokerStateProps[] = brokers;
  let brokerById: BrokerStateProps | null = null;

  if (filtered && filtered !== "sales" && filtered !== "title") {
    filteredBrokers = brokers.filter((broker) =>
      broker.title.toLowerCase().includes(filtered.toLowerCase())
    );
  } else if (filtered === "sales") {
    filteredBrokers = brokers?.slice().sort((a, b) => b.sales.length - a.sales.length);
  } else if (filtered === "title") {
    filteredBrokers = brokers?.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  if (id) {
    brokerById = brokers.find((broker) => String(broker.id) === id) || null;
  }

  return {
    brokers: filteredBrokers,
    brokerById,
    loading,
    error,
  };
}
