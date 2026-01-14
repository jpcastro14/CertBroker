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
  
  if (filtered == "sales") {    
    const brokersbySales = brokers?.sort((a, b) => b.sales.length - a.sales.length);
    return { brokers:brokersbySales};
  }else if (filtered == "title") {
    const brokersbyTitle = brokers?.sort((a, b) => a.title.localeCompare(b.title));
    return { brokers:brokersbyTitle};
  }

  if (id) {
    const filteredBroker = brokers.find((broker) => String(broker.id) === id);
    return { filteredBroker, loading, error };
  } 

  return {brokers}

}
