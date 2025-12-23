import { Link } from "react-router";

export function AdminPage() {
  return (
    <div id="WrapperContainer" className="w-full max-w-7xl mx-auto mt-6">
      <div className="w-full p-4 border border-slate-300 rounded flex flex-col">
        <h1 className="mb-4 font-semibold ">Gestão de Corretores</h1>
        <div className="flex gap-4">
          <Link to="/">
            <button className="btn w-44 btn-error ">Home</button>
          </Link>

          <button className="btn w-44 btn-primary ">
            Gerenciar corretores
          </button>
          <button className="btn btn-success ">Novo corretor</button>
          <button className="btn btn-warning ">Ranking</button>
        </div>
      </div>
    </div>
  );
}
