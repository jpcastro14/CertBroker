import { useParams } from "react-router-dom";
import { useFetchBrokers } from "../../customHooks/useFetchBrokers";

export function SalesTable() {
  const { id } = useParams();
  const { brokerById } = useFetchBrokers("", id);

  return (
    <div
      id="SalesWrapper"
      className="mb-4 max-w-7xl bg-white mt-6 mx-6 xl:mx-auto flex flex-col xl:flex-row xl: shadow rounded-md p-4 gap-4 "
    >
      <div id="SalesContainer" className="w-full bg-white rounded p-4 shadow ">
        <p className="text-slate-900 bg-green-300 p-2 rounded">
          Vendas - {brokerById?.sales.length}
        </p>

        <div id="SalesTable" className="overflow-x-auto">
          <table className="table table-md text-slate-700 ">
            <thead className="text-slate-700">
              <tr>
                <th>#</th>
                <th>Empreendimento</th>
                <th>Valor</th>
                <th>Data da venda</th>
                <th>Comissões</th>
              </tr>
            </thead>
            <tbody>
              {brokerById &&
                brokerById.sales?.map((sale) => (
                  <tr key={sale.id} className="border-b border-slate-200">
                    <th>{sale.id.toString().slice(2, 7).toUpperCase()}</th>
                    <td>{sale.title}</td>
                    <td>
                      {sale.saleValue.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>
                      {new Date(sale.saleDate).getMonth() + 1} /{" "}
                      {new Date(sale.saleDate).getFullYear()}
                    </td>
                    <td>
                      {(sale.saleValue * 0.03).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}

              <tr className="bg-slate-50">
                <th>Total</th>
                <td></td>
                <td id="TotalSalesValue" className="bg-slate-50 font-bold">
                  {brokerById?.sales
                    .reduce((acc, sale) => acc + sale.saleValue, 0)
                    .toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </td>
                <td></td>
                <td id="TotalCommission" className="bg-slate-50 font-bold">
                  {brokerById?.sales
                    .reduce((acc, sale) => acc + sale.saleValue * 0.03, 0)
                    .toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
