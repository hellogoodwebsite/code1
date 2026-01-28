"use client";

import { useForm } from "react-hook-form";

export default function SignInPage() {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <main className="mx-auto w-full max-w-md space-y-6">
      <section className="card space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">Staff sign in</h2>
        <p className="text-sm text-slate-500">
          Use your organization account to access ERPP.
        </p>
      </section>

      <form className="card space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
        </div>
        <button type="submit">Sign in</button>
        <p className="text-sm text-slate-500">
          Need an account? <a className="text-brand-700" href="/auth/sign-up">Sign up</a>
        </p>
      </form>
    </main>
  );
}
