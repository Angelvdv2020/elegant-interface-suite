// ── Auth ──
export interface EmailLoginRequest {
  email: string;
  password: string;
}

export interface EmailRegisterRequest {
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  access_token: string;
  profile_id: number;
  tg_id: number | null;
  username: string | null;
  role: string;
}

export interface User {
  id: number;
  tg_id: number | null;
  username?: string;
  avatar_url?: string;
  role: string;
  is_activated: boolean;
  balance: number;
  trial: number;
  topics_count: number;
  posts_count: number;
  created_at: string;
}

// ── Tariffs ──
export type BillingType = "fixed" | "traffic";

export interface Tariff {
  id: number;
  name: string;
  group_code?: string;
  duration_days: number;
  price_rub: number | null;
  device_limit: number | null;
  traffic_limit_gb: number | null;
  configurable: boolean;
  billing_type: string;
}

export interface TariffCalculation {
  monthly: number;
  total: number;
  discount_percent: number;
  per_day?: number;
}

// ── Keys ──
export type KeyStatus = "active" | "expired" | "frozen" | "disabled";

export interface VpnKey {
  client_id: string;
  alias?: string;
  server: string;
  tariff_name?: string;
  device_limit: number | null;
  status: KeyStatus;
  expires_at: string | null;
  days_left: number;
  key: string;
  masked_key: string;
  remnawave_link?: string;
}

export interface HwidDevice {
  id: string;
  device_model: string;
  os: string;
  last_connected_at: string;
}

// ── Subscriptions ──
export interface Subscription {
  client_id: string;
  alias?: string;
  email: string;
  server: string;
  tariff_name?: string;
  tariff_group?: string;
  duration_days: number;
  device_limit: number | null;
  traffic_limit_gb: number | null;
  price_rub: number | null;
  status: "active" | "frozen" | "expired";
  expires_at: string | null;
}

// ── Balance & Payments ──
export interface Payment {
  id: number;
  amount: number;
  currency: string;
  payment_system: string;
  status: string;
  created_at: string | null;
  payment_id: string | null;
}

export interface PaymentProvider {
  id: string;
  name: string;
  currency: string;
  note?: string;
  is_active: boolean;
}

export interface CreatePaymentRequest {
  provider_id: string;
  amount: number;
}

export interface PaymentResponse {
  payment_url: string;
  payment_id: string | null;
}

// ── Coupons ──
export interface CouponValidation {
  valid: boolean;
  amount?: number | null;
  percent?: number | null;
  days?: number | null;
  message: string;
}

// ── Referrals ──
export interface ReferralStats {
  referral_link: string;
  total_referrals: number;
  levels: {
    level: number;
    percent: number;
  }[];
}

// ── Gifts ──
export interface GiftActivation {
  success: boolean;
  message: string;
}

// ── Orders ──
export interface OrderResponse {
  status: string;
  message: string;
  bot_url: string;
}

export interface CreateOrderRequest {
  tariff_id: number;
  devices: number;
  traffic_gb: number;
  duration_months: number;
  coupon_code?: string;
}

// ── Subscribe (direct purchase) ──
export interface SubscribeRequest {
  tariff_id: number;
  devices: number;
  traffic_gb: number;
  duration_months: number;
  coupon_code?: string;
}

export interface SubscribeResponse {
  status: string;
  message: string;
  key?: string;
  client_id?: string;
  subscription_url?: string;
  expiry?: string;
  tariff_name?: string;
  price?: number;
  balance?: number;
}

// ── Coupon activation ──
export interface CouponActivateResponse {
  success: boolean;
  message: string;
  credited?: number;
  balance?: number;
  activated?: boolean;
}

// ── Blog / Forum ──
export interface BlogAuthor {
  id: number;
  username: string;
  avatar_url?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sort_order: number;
  admin_only: boolean;
  topics_count: number;
}

export interface BlogTopic {
  id: number;
  category_id: number;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  views_count: number;
  posts_count: number;
  author: BlogAuthor | null;
  created_at: string | null;
  updated_at?: string | null;
}

export interface BlogTopicDetail {
  id: number;
  category_id: number;
  category: { name: string; slug: string; icon?: string } | null;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  views_count: number;
  author: BlogAuthor | null;
  created_at: string | null;
}

export interface BlogComment {
  id: number;
  topic_id: number;
  content: string;
  parent_post_id: number | null;
  author: BlogAuthor | null;
  likes_count: number;
  liked_by: number[];
  created_at: string | null;
}

export interface CreateTopicRequest {
  category_id: number;
  title: string;
  content: string;
}

export interface CreatePostRequest {
  topic_id: number;
  content: string;
  parent_post_id?: number | null;
}
