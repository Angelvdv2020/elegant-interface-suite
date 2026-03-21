import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-brand items-center justify-center p-12">
        <div className="max-w-sm text-brand-light">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">V</div>
            <span className="text-lg font-semibold">Visually</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Редактируйте сайт визуально</h2>
          <p className="text-sm text-brand-100/70 leading-relaxed">
            Один скрипт — и ваши пользователи редактируют страницы прямо в браузере.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[11px] font-bold text-brand-light">V</div>
            <span className="text-[15px] font-semibold">Visually</span>
          </div>
          <h1 className="text-xl font-bold text-foreground mb-1">Войти</h1>
          <p className="text-sm text-muted-foreground mb-6">Введите email и пароль</p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[13px]">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password" className="text-[13px]">Пароль</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full">Войти</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Нет аккаунта? <Link to="/signup" className="text-brand font-medium hover:underline">Зарегистрироваться</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
