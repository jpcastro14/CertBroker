import { createContext, useEffect, useState } from "react";

export type Sales = {
  id: number;
  title: string;
  date: string;
};

export interface BrokerStateProps {
  id: number;
  title: string;
  team: string;
  sales: Sales[];
}

export interface BrokerContextData {
  brokerList: BrokerStateProps[];
  createList: (broker: BrokerStateProps) => void;
}

interface BrokerProviderProps {
  children: React.ReactElement;
}
export const BrokerContext = createContext({} as BrokerContextData);

export const BrokerProvider = ({ children }: BrokerProviderProps) => {
  const [brokerList, setBrokerList] = useState<BrokerStateProps[]>([]);

  function createList(broker: BrokerStateProps) {
    const brokerIndex = brokerList.findIndex((item) => item.id === broker.id);

    if (brokerIndex !== -1) {
      console.log("O corretor ja está na fila");
      return;
    }

    setBrokerList((prevState) => [...prevState, broker]);
    localStorage.setItem("row", JSON.stringify(brokerList));

    console.log(brokerList);

    return;
  }

  function CheckRow() {
    const json = localStorage.getItem("row");

    if (!json) {
      return null;
    }

    const row = JSON.parse(json);

    return row ?? null;
  }

  useEffect(() => {
    const fila = CheckRow();
    if (fila) {
      setBrokerList(fila);
    }
  }, []);

  return (
    <BrokerContext.Provider value={{ brokerList, createList }}>
      {children}
    </BrokerContext.Provider>
  );
};
