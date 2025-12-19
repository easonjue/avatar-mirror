import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8787;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const DEMO_USER = {
  email: 'demo@site.com',
  password: 'demo123',
  name: 'Demo User',
  token: 'demo-token',
};

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    res.cookie('token', DEMO_USER.token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res.json({ success: true, token: DEMO_USER.token, user: { email: DEMO_USER.email, name: DEMO_USER.name } });
  }
  return res.status(401).json({ success: false, message: '邮箱或密码不正确（demo@site.com / demo123）' });
});

app.get('/api/me', (req, res) => {
  const bearer = req.headers.authorization?.replace('Bearer ', '');
  const token = bearer || req.cookies.token;
  if (token === DEMO_USER.token) {
    return res.json({ authenticated: true, user: { email: DEMO_USER.email, name: DEMO_USER.name } });
  }
  return res.status(401).json({ authenticated: false });
});

app.post('/api/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'avatar-backend', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[server] running at http://localhost:${PORT}`);
});
