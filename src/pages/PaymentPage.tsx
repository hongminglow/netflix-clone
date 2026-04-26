import { useState } from "react";
import { NetflixLogo } from "@/components/NetflixLogo";
import { navigate, routes } from "@/lib/router";
import { useStore } from "@/store";

const PLAN_PRICES: Record<string, string> = {
  "standard-ads": "RM 18.90",
  standard: "RM 38.90",
  premium: "RM 54.90",
};

const PLAN_NAMES: Record<string, string> = {
  "standard-ads": "Standard with Ads",
  standard: "Standard",
  premium: "Premium",
};

function detectBrand(num: string) {
  if (num.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(num)) return "Mastercard";
  if (/^3[47]/.test(num)) return "Amex";
  return "Card";
}

function formatCardNum(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 16);
  return d.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  if (d.length > 2) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return d;
}

function CheckDone() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function PaymentPage() {
  const { subscription, activateSubscription } = useStore();
  const [tab, setTab] = useState<"card" | "paypal">("card");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const plan = subscription.plan;

  const validate = () => {
    const e: Record<string, string> = {};
    if (cardNum.replace(/\s/g, "").length < 16)
      e.cardNum = "Please enter a valid card number.";
    if (!expiry.match(/^\d{2}\/\d{2}$/))
      e.expiry = "Enter a valid expiry date (MM/YY).";
    if (cvv.length < 3) e.cvv = "Enter a valid CVV.";
    if (!name.trim()) e.name = "Enter the name on your card.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      activateSubscription({
        last4: cardNum.replace(/\s/g, "").slice(-4),
        brand: detectBrand(cardNum.replace(/\s/g, "")),
        expiry,
        name: name.trim(),
      });
      navigate(routes.profiles);
    }, 1400);
  };

  return (
    <div className="payPage">
      <header className="payHdr">
        <button
          onClick={() => navigate(routes.home)}
          aria-label="Home"
          className="landingBrand"
        >
          <NetflixLogo className="nfLogo" />
        </button>
      </header>

      <main className="payMain">
        {/* Step indicator */}
        <div className="planSelSteps">
          <div className="planSelStepItem isComplete">
            <div className="planSelStepCircle">
              <CheckDone />
            </div>
          </div>
          <div className="planSelStepLine isDone" />
          <div className="planSelStepItem isComplete">
            <div className="planSelStepCircle">
              <CheckDone />
            </div>
          </div>
          <div className="planSelStepLine isDone" />
          <div className="planSelStepItem isCurrent">
            <div className="planSelStepCircle">3</div>
          </div>
        </div>

        <p className="planSelStepLabel">STEP 3 OF 3</p>
        <h1 className="payTitle">Set up your payment</h1>
        <p className="paySubtitle">
          Your membership starts as soon as you set up payment.
        </p>

        {/* Plan summary */}
        <div className="paySummary">
          <div className="paySummaryInfo">
            <span className="paySummaryPlan">
              {PLAN_NAMES[plan] ?? "Premium"}
            </span>
            <button
              className="paySummaryChange"
              onClick={() => navigate(routes.planSelection)}
            >
              Change
            </button>
          </div>
          <div className="paySummaryPrice">
            {PLAN_PRICES[plan] ?? "RM 54.90"}
            <span>/month</span>
          </div>
        </div>

        {/* Payment method tabs */}
        <div className="payMethodTabs">
          <button
            type="button"
            className={`payMethodTab ${tab === "card" ? "isActive" : ""}`}
            onClick={() => setTab("card")}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            Credit or Debit Card
          </button>
          <button
            type="button"
            className={`payMethodTab ${tab === "paypal" ? "isActive" : ""}`}
            onClick={() => setTab("paypal")}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M7.6 21.3h-2a.6.6 0 0 1-.6-.7l2.4-15.4a.9.9 0 0 1 .9-.8h5.9c2.7 0 4.5 1.3 4.2 4-.4 3.3-2.8 5-5.8 5H10l-.8 5.3a.6.6 0 0 1-.6.5H7.6Z" />
              <path
                d="M18.7 8.3c.3 2.8-1.5 5.7-5.3 5.7h-1.8l-.8 5.3a.6.6 0 0 1-.6.5H8.5"
                opacity=".4"
              />
            </svg>
            PayPal
          </button>
        </div>

        {tab === "card" && (
          <form className="payForm" onSubmit={handleSubmit}>
            <div className="payFields">
              <div
                className={`nfField payFieldFull ${errors.cardNum ? "isInvalid" : ""}`}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardNum}
                  onChange={(e) => {
                    setCardNum(formatCardNum(e.target.value));
                    if (errors.cardNum)
                      setErrors((p) => ({ ...p, cardNum: "" }));
                  }}
                  placeholder=" "
                  autoComplete="cc-number"
                />
                <span className="nfFieldLabel">Card number</span>
                <span className="nfFieldHint">{errors.cardNum}</span>
              </div>

              <div className="payFieldRow">
                <div className={`nfField ${errors.expiry ? "isInvalid" : ""}`}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => {
                      setExpiry(formatExpiry(e.target.value));
                      if (errors.expiry)
                        setErrors((p) => ({ ...p, expiry: "" }));
                    }}
                    placeholder=" "
                    autoComplete="cc-exp"
                  />
                  <span className="nfFieldLabel">Expiry date (MM/YY)</span>
                  <span className="nfFieldHint">{errors.expiry}</span>
                </div>
                <div className={`nfField ${errors.cvv ? "isInvalid" : ""}`}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(e) => {
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
                      if (errors.cvv) setErrors((p) => ({ ...p, cvv: "" }));
                    }}
                    placeholder=" "
                    autoComplete="cc-csc"
                  />
                  <span className="nfFieldLabel">CVV</span>
                  <span className="nfFieldHint">{errors.cvv}</span>
                </div>
              </div>

              <div
                className={`nfField payFieldFull ${errors.name ? "isInvalid" : ""}`}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                  }}
                  placeholder=" "
                  autoComplete="cc-name"
                />
                <span className="nfFieldLabel">Name on card</span>
                <span className="nfFieldHint">{errors.name}</span>
              </div>
            </div>

            <p className="payTerms">
              By clicking "Start Membership", you agree to our{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>
                Terms of Use
              </a>
              . Netflix will charge your payment method each month until you
              cancel. Cancel anytime.
            </p>

            <button
              className="nfButton nfButtonRed nfButtonWide paySubmitBtn"
              type="submit"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="paySpinner" aria-hidden="true" />
                  Processing…
                </>
              ) : (
                "Start Membership"
              )}
            </button>
          </form>
        )}

        {tab === "paypal" && (
          <div className="payPalPlaceholder">
            <p>You'll be redirected to PayPal to complete your payment.</p>
            <button
              className="nfButton nfButtonRed nfButtonWide"
              onClick={() => {
                setProcessing(true);
                setTimeout(() => {
                  activateSubscription({
                    last4: "0000",
                    brand: "PayPal",
                    expiry: "—",
                    name: "PayPal Account",
                  });
                  navigate(routes.profiles);
                }, 1400);
              }}
              disabled={processing}
            >
              {processing ? "Processing…" : "Continue with PayPal"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
