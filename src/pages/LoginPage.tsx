import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const { user, loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Введите email");
    if (password.length < 6) return setError("Пароль минимум 6 символов");
    setLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
      navigate("/dashboard");
    } catch (err: any) {
      const msg = typeof err === "string" ? err : err?.message || err?.detail || "Ошибка авторизации";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    fontSize: 14,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "#e8f0e8",
    outline: "none",
    transition: "border-color 0.2s",
    minHeight: 48,
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05090f",
        color: "#e8f0e8",
        fontFamily: "'Mulish', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Noise overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='login-n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23login-n)' opacity='0.03'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      {/* Subtle grid bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Glow orb */}
      <div
        style={{
          position: "fixed",
          zIndex: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Center layout */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            marginBottom: 36,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2C14 2 22 5 24 7L24 17Q24 23 14 26Q4 23 4 17L4 7C6 5 14 2 14 2Z"
              fill="rgba(0,255,136,0.08)"
              stroke="#00ff88"
              strokeWidth="1.2"
            />
            <rect
              x="10"
              y="13"
              width="8"
              height="7"
              rx="2"
              fill="rgba(0,255,136,0.2)"
              stroke="#00ff88"
              strokeWidth="0.8"
            />
            <path
              d="M11.5 13L11.5 10.5Q11.5 8 14 8Q16.5 8 16.5 10.5L16.5 13"
              fill="none"
              stroke="#00ff88"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Northline<span style={{ color: "#00ff88" }}>VPN</span>
          </span>
        </Link>

        {/* Card */}
        <div
          style={{
            background: "#080f16",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "40px 36px",
            width: "100%",
            maxWidth: 420,
            boxShadow:
              "0 0 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,136,0.04)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top green gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)",
            }}
          />

          {/* Card title */}
          <div
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: 22,
              fontWeight: 900,
              color: "#fff",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Вход в аккаунт
          </div>

          {/* Card subtitle */}
          <div
            style={{
              fontSize: 13,
              color: "rgba(232,240,232,0.45)",
              textAlign: "center",
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            Войдите для доступа к личному кабинету
          </div>

          {/* Error message */}
          {error && (
            <div
              style={{
                marginBottom: 20,
                borderRadius: 12,
                background: "rgba(255,60,60,0.1)",
                border: "1px solid rgba(255,60,60,0.3)",
                padding: "12px 16px",
                fontSize: 13,
                color: "#ff6b6b",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "24px 0",
                gap: 16,
              }}
            >
              <div
                className="animate-spin"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid #00ff88",
                  borderTopColor: "transparent",
                }}
              />
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(232,240,232,0.45)",
                }}
              >
                Авторизация...
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(232,240,232,0.7)",
                    marginBottom: 6,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(232,240,232,0.7)",
                    marginBottom: 6,
                  }}
                >
                  Пароль
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Минимум 6 символов"
                    required
                    style={{ ...inputStyle, paddingRight: 44 }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(232,240,232,0.45)",
                      padding: 4,
                      display: "flex",
                    }}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  minHeight: 48,
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #00ff88, #00cc6a)",
                  color: "#000",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? "Вход..." : "Войти"}
              </button>

              <div
                style={{
                  fontSize: 13,
                  color: "rgba(232,240,232,0.5)",
                  textAlign: "center",
                }}
              >
                Нет аккаунта?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#00ff88",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Зарегистрироваться
                </Link>
              </div>
            </form>
          )}

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.07)",
              marginTop: 20,
              marginBottom: 20,
            }}
          />

          {/* Legal */}
          <div
            style={{
              fontSize: 11,
              color: "rgba(232,240,232,0.45)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Входя, вы соглашаетесь с{" "}
            <Link
              to="/terms"
              style={{
                color: "#00ff88",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              условиями
            </Link>{" "}
            и{" "}
            <Link
              to="/privacy"
              style={{
                color: "#00ff88",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              политикой конфиденциальности
            </Link>
          </div>
        </div>

        {/* Security badges */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginTop: 28,
            flexWrap: "wrap",
          }}
        >
          {["No-logs", "Защищено", "VLESS \u00B7 Reality"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(232,240,232,0.45)",
                letterSpacing: 1,
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#00ff88",
                  display: "inline-block",
                  animation: "login-pulse 2s infinite",
                }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes for badge pulse animation */}
      <style>{`
        @keyframes login-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
