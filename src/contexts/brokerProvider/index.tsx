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
  clearList: () => void;
}

interface BrokerProviderProps {
  children: React.ReactElement;
}
export const BrokerContext = createContext({} as BrokerContextData);

export const BrokerProvider = ({ children }: BrokerProviderProps) => {
  const [brokerList, setBrokerList] = useState<BrokerStateProps[]>(() => {
    const localStorageRow = localStorage.getItem("row");
    return localStorageRow ? JSON.parse(localStorageRow) : [];
  });

  function createList(broker: BrokerStateProps) {
    const brokerIndex = brokerList.findIndex((item) => item.id === broker.id);

    if (brokerIndex !== -1) {
      console.log("O corretor ja está na fila");
      return;
    }

    setBrokerList((prevState) => [...prevState, broker]);

    console.log(brokerList);

    return;
  }

  function clearList() {
    setBrokerList([]);
  }

  useEffect(() => {
    localStorage.setItem("row", JSON.stringify(brokerList));
  }, [brokerList]);

  return (
    <BrokerContext.Provider value={{ brokerList, createList, clearList }}>
      {children}
    </BrokerContext.Provider>
  );
};
