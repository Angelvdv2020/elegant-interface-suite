import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center p-6">
    <div className="text-center">
      <div className="text-6xl font-extrabold text-muted-foreground/20 mb-4">404</div>
      <h1 className="text-xl font-bold text-foreground mb-2">Страница не найдена</h1>
      <p className="text-sm text-muted-foreground mb-6">Проверьте URL или вернитесь на главную</p>
      <Button asChild>
        <Link to="/">На главную</Link>
      </Button>
    </div>
  </div>
);

export default NotFound;
