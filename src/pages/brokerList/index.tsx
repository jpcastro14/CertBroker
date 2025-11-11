import { useParams } from "react-router";
import { useContext, useEffect } from "react";
import { BrokerContext } from "../../contexts/brokerProvider";
import { BrokerApi } from "../../services/api";

export function BrokerList() {
  const { brokerList } = useContext(BrokerContext);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await BrokerApi.get(`/brokers/${id}`);
      console.log(response.data);
    };
    getData();
  }, []);

  return (
    <div id="wrapper" className="">
      <p className="text-black text-2xl">{id}</p>
    </div>
  );
}
