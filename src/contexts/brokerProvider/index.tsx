import { createContext, useEffect, useState } from "react";

export type Sales = {
  id: number | string;
  title: string;
  saleDate: Date;
  saleValue: number;
  percentageMultiplier: number;
};

export type Clients = {
  id?: string;
  name: string;
  email: string;
  interest: string;
  salary: number;
  contact: number;
  isServer: boolean;
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
  clients: Clients[];
}

export interface BrokerContextData {
  brokerList: BrokerStateProps[];
  createList: (broker: BrokerStateProps) => void;
  clearList: (broker?: BrokerStateProps) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

interface BrokerProviderProps {
  children: React.ReactElement;
}
export const BrokerContext = createContext({} as BrokerContextData);

export const BrokerProvider = ({ children }: BrokerProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [brokerList, setBrokerList] = useState<BrokerStateProps[]>(() => {
    const localStorageRow = localStorage.getItem("row");
    return localStorageRow ? JSON.parse(localStorageRow) : [];
  });

  function createList(broker: BrokerStateProps) {
    const brokerIndex = brokerList.findIndex((item) => item.id === broker.id);

    if (brokerIndex !== -1) {
      setOpen(!open);
      setMessage(
        "O corretor ja está na fila de atendimento! Selecione outro corretor.",
      );
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
      value={{ brokerList, createList, clearList, open, setOpen, message }}
    >
      {children}
    </BrokerContext.Provider>
  );
};
