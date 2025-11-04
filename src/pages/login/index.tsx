import { useForm } from "react-hook-form";
import { userschema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/authProvider/useAuth";
import type { UserFormProps } from "./types";

export function Login() {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserFormProps>({
    mode: "onSubmit",
    resolver: zodResolver(userschema),
  });

  async function handleLogin() {
    const values = getValues();
    try {
      await auth.authenticate(values.email, values.password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-4 overflow-y-hidden flex justify-center items-center  ">
      <fieldset className="fieldset gap-3 bg-slate-100 border-slate-300 rounded-box w-100 h-100 border p-4 mt-30">
        <legend className="fieldset-legend text-slate-700 text-3xl pb-8 ">
          Login
        </legend>

        <label className="label text-slate-700 ">Email</label>
        <input
          {...register("email")}
          type="email"
          className="input input-primary text-slate-700 bg-slate-50 border-slate-300 w-full"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-400 -my-1.5 ">{errors.email.message}</p>
        )}

        <label className="label text-slate-700 ">Password</label>
        <input
          {...register("password")}
          type="password"
          className="input input-primary bg-slate-50 border-slate-300 w-full text-slate-700"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-400 -my-1.5">{errors.password.message}</p>
        )}

        <button
          className="btn bg-blue-900 mt-4"
          onClick={() => handleSubmit(handleLogin)()}
        >
          Login
        </button>
        <p className="text-slate-400 justify-self-center mt-2">
          JC Technologies
        </p>
      </fieldset>
    </div>
  );
}
