# Criminal Minds Game API

🎯 API REST para o jogo Criminal Minds Game

## 🚀 Tecnologias

- **Node.js** + **Express**
- **PostgreSQL** + **Prisma ORM**
- **JWT** Authentication
- **Vercel** Serverless Deploy

## 🌐 Deploy

Deploy automático no Vercel:
- URL: `https://criminal-minds-game-api.vercel.app`
- Health Check: `https://criminal-minds-game-api.vercel.app/api/health`

## 🔧 Environment Variables

```env
BD_URL=postgresql://...
JWT_SECRET=criminal_minds_jwt_secret_2024
NODE_ENV=production
```

## 📊 Endpoints

### Health Check
```bash
GET /api/health
```

### Authentication
```bash
POST /api/auth/register
POST /api/auth/login
```

## 🛠️ Local Development

```bash
npm install
npx prisma generate
npm start
```

## 🎮 Frontend

Frontend hospedado no GitHub Pages:
- URL: `https://thamiresfm.github.io/criminal-minds-game/`
- Repository: `https://github.com/thamiresfm/criminal-minds-game`