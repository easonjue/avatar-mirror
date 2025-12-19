import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const providers = [
  { key: 'google', label: '使用 Google 登录' },
  { key: 'github', label: '使用 GitHub 登录' },
  { key: 'discord', label: '使用 Discord 登录' },
];

export default function AuthPage() {
  const handleAuth = (provider: string) => {
    alert(`${provider} 登录入口预留，后续接入 OAuth`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">登录 / 注册</h1>
          <p className="text-sm text-slate-300">使用通用账号登录，未来将支持模型生成、云端历史等能力</p>
        </div>
        <Badge variant="glow">OAuth 预留</Badge>
      </div>

      <Card className="glass-panel flex flex-col gap-4 border-white/10 bg-white/5 p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">快捷登录</h2>
          <p className="text-sm text-slate-300">选择常用账号登录，稍后可绑定邮箱或手机号。</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {providers.map((p) => (
            <Button key={p.key} variant="ghost" onClick={() => handleAuth(p.key)}>
              {p.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>尚未准备好？先去体验生成器。</span>
          <Button asChild variant="outline" size="sm">
            <Link to="/mirror">跳过，去体验</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
