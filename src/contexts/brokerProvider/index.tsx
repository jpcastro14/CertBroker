import { createContext, useEffect, useState } from "react";

export type Sales = {
  id: string;
  title: string;
  saleDate: Date;
  saleValue: number;
};

export interface BrokerStateProps {
  id: number;
  title: string;
  team: "Breno" | "Mara";
  sales: Sales[];
  photo: string;
  creci: number;
  email: string;
  phoneNumber: number;
}

export interface BrokerContextData {
  brokerList: BrokerStateProps[];
  createList: (broker: BrokerStateProps) => void;
  clearList: (broker?: BrokerStateProps) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BrokerProviderProps {
  children: React.ReactElement;
}
export const BrokerContext = createContext({} as BrokerContextData);

export const BrokerProvider = ({ children }: BrokerProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [brokerList, setBrokerList] = useState<BrokerStateProps[]>(() => {
    const localStorageRow = localStorage.getItem("row");
    return localStorageRow ? JSON.parse(localStorageRow) : [];
  });

  function createList(broker: BrokerStateProps) {
    const brokerIndex = brokerList.findIndex((item) => item.id === broker.id);

    if (brokerIndex !== -1) {
      setOpen(!open);
      return;
    }
    setBrokerList((prevState) => [...prevState, broker]);
    return;
  }

  function clearList(broker?: BrokerStateProps) {
    const brokerIndex = brokerList[0];

    if (!broker) {
      setBrokerList(brokerList.filter((item) => item.id !== brokerIndex.id));
      return;
    }
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
