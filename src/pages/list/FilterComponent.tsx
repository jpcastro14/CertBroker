type functionProps = {
  setParam: (param?: string) => void;
};

export function FilterComponent({ setParam }: functionProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 flex gap-10 justify-start items-center mt-4">
      <span>Filtros</span>
      <button onClick={() => setParam("title")} className="btn btn-primary">
        A-Z
      </button>
      <button onClick={() => setParam()} className="btn btn-warning">
        Vendas
      </button>
    </div>
  );
}
