# NextSaaS Starter Kit

Modern SaaS uygulamaları için hazır Next.js starter kit. TypeScript, Prisma, Stripe, NextAuth.js ve daha fazlası ile birlikte gelir.

[![GitHub](https://img.shields.io/github/stars/erdemgokmuharrem/next-saat-template?style=social)](https://github.com/erdemgokmuharrem/next-saat-template)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)](https://prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF)](https://stripe.com/)

## 🎯 Ne İşe Yarar?

NextSaaS Starter Kit, SaaS uygulamanızı sıfırdan oluşturmak yerine, hazır bir temel üzerine inşa etmenizi sağlar. Bu starter kit ile:

- **Aylar süren geliştirme sürecini 5 dakikaya indirin**
- **Modern SaaS özelliklerini hemen kullanmaya başlayın**
- **Production-ready kod ile hızlı MVP oluşturun**
- **Indie maker'lar ve startup'lar için mükemmel başlangıç noktası**

## 🚀 Hızlı Başlangıç

```bash
# Projeyi klonla
git clone https://github.com/erdemgokmuharrem/next-saat-template.git
cd next-saat-template

# Bağımlılıkları yükle
npm install

# Environment ayarla
cp .env.example .env

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır! 🎉

## 🚀 Özellikler

- **Next.js 15** - App Router ile modern React framework
- **TypeScript** - Type-safe geliştirme
- **TailwindCSS** - Utility-first CSS framework
- **Prisma** - Type-safe veritabanı ORM
- **PostgreSQL** - Güçlü ilişkisel veritabanı
- **NextAuth.js** - Kimlik doğrulama (Google, GitHub, Email/Şifre)
- **Stripe** - Ödeme ve abonelik yönetimi
- **Responsive Design** - Mobil-uyumlu arayüz
- **Docker** - Kolay geliştirme ortamı

## 📦 Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/erdemgokmuharrem/next-saat-template.git
cd next-saat-template
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Environment değişkenlerini ayarlayın

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin ve gerekli değerleri ekleyin:

```env
# Database
DATABASE_URL="postgresql://nextsaas:nextsaas123@localhost:5432/nextsaas"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# SMTP (for password reset)
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="your-mailtrap-user"
SMTP_PASS="your-mailtrap-password"
SMTP_FROM="noreply@nextsaas.com"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID_FREE="price_..."
STRIPE_PRICE_ID_PRO="price_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Veritabanını kurun

#### Docker ile (Önerilen)

```bash
docker-compose up -d
```

#### Manuel PostgreSQL kurulumu

PostgreSQL'i manuel olarak kurun ve veritabanını oluşturun:

```sql
CREATE DATABASE nextsaas;
CREATE USER nextsaas WITH PASSWORD 'nextsaas123';
GRANT ALL PRIVILEGES ON DATABASE nextsaas TO nextsaas;
```

### 5. Veritabanı migration'larını çalıştırın

```bash
npm run db:push
```

### 6. Seed verilerini yükleyin

```bash
npm run db:seed
```

### 7. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint

# Veritabanı migration
npm run db:migrate

# Veritabanı push (hızlı)
npm run db:push

# Prisma client generate
npm run db:generate

# Seed verilerini yükle
npm run db:seed
```

## 🔐 Kimlik Doğrulama Kurulumu

### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/)'a gidin
2. Yeni proje oluşturun veya mevcut projeyi seçin
3. "APIs & Services" > "Credentials" bölümüne gidin
4. "Create Credentials" > "OAuth 2.0 Client IDs" seçin
5. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
6. Client ID ve Secret'ı `.env` dosyasına ekleyin

### GitHub OAuth

1. [GitHub Developer Settings](https://github.com/settings/developers) sayfasına gidin
2. "New OAuth App" butonuna tıklayın
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Client ID ve Secret'ı `.env` dosyasına ekleyin

## 💳 Stripe Kurulumu

### 1. Stripe Hesabı Oluşturun

[Stripe Dashboard](https://dashboard.stripe.com/)'a gidin ve hesap oluşturun.

### 2. API Anahtarlarını Alın

Dashboard > Developers > API keys bölümünden:
- Publishable key (pk_test_...)
- Secret key (sk_test_...)

### 3. Webhook Oluşturun

Dashboard > Developers > Webhooks bölümünden:
- Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
- Events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.updated`, `customer.subscription.deleted`
- Signing secret'ı alın (whsec_...)

### 4. Ürün ve Fiyat Oluşturun

Dashboard > Products bölümünden:
- Free plan: ₺0/ay
- Pro plan: ₺29/ay

Fiyat ID'lerini `.env` dosyasına ekleyin.

## 📧 SMTP Kurulumu

### Mailtrap (Test için)

1. [Mailtrap](https://mailtrap.io/) hesabı oluşturun
2. Inbox oluşturun
3. SMTP ayarlarını alın ve `.env` dosyasına ekleyin

### Production SMTP

SendGrid, AWS SES, veya başka bir SMTP servisi kullanabilirsiniz.

## 🚀 Deployment

### Vercel (Önerilen)

1. [Vercel](https://vercel.com/) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Environment değişkenlerini ekleyin
4. Deploy edin

### Docker

```bash
# Production build
docker build -t nextsaas .

# Container çalıştır
docker run -p 3000:3000 nextsaas
```

## 📁 Proje Yapısı

```
nextsaas/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Auth pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── pricing/        # Pricing page
│   ├── components/         # React components
│   └── lib/               # Utility functions
├── prisma/                # Prisma schema ve migrations
├── marketing/             # Marketing assets
├── docker-compose.yml     # Docker configuration
└── README.md
```

## 🧪 Test

```bash
# Test çalıştır
npm test

# Test coverage
npm run test:coverage
```

## 📝 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 Destek

Sorularınız için:
- GitHub Issues
- Email: support@nextsaas.com

## 🙏 Teşekkürler

Bu proje aşağıdaki harika projelerin üzerine inşa edilmiştir:
- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [Stripe](https://stripe.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)