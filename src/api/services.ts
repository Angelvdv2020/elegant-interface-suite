import type {
  Tariff, TariffCalculation, VpnKey, Subscription, Payment,
  PaymentProvider, CreatePaymentRequest, PaymentResponse,
  CouponValidation, ReferralStats, OrderResponse, CreateOrderRequest,
  SubscribeRequest, SubscribeResponse, CouponActivateResponse,
  BlogCategory, BlogTopic, BlogTopicDetail, BlogComment,
  CreateTopicRequest, CreatePostRequest, HwidDevice,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "";

const getToken = () => localStorage.getItem("token");

const headers = (json = true) => {
  const h: Record<string, string> = {};
  const t = getToken();
  if (t) h["Authorization"] = `Bearer ${t}`;
  if (json) h["Content-Type"] = "application/json";
  return h;
};

const api = async <T>(path: string, opts: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers: { ...headers(), ...(opts.headers as Record<string, string> || {}) } });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || err.message || `API error ${res.status}`);
  }
  return res.json();
};

export const tariffService = {
  list: () => api<Tariff[]>("/api/tariffs"),
  calculate: (id: number, devices?: number, trafficGb?: number, durationMonths?: number) => {
    const params: Record<string, string> = {};
    if (devices !== undefined) params.devices = String(devices);
    if (trafficGb !== undefined) params.traffic_gb = String(trafficGb);
    if (durationMonths !== undefined) params.duration_months = String(durationMonths);
    return api<TariffCalculation>(`/api/tariffs/${id}/calculate?${new URLSearchParams(params)}`);
  },
};

export const keyService = {
  list: () => api<VpnKey[]>("/api/keys"),
  rename: (clientId: string, alias: string) =>
    api<void>(`/api/keys/${clientId}/rename`, { method: "POST", body: JSON.stringify({ alias }) }),
  getDevices: (clientId: string) => api<HwidDevice[]>(`/api/keys/${clientId}/devices`),
  removeDevice: (clientId: string, deviceId: string) =>
    api<void>(`/api/keys/${clientId}/devices/${deviceId}`, { method: "DELETE" }),
  deleteHwidDevice: (clientId: string, hwid: string) =>
    api<void>(`/api/keys/${clientId}/hwid/${hwid}`, { method: "DELETE" }),
  freeze: (clientId: string) =>
    api<{ message: string }>(`/api/keys/${clientId}/freeze`, { method: "POST" }),
  unfreeze: (clientId: string) =>
    api<{ expires_at: string }>(`/api/keys/${clientId}/unfreeze`, { method: "POST" }),
  getHwid: (clientId: string) => api<HwidDevice[]>(`/api/keys/${clientId}/hwid`),
  resetHwid: (clientId: string) =>
    api<void>(`/api/keys/${clientId}/hwid/reset`, { method: "POST" }),
};

export const subscriptionService = {
  list: () => api<Subscription[]>("/api/subscriptions"),
  subscribe: (data: SubscribeRequest) =>
    api<SubscribeResponse>("/api/subscribe", { method: "POST", body: JSON.stringify(data) }),
  extend: (clientId: string, months: number, coupon?: string) =>
    api<SubscribeResponse>(`/api/subscriptions/${clientId}/extend`, { method: "POST", body: JSON.stringify({ duration_months: months, coupon_code: coupon }) }),
  freeze: (clientId: string) =>
    api<{ message: string }>(`/api/subscriptions/${clientId}/freeze`, { method: "POST" }),
  unfreeze: (clientId: string) =>
    api<{ message: string }>(`/api/subscriptions/${clientId}/unfreeze`, { method: "POST" }),
};

export const paymentService = {
  providers: () => api<PaymentProvider[]>("/api/payments/providers"),
  create: (data: CreatePaymentRequest) =>
    api<PaymentResponse>("/api/payments/create", { method: "POST", body: JSON.stringify(data) }),
  history: () => api<Payment[]>("/api/payments/history"),
};

export const couponService = {
  validate: (code: string) => api<CouponValidation>(`/api/coupons/validate?code=${code}`),
  activate: (code: string) =>
    api<CouponActivateResponse>("/api/coupons/activate", { method: "POST", body: JSON.stringify({ code }) }),
};

export const referralService = {
  stats: () => api<ReferralStats>("/api/referrals/stats"),
};

export const subscribeService = {
  purchase: (data: SubscribeRequest) =>
    api<SubscribeResponse>("/api/subscribe", { method: "POST", body: JSON.stringify(data) }),
};

export const giftService = {
  activate: (code: string) =>
    api<CouponActivateResponse>("/api/gifts/activate", { method: "POST", body: JSON.stringify({ code }) }),
};

export const orderService = {
  create: (data: CreateOrderRequest) =>
    api<OrderResponse>("/api/orders", { method: "POST", body: JSON.stringify(data) }),
};

export const profileService = {
  changePassword: (oldPassword: string, newPassword: string) =>
    api<{ message: string }>("/api/profile/password", { method: "POST", body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }) }),
};

export const blogService = {
  getCategories: () => api<BlogCategory[]>("/api/blog/categories"),
  getTopics: (params?: { category_id?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.category_id) q.set("category_id", String(params.category_id));
    if (params?.limit) q.set("limit", String(params.limit));
    return api<BlogTopic[]>(`/api/blog/topics?${q}`);
  },
  getTopic: (id: number) => api<BlogTopicDetail>(`/api/blog/topics/${id}`),
  createTopic: (data: CreateTopicRequest) =>
    api<BlogTopic>("/api/blog/topics", { method: "POST", body: JSON.stringify(data) }),
  getComments: (topicId: number) => api<BlogComment[]>(`/api/blog/topics/${topicId}/posts`),
  createComment: (data: CreatePostRequest) =>
    api<BlogComment>(`/api/blog/topics/${data.topic_id}/posts`, { method: "POST", body: JSON.stringify(data) }),
  likeComment: (postId: number) =>
    api<void>(`/api/blog/posts/${postId}/like`, { method: "POST" }),
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const t = getToken();
    const h: Record<string, string> = {};
    if (t) h["Authorization"] = `Bearer ${t}`;
    const res = await fetch(`${API_BASE}/api/blog/upload`, { method: "POST", headers: h, body: formData });
    if (!res.ok) throw new Error("Upload failed");
    return res.json() as Promise<{ url: string }>;
  },
};
