
import type { Clients } from "../../contexts/brokerProvider";
type ClientsTableProps = {
  data: Clients[];
  pattern: RegExp;
};

export function ClientsTable({data, pattern}: ClientsTableProps) {
  return (
          <div id="clientsWrapper" className="max-w-7xl mx-auto" >
                        <div
          id="ClientsContainer"
          className="w-full bg-white rounded p-4 shadow"
        >
          <p className="text-slate-900 border bg-yellow-400 border-white p-2 rounded ">
            Clientes
          </p>
          <table className="table table-md text-slate-700 ">
            <thead className="text-slate-700">
              <tr>
                <th>Servidor</th>
                <th>Nome</th>
                <th>Salário</th>
                <th>Interesses</th>
                <th>Contato</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((client) => (
                  <tr key={client.id} className="border-b border-slate-200">
                    <th className={client.isServer ? "bg-green-100 w-0 " : "bg-white w-0"  } >{client.isServer ? <span>Servidor</span> : "" }</th>
                    <td>{client.name}</td>
                    <td>{(client.salary).toLocaleString('pt-br',{style:'currency',currency:"BRL"})}</td>
                    <td>{client.interest}</td>
                    <td>{client.contact.toString()
                  .replace(pattern, "$1 ($2) $3 $4 $5")}</td>
                  <td>{client.email}</td>
                  </tr>

                ))} 
            </tbody>
          </table>
        </div>
      </div>
  );
}