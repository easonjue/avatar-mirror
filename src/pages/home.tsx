import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 px-6 py-10 shadow-2xl">
        <div className="absolute left-[-80px] top-[-60px] h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-[-60px] bottom-[-80px] h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="glow">轻量 · 灵感</Badge>
              <Badge>高清导出</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              参考 Civitai 的简洁流，创作更克制的头像作品
            </h1>
            <p className="text-sm text-slate-200 md:text-base">
              上传图片即可生成多层镜像头像，保留未来接入 AI 生成的空间。纯前端运行，快速预览与导出。
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/mirror">立即开始</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/mirror">查看生成器</Link>
              </Button>
            </div>
          </div>
          <Card className="glass-panel relative w-full max-w-sm border-white/10 bg-white/5 p-4 text-slate-100">
            <div className="text-sm text-slate-300">设计要点</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>· 精简导航，强调创作入口</li>
              <li>· 暗色玻璃拟态，突出内容卡片</li>
              <li>· 预留 AI 生成区块，后续接入模型</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: '镜像生成器', desc: '多层递归镜像、形态切换、光效控制，一键高清导出。', link: '/mirror' },
          { title: '轻量展示', desc: '参考 Civitai 的卡片流，但更克制，聚焦创作入口。', link: '/mirror' },
          { title: 'AI 扩展位', desc: '后续可挂接文生图/图生图，用一致的布局承载。', link: '/mirror' },
        ].map((item) => (
          <Card key={item.title} className="flex flex-col gap-3 border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <Badge variant="glow">Soon</Badge>
            </div>
            <p className="text-sm text-slate-300">{item.desc}</p>
            <Button asChild variant="ghost" className="w-fit">
              <Link to={item.link}>前往</Link>
            </Button>
          </Card>
        ))}
      </section>
    </div>
  );
}
