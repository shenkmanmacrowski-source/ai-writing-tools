# AI Writing Tools — MVP 需求文档

> 版本：v1.0  
> 日期：2026-04-14  
> 负责人：MVP Team  
> 状态：🟡 初稿

---

## 1. 产品概述

### 1.1 产品定位

**一句话描述：**
面向全球用户的 AI 写作辅助工具集，覆盖社交媒体内容创作与学术论文写作两大核心场景。

**核心价值：**
- 降低写作门槛（英语非母语用户）
- 提升内容质量（语法、专业性、原创性）
- 节省时间（改写、摘要、引用自动化）

### 1.2 目标用户

| 用户群 | 场景 | 核心痛点 |
|--------|------|---------|
| **社交媒体运营者** | Twitter、LinkedIn、Instagram 帖子 | 语言不够地道、表达单调、字数控制难 |
| **留学生 / 学术写作者** | 论文、报告、作业 | 语法错误、引用格式复杂、担心 AI 检测 |
| **跨境营销团队** | 产品文案、广告素材 | 需要多版本改写、本地化表达 |
| **英语学习者** | 日常写作练习 | 不知道自己的表达是否正确地道 |

### 1.3 核心工具矩阵

| # | 工具名称 | 英文名 | 场景归属 | 优先级 |
|---|---------|--------|---------|--------|
| 1 | 改写器 | Rewriter | 社交媒体 + 学术 | P0 |
| 2 | 语法检查器 | Grammar Checker | 社交媒体 + 学术 | P0 |
| 3 | AI 检测器 | AI Detector | 学术 | P0 |
| 4 | 摘要器 | Summarizer | 学术 | P1 |
| 5 | 引用生成器 | Citation Generator | 学术 | P1 |
| 6 | 抄袭检查器 | Plagiarism Checker | 学术 | P1 |

> **P0 = MVP 必须，P1 = MVP 后第一迭代**

---

## 2. 功能需求

### 2.1 改写器（Rewriter）

**功能描述：**
对用户输入的文本进行 AI 改写，优化表达方式。

**输入：**
- 原文（Text，5 - 5000 字符）
- 改写模式（Select）：
  - `social` — 社交媒体风格（活泼、简洁、带 emoji 引导）
  - `academic` — 学术风格（正式、客观、减少主观词）
  - `formal` — 商务正式风格
  - `casual` — 日常随意风格

**输出：**
- 改写后文本（Text）
- 改动高亮对比（可选展示差异）

**技术实现：**
- 调用 OpenAI GPT-4o
- 温度 0.7，max_tokens 2000

---

### 2.2 语法检查器（Grammar Checker）

**功能描述：**
检测并纠正用户文本中的语法、拼写、标点错误。

**输入：**
- 待检查文本（Text，5 - 5000 字符）
- 目标语言（Select：English / 预留扩展）

**输出：**
- 纠正后文本
- 错误列表（位置 + 原文 + 修正建议 + 错误类型）

**错误类型分类：**
- 语法错误（Grammar）
- 拼写错误（Spelling）
- 标点错误（Punctuation）
- 用词不当（Word Choice）
- 句式问题（Sentence Structure）

**技术实现：**
- GPT-4o 作为语法引擎（提示词工程区分错误类型）
- 可选：集成 LanguageTool API 作为备用

---

### 2.3 AI 检测器（AI Detector）

**功能描述：**
判断一段文本是否由 AI 生成，输出置信度。

**输入：**
- 待检测文本（Text，50 - 5000 字符）

**输出：**
- AI 生成概率（Percentage，0-100%）
- 判定结论（Label：AI Generated / Human Written / Mixed）
- 高风险句子标亮（哪些句子最可能是 AI 写的）

**技术实现：**
- 集成 GPTZero API 或 Originality.ai API
- 返回分段概率

---

### 2.4 摘要器（Summarizer）

**功能描述：**
对长文本生成摘要，支持不同长度。

**输入：**
- 原文或文章链接（URL 支持 optional）
- 摘要长度（Select：Short / Medium / Long）
- 摘要语言（默认跟随原文）

**输出：**
- 摘要文本（Bullet Points 或 Paragraph）
- 关键词列表（Tags，3-5 个）

**技术实现：**
- 纯文本：直接 GPT-4o 压缩
- URL：fetch + scraper 提取正文后摘要
- 长度控制通过 max_tokens 实现

---

### 2.5 引用生成器（Citation Generator）

**功能描述：**
根据文献信息自动生成指定格式的引用（APA、MLA、Chicago、IEEE、Harvard 等）。

**输入：**
- 文献类型（Select：Journal Article / Book / Website / Conference Paper）
- 已知字段（Title、Author、Year、DOI、URL 等）
- 输出格式（Select：APA 7th / MLA 9th / Chicago / IEEE / Harvard）

**输出：**
- 格式化引用（Text，可复制）
- 参考文献条目（Text）
- 错误/警告（缺失必填字段提示）

**技术实现：**
- CrossRef API 通过 DOI 自动补全元数据
- 本地格式化逻辑（各引用格式规则）
- 缺失字段时提示用户补全

---

### 2.6 抄袭检查器（Plagiarism Checker）

**功能描述：**
检测文本原创性，标出疑似抄袭来源。

**输入：**
- 待检测文本（Text，100 - 10000 字符）

**输出：**
- 原创性得分（Percentage，0-100%）
- 相似来源列表（URL + 相似段落 + 相似度%）
- 高相似度句子标亮

**技术实现：**
- 集成 Copyscape API 或 Turnitin API
- 纯 API 调用，MVP 阶段不自建爬虫

---

## 3. 非功能需求

### 3.1 国际化（i18n）

| 语言 | 优先级 | 说明 |
|------|--------|------|
| English | P0 | 默认语言，MVP 上线版本 |
| 简体中文 | P1 | 第二语言 |
| 日本語 | P2 | 第三语言 |
| 한국어 | P2 | 第四语言 |
| Español | P2 | 第五语言 |

**UI 文本：**
- 使用 `next-intl` 管理翻译文件
- 各工具有独立的提示词模板（不变形的中英双语支持）

**日期 / 数字格式：**
- 跟随用户浏览器 locale

### 3.2 响应式设计

- Mobile（375px+）：工具卡片 + 单列布局
- Tablet（768px+）：双列工具卡片
- Desktop（1200px+）：三列工具卡片 + 侧边导航

### 3.3 性能要求

| 指标 | 目标 |
|------|------|
| 页面首次加载（FCP） | < 2.5s |
| API 响应时间（P95） | < 5s（AI 工具复杂，合理放宽） |
| 可用性 | 99.5% |

### 3.4 安全与合规

- **数据传输**：全站 HTTPS（Cloudflare 自动）
- **数据存储**：Supabase 数据库，用户文本默认不持久化（如需保存明确告知）
- **GDPR**（欧盟）：隐私政策页面 + Cookie 同意弹窗
- **CCPA**（加州）：不售卖用户数据声明
- **AI 内容**：界面明确标注"AI 辅助生成"，不承担内容责任

---

## 4. 用户流程

### 4.1 游客流程（未登录）

```
首页 → 选择工具 → 输入文本 → 获得结果 → （提示登录保存记录/解锁更多额度）
```

游客有基础免费额度（100 credits），无需注册即可体验。

### 4.2 登录用户流程

```
注册/登录 → 个人仪表盘 → 选择工具 → 使用 → 历史记录查看
```

### 4.3 订阅用户流程

```
注册 → 选择套餐 → Stripe 支付 → 解锁 Pro 权益 → 更高额度 / 高级功能
```

---

## 5. 页面结构

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 工具展示 + 主要 CTA |
| 工具页 | `/tools/[tool]` | 独立工具体验页（Rewriter, Grammar 等） |
| 定价页 | `/pricing` | 免费 + Pro 对比 + Stripe 支付 |
| 注册/登录 | `/auth` | Supabase Auth（Email + Google） |
| 个人中心 | `/dashboard` | 用量统计 + 历史记录 + 订阅管理 |
| 隐私政策 | `/privacy` | GDPR/CCPA 合规 |
| 服务条款 | `/terms` | 法律文本 |

---

## 6. MVP 技术栈

| 层级 | 技术选型 |
|------|---------|
| 前端框架 | Next.js 14（App Router） |
| 样式 | Tailwind CSS |
| 国际化 | next-intl |
| 后端 API | FastAPI（Python） |
| AI 引擎 | OpenAI GPT-4o / Claude-3.5 |
| 外部 API | GPTZero / Originality.ai / Copyscape / CrossRef |
| 数据库 | Supabase（PostgreSQL） |
| 认证 | Supabase Auth |
| 文件存储 | Supabase Storage（未来需求） |
| 支付 | Stripe |
| CDN / 部署 | Cloudflare Pages + Cloudflare Workers |
| 域名 | 可选自定义域名 |

---

## 7. 数据库 Schema（Supabase）

### 7.1 用户表

```sql
create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text,
  plan text not null default 'free',  -- free | pro | team
  credits int not null default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### 7.2 用量日志表

```sql
create table public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  tool text not null,  -- rewriter | grammar | ai_detect | summarize | citation | plagiarism
  input_tokens int,
  output_tokens int,
  credits_used int not null default 1,
  created_at timestamptz default now()
);
```

### 7.3 订阅表

```sql
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  stripe_subscription_id text,
  stripe_customer_id text,
  plan text not null,  -- pro | team
  status text not null,  -- active | canceled | past_due | trialing
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now()
);
```

### 7.4 工具使用量限制（RLS 行级安全）

```sql
-- 免费用户额度扣减
create or replace function deduct_credits(user_id uuid, amount int)
returns void as $$
declare
  current_credits int;
begin
  select credits into current_credits from public.users where id = user_id;
  if current_credits < amount then
    raise exception 'Insufficient credits';
  end if;
  update public.users set credits = credits - amount where id = user_id;
end;
$$ language plpgsql security definer;
```

---

## 8. 定价模型

| 方案 | 价格 | Credits/月 | 工具权限 |
|------|------|-----------|---------|
| **Free** | $0 | 100 | 基础改写 + 语法检查（限 500 字/次） |
| **Pro** | $12/月 | 2000 | 全部工具 + 长文本支持 |
| **Team** | $39/月 | 10000 | Pro + 5 个子账号 + API 访问 |

**Credits 消耗标准（初版）：**

| 工具 | 单次消耗 |
|------|---------|
| Rewriter | 10 |
| Grammar Checker | 5 |
| AI Detector | 8 |
| Summarizer | 15 |
| Citation Generator | 3 |
| Plagiarism Checker | 20 |

---

## 9. MVP 发布计划

### Phase 1：框架搭建（Week 1-2）
- [ ] Next.js 项目初始化 + Tailwind + next-intl
- [ ] Supabase 项目创建 + Schema 迁移
- [ ] Cloudflare Pages 部署流水线
- [ ] 基础 UI 组件库（Button、Card、Input、Select）

### Phase 2：工具 API 打通（Week 3-4）
- [ ] FastAPI 项目 + OpenAI 集成
- [ ] 六个工具各完成一个 API Endpoint
- [ ] API 鉴权（简单 API Key 验证）
- [ ] 额度扣减逻辑

### Phase 3：前端串联（Week 5-6）
- [ ] 六个工具的前端页面
- [ ] 结果展示组件（高亮对比、错误列表）
- [ ] 首页 + 工具导航

### Phase 4：认证 + 付费（Week 7-8）
- [ ] Supabase Auth（Email + Google）
- [ ] Stripe 订阅接入
- [ ] 个人中心（用量仪表盘）

### Phase 5：合规 + 上线（Week 9）
- [ ] 隐私政策 + 服务条款
- [ ] Cookie 弹窗（GDPR）
- [ ] 正式域名 + 上线

---

## 10. 已知风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|---------|
| AI API 成本超收入 | 高 | 先用免费额度测试，定价参考 API 成本 |
| 抄袭检测 API 贵 | 中 | MVP 只集成最低配方案，后期可换 |
| 学术用户对准确性要求极高 | 中 | 引用生成加"请人工核对"提示 |
| 欧盟 AI Act 合规 | 低 | 界面标注 AI 辅助，不做唯一判断依据 |
| 多语言翻译质量参差 | 中 | 初期只做英文，提示词工程优化 |

---

## 11. 不在 MVP 范围

以下功能在 MVP 发布后迭代考虑，不在本版范围内：

- [ ] Chrome 插件
- [ ] Word / Google Docs 插件
- [ ] 团队协作功能
- [ ] 多语言 UI（除英文外）
- [ ] 批量处理（一次处理多段文本）
- [ ] API 开放（给第三方调用）
- [ ] 品牌定制（白标）

---

## 12. 附录

### 12.1 竞品参考

| 竞品 | 亮点 | 可借鉴 |
|------|------|--------|
| Grammarly | 浏览器插件 + 实时纠错 | 交互体验 |
| QuillBot | 改写功能强，界面简洁 | 改写模式设计 |
| Jasper | 模板丰富，品牌感强 | 定价策略 |
| GPTZero | AI 检测权威 | 学术场景切入 |

### 12.2 参考链接

- OpenAI API：https://platform.openai.com/
- Supabase：https://supabase.com/
- Cloudflare Pages：https://pages.cloudflare.com/
- Stripe：https://stripe.com/
- CrossRef API：https://www.crossref.org/documentation/retrieve-metadata/rest-api/

---

*本文档为 MVP 版本，随着用户反馈迭代更新。*
