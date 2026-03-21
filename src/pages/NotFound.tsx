import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-4">
    <div className="text-center max-w-md">
      <div className="mb-8">
        <span className="text-[120px] font-extrabold leading-none text-gradient-primary">404</span>
      </div>
      <h1 className="text-2xl font-bold mb-3">Страница не найдена</h1>
      <p className="text-muted-foreground mb-8">
        Возможно, страница была удалена или вы перешли по неверной ссылке
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="cta" asChild>
          <Link to="/"><Home className="h-4 w-4 mr-2" /> На главную</Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Назад
        </Button>
      </div>
    </div>
  </div>
);

export default NotFound;
