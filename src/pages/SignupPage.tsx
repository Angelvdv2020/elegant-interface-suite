import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      return;
    }
    setError("");
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-success-light text-success flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
          <h1 className="text-xl font-bold mb-2">Проверьте почту</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Мы отправили ссылку для подтверждения на <strong>{email}</strong>
          </p>
          <Link to="/login">
            <Button variant="outline">Перейти ко входу</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-brand items-center justify-center p-12">
        <div className="max-w-sm text-brand-light">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">V</div>
            <span className="text-lg font-semibold">Visually</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Попробуйте бесплатно</h2>
          <p className="text-sm text-brand-100/70 leading-relaxed">
            Starter-план бесплатен навсегда. До 3 страниц и базовые блоки.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[11px] font-bold text-brand-light">V</div>
            <span className="text-[15px] font-semibold">Visually</span>
          </div>
          <h1 className="text-xl font-bold text-foreground mb-1">Создать аккаунт</h1>
          <p className="text-sm text-muted-foreground mb-6">Бесплатно. Без карты. За 30 секунд.</p>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[13px]">Имя</Label>
              <Input id="name" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email" className="text-[13px]">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="password" className="text-[13px]">Пароль</Label>
              <Input id="password" type="password" placeholder="Минимум 6 символов" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Создать аккаунт
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Уже есть аккаунт? <Link to="/login" className="text-brand font-medium hover:underline">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
