import { useForm } from "react-hook-form";

type inputProps = {
  email: string;
  password: string;
};

export function Login() {
  const { register, handleSubmit, getValues } = useForm<inputProps>();

  function logvalues() {
    const values = getValues();

    console.log(values.email, values.password);
  }

  return (
    <div className=" w-full overflow-y-hidden flex  justify-center items-center ">
      <div id="form-wrapper" className=" mt-40 p-4">
        <div id="form-body" className="w-full flex flex-col items-stretch">
          <fieldset className="fieldset bg-slate-50 border-slate-300 rounded-box w-100 border p-4">
            <legend className="fieldset-legend text-slate-700 text-2xl ">
              Login
            </legend>

            <label className="label text-slate-300 ">Email</label>
            <input
              {...register("email")}
              type="email"
              className="input input-primary text-slate-700 bg-slate-50 border-slate-300 w-full"
              placeholder="Email"
            />

            <label className="label text-slate-300 ">Password</label>
            <input
              {...register("password")}
              type="password"
              className="input input-primary bg-slate-50 border-slate-300 w-full text-slate-700"
              placeholder="Password"
            />

            <button
              className="btn btn-neutral mt-4"
              onClick={() => handleSubmit(logvalues)()}
            >
              Login
            </button>
            <p className="text-slate-300 justify-self-center">
              JC Technologies
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
