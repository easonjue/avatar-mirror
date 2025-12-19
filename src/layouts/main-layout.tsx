import { NavLink, Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-1 text-sm transition hover:bg-white/10 ${isActive ? 'bg-white/10 text-white' : 'text-slate-200'}`;

export function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold text-white">
            <span className="text-lg">AviMirror</span>
            <Badge variant="glow">Beta</Badge>
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              首页
            </NavLink>
            <NavLink to="/mirror" className={navLinkClass}>
              镜像生成器
            </NavLink>
            <NavLink to="/auth" className={navLinkClass}>
              登录
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/auth">登录</Link>
            </Button>
            <Button asChild>
              <Link to="/mirror">开始创作</Link>
            </Button>
          </div>

        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
        <Outlet />
      </main>
    </div>
  );
}
