type functionProps = {
  setParam: (param: string) => void;
  brokerValue?: string;
  setSearchParam: (value: string) => void;
};


export function FilterComponent({ setParam, setSearchParam }: functionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 flex gap-10 justify-center xl:justify-start items-center mt-4">
      <span>Filtros</span>
      <button onClick={() => setParam("title")} className="btn btn-primary">
        A-Z
      </button>
      <button onClick={() => setParam("sales")} className="btn btn-warning">
        Vendas
      </button>
       <div className="w-full max-w-3xl h-10 mx-auto grid grid-cols-3 " >
        <label className=" label col-span-1" >Buscar por Nome</label>
        <input
          type="text"
          onChange={(e)=> setSearchParam(e.target.value)}
          className="w-fulla h-full px-4 input input-bordered col-span-2"
        />
      </div>
    </div>
  );
}
