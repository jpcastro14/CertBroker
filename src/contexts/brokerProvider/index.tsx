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
  clearList: (broker?: BrokerStateProps) => void;
  open: string;
  setOpen: (open: string) => void;
}

interface BrokerProviderProps {
  children: React.ReactElement;
}
export const BrokerContext = createContext({} as BrokerContextData);

export const BrokerProvider = ({ children }: BrokerProviderProps) => {
  const [open, setOpen] = useState<string>("hidden");
  const [brokerList, setBrokerList] = useState<BrokerStateProps[]>(() => {
    const localStorageRow = localStorage.getItem("row");
    return localStorageRow ? JSON.parse(localStorageRow) : [];
  });

  function createList(broker: BrokerStateProps) {
    const brokerIndex = brokerList.findIndex((item) => item.id === broker.id);

    if (brokerIndex !== -1) {
      setOpen("block");
      return;
    }

    setBrokerList((prevState) => [...prevState, broker]);

    console.log(brokerList);

    return;
  }

  function clearList(broker?: BrokerStateProps) {
    const brokerIndex = brokerList[0];

    if (!broker) {
      setBrokerList(brokerList.filter((item) => item.id !== brokerIndex.id));
      return;
    }

    console.log(brokerIndex);
    setBrokerList(brokerList.filter((item) => item.id !== broker.id));
    return;
  }

  useEffect(() => {
    localStorage.setItem("row", JSON.stringify(brokerList));
  }, [brokerList]);

  return (
    <BrokerContext.Provider
      value={{ brokerList, createList, clearList, open, setOpen }}
    >
      {children}
    </BrokerContext.Provider>
  );
};
