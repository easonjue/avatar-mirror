import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

const SAMPLE_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDQ4MCA0ODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agc3RvcC1jb2xvcj0iI2M0MzdlZSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM0ZjhmZjYiIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsaWciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNmZjlkNjYiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjZmY1YTMxIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjQ4MCIgZmlsbD0idXJsKCNncmFkKSIvPjxjaXJjbGUgY3g9IjI0MCIgY3k9IjIwNSIgcj0iMTMwIiBmaWxsPSJ1cmwoI2xpZykiIG9wYWNpdHk9Ii44Ii8+PGNpcmNsZSBjeD0iMjQwIiBjeT0iMjQwIiByPSI4MCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMGIxMDIxIiBmb250LXNpemU9IjcyIiBmb250LWZhbWlseT0iQXJpYWwiPkF2YXRhciE8L3RleHQ+PC9zdmc+';

const BASE_SIZE = 340;
const MAX_LAYERS = 8;

export default function MirrorPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState('');
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_IMAGE);
  const [depth, setDepth] = useState(5);
  const [spread, setSpread] = useState(14);
  const [rotation, setRotation] = useState(2.5);
  const [scaleDecay, setScaleDecay] = useState(0.9);
  const [shape, setShape] = useState<'rounded' | 'circle' | 'hex'>('rounded');
  const [glow, setGlow] = useState<'on' | 'off'>('on');
  const [grain, setGrain] = useState(false);
  const [bg, setBg] = useState<'dark' | 'gradient' | 'soft'>('gradient');
  const [preset, setPreset] = useState<'neon' | 'prism' | 'minimal'>('neon');
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file?: File) => {

    if (!file) return;
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isImage) {
      alert('仅支持 JPG / PNG 图片');
      return;
    }
    if (!isLt4M) {
      alert('图片需小于 4MB');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImageUrl(e.target.result);
      }
    };
  };

  const applyPreset = (p: typeof preset) => {
    setPreset(p);
    if (p === 'neon') {
      setGlow('on');
      setScaleDecay(0.9);
      setSpread(16);
      setRotation(2.8);
      setBg('gradient');
    }
    if (p === 'prism') {
      setGlow('on');
      setScaleDecay(0.88);
      setSpread(12);
      setRotation(3.2);
      setShape('hex');
      setBg('soft');
    }
    if (p === 'minimal') {
      setGlow('off');
      setScaleDecay(0.93);
      setSpread(10);
      setRotation(1.2);
      setShape('rounded');
      setBg('dark');
    }
  };

  const onSave = () => {
    if (!previewRef.current) return;
    html2canvas(previewRef.current, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    })

      .then((canvas) => {
        canvas.toBlob((blob) => {
          if (!blob) return;
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `avatar_${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(link.href);
        }, 'image/png');
      })
      .catch((err) => {
        console.error('保存失败', err);
        alert('保存失败，请重试');
      });
  };

  const resetAll = () => {
    setDepth(5);
    setSpread(14);
    setRotation(2.5);
    setScaleDecay(0.9);
    setShape('rounded');
    setGlow('on');
    setImageUrl(SAMPLE_IMAGE);
    setFileName('');
  };

  const layers = Array.from({ length: Math.min(depth, MAX_LAYERS) }).map((_, idx) => {
    const scale = Math.pow(scaleDecay, idx);
    const size = BASE_SIZE * scale;
    const offset = spread * idx * 0.6;
    const rotDir = idx % 2 === 0 ? 1 : -1;
    const rot = rotDir * rotation * (1 + idx * 0.12);
    const radius = shape === 'circle' ? '50%' : shape === 'hex' ? '18px' : '20px';
    const clip =
      shape === 'hex'
        ? 'polygon(25% 5%, 75% 5%, 95% 50%, 75% 95%, 25% 95%, 5% 50%)'
        : 'none';
    const shadow =
      glow === 'on'
        ? '0 18px 45px rgba(99,102,241,0.45), 0 6px 18px rgba(14,165,233,0.25)'
        : '0 12px 28px rgba(0,0,0,0.35)';

    return {
      id: idx,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        top: `${offset}px`,
        left: `${offset}px`,
        transform: `rotate(${rot}deg)` as const,
        opacity: Math.max(0.35, 1 - idx * 0.12),
        borderRadius: radius,
        clipPath: clip,
        boxShadow: shadow,
        backgroundBlendMode: grain ? 'soft-light' : 'normal',
      },
      hover: rot * 0.4,
    };
  });

  const previewBgClass =
    bg === 'gradient'
      ? 'bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.14),rgba(14,165,233,0.06)),#0b1021]'
      : bg === 'soft'
        ? 'bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.08),rgba(79,70,229,0.12)),#0b1021]'
        : 'bg-slate-950';

  return (

    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">镜像头像生成器</h1>
          <p className="text-sm text-slate-300">精简界面，保留未来 AI 入口，专注上传、调节与导出</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="glow">高清导出</Badge>
          <Badge>纯前端</Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr,1.2fr]">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => fileInputRef.current?.click()}>上传图片</Button>
            <Button
              variant="ghost"
              onClick={() => {
                setImageUrl(SAMPLE_IMAGE);
                setFileName('内置示例图');
              }}
            >
              示例图
            </Button>
            <Button variant="ghost" onClick={resetAll}>
              重置
            </Button>
            <Button onClick={onSave}>保存高清 PNG</Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          <Input value={fileName} readOnly placeholder="选择或拖拽图片后显示文件名" className="bg-white/5" />
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>镜像层数</span>
                <span className="text-sky-300">{depth}</span>
              </div>
              <Slider value={[depth]} min={3} max={8} step={1} onValueChange={([v]) => setDepth(v)} />
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>偏移强度</span>
                <span className="text-sky-300">{spread}px</span>
              </div>
              <Slider value={[spread]} min={8} max={24} step={1} onValueChange={([v]) => setSpread(v)} />
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>旋转幅度</span>
                <span className="text-sky-300">{rotation.toFixed(1)}°</span>
              </div>
              <Slider value={[rotation]} min={0} max={6} step={0.1} onValueChange={([v]) => setRotation(v)} />
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>缩放衰减</span>
                <span className="text-sky-300">{scaleDecay.toFixed(2)}</span>
              </div>
              <Slider value={[scaleDecay]} min={0.75} max={0.95} step={0.01} onValueChange={([v]) => setScaleDecay(v)} />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-sm text-slate-200">镜像形态</div>
              <ToggleGroup
                type="single"
                value={shape}
                onValueChange={(v) => v && setShape(v as 'rounded' | 'circle' | 'hex')}
              >
                <ToggleGroupItem value="rounded">圆角</ToggleGroupItem>
                <ToggleGroupItem value="circle">圆形</ToggleGroupItem>
                <ToggleGroupItem value="hex">六边形</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-sm text-slate-200">特效</div>
              <ToggleGroup
                type="single"
                value={glow}
                onValueChange={(v) => v && setGlow(v as 'on' | 'off')}
              >
                <ToggleGroupItem value="on">霓虹辉光</ToggleGroupItem>
                <ToggleGroupItem value="off">柔和阴影</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-sm text-slate-200">快速预设</div>
              <ToggleGroup
                type="single"
                value={preset}
                onValueChange={(v) => v && applyPreset(v as typeof preset)}
              >
                <ToggleGroupItem value="neon">霓虹层叠</ToggleGroupItem>
                <ToggleGroupItem value="prism">棱镜六边</ToggleGroupItem>
                <ToggleGroupItem value="minimal">极简平滑</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-sm text-slate-200">背景&质感</div>
              <ToggleGroup
                type="single"
                value={bg}
                onValueChange={(v) => v && setBg(v as typeof bg)}
              >
                <ToggleGroupItem value="gradient">渐变</ToggleGroupItem>
                <ToggleGroupItem value="soft">柔光</ToggleGroupItem>
                <ToggleGroupItem value="dark">纯暗</ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup
                type="single"
                value={grain ? 'grain-on' : 'grain-off'}
                onValueChange={(v) => setGrain(v === 'grain-on')}
              >
                <ToggleGroupItem value="grain-on">加颗粒质感</ToggleGroupItem>
                <ToggleGroupItem value="grain-off">干净</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <Card
            className={`border-dashed border-white/25 bg-white/5 text-center transition ${dragActive ? 'border-sky-300/80 bg-sky-500/10' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0];
              handleFile(file);
            }}
          >
            <p className="text-base font-semibold text-white">拖拽图片到此处</p>
            <p className="text-sm text-slate-300">支持拖拽或点击上传，支持 JPG / PNG，建议 512×512+</p>
          </Card>

        </Card>

        <div className="relative flex items-center justify-center">
          <div className="absolute -left-10 -top-6 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -right-8 bottom-0 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
          <div
            ref={previewRef}
            className={`relative flex min-h-[440px] w-full max-w-[520px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-6 shadow-2xl ${previewBgClass}`}
          >
            <div className="absolute left-4 top-4 h-40 w-40 animate-float rounded-full bg-indigo-500/25 blur-3xl" />
            <div className="absolute bottom-6 right-6 h-36 w-36 animate-float rounded-full bg-sky-400/25 blur-3xl" />
            {grain && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0,transparent_55%)] mix-blend-soft-light opacity-70" />}

            <div className="relative h-[360px] w-[360px]">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="absolute border-4 border-white/15 bg-cover bg-center transition-transform duration-500"
                  style={{
                    ...layer.style,
                    backgroundImage: `url(${imageUrl})`,
                    transform: `${layer.style.transform} scale(1)` as string,
                    mixBlendMode: bg === 'soft' ? 'screen' : 'normal',
                  }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `${layer.style.transform} scale(1.01) rotate(${layer.hover}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `${layer.style.transform} scale(1)`;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
