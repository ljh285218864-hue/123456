# ShareMall 部署说明

## 1. 必需环境变量

```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="replace-with-long-random-secret"
NEXT_PUBLIC_SITE_NAME="ShareMall"
NEXT_PUBLIC_SUPPORT_WHATSAPP=""
PAYPAL_CLIENT_ID=""
PAYPAL_CLIENT_SECRET=""
PAYPAL_WEBHOOK_ID=""
PAYPAL_API_BASE="https://api-m.paypal.com"
ADMIN_BOOTSTRAP_EMAIL="your-admin-email@example.com"
ADMIN_BOOTSTRAP_PASSWORD="set-a-strong-password"
OFFICIAL_ACCOUNT_PASSWORD="set-a-strong-password"
JOB_SECRET="set-a-job-secret"
```

## 2. 本地开发

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## 3. Vercel 部署

1. 在 Vercel 导入 GitHub 仓库。
2. 设置上面的环境变量。
3. 连接 PostgreSQL 数据库，例如 Neon、Supabase 或 Railway PostgreSQL。
4. 部署后运行数据库迁移：

```bash
npm run prisma:deploy
npm run prisma:seed
```

## 4. 定时任务

`vercel.json` 已配置：

- 每天运行 `/api/jobs/auto-confirm`
- 每天运行 `/api/jobs/settle-commissions`

如果设置了 `JOB_SECRET`，调用定时任务时需要在请求头中传入 `x-job-secret`。

## 5. PayPal

第一版使用 PayPal Checkout 作为统一支付入口，用户可使用 PayPal 账户或信用卡支付。

沙盒环境：

```bash
PAYPAL_API_BASE="https://api-m.sandbox.paypal.com"
```

正式环境：

```bash
PAYPAL_API_BASE="https://api-m.paypal.com"
```
