import { useEffect, useState } from "react";
import { NetflixLogo } from "@/components/NetflixLogo";
import { defaultProfiles } from "@/data/profiles";
import { navigate, routes } from "@/lib/router";
import { useStore, type PlanId } from "@/store";

type Props = {
  currentProfileId: string;
};

const PLANS: {
  id: PlanId;
  name: string;
  price: string;
  quality: string;
  resolution: string;
  downloads: boolean;
  screens: number;
}[] = [
  {
    id: "standard-ads",
    name: "Standard with Ads",
    price: "RM 18.90",
    quality: "Full HD",
    resolution: "1080p",
    downloads: false,
    screens: 2,
  },
  {
    id: "standard",
    name: "Standard",
    price: "RM 38.90",
    quality: "Full HD",
    resolution: "1080p",
    downloads: true,
    screens: 2,
  },
  {
    id: "premium",
    name: "Premium",
    price: "RM 54.90",
    quality: "Ultra HD",
    resolution: "4K+HDR",
    downloads: true,
    screens: 4,
  },
];

const PLAN_BADGE: Record<PlanId, string> = {
  "standard-ads": "HD",
  standard: "FULL HD",
  premium: "ULTRA HD",
};

function PlanModal({
  currentPlan,
  onClose,
  onConfirm,
}: {
  currentPlan: PlanId;
  onClose: () => void;
  onConfirm: (plan: PlanId) => void;
}) {
  const [selected, setSelected] = useState<PlanId>(currentPlan);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  return (
    <div
      className="planModalOverlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Change Plan"
    >
      <div className="planModal" onClick={(e) => e.stopPropagation()}>
        <div className="planModalHeader">
          <h2 className="planModalTitle">Change Plan</h2>
          <button
            className="planModalClose"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6 6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="planCardsInner">
          {PLANS.map((p) => {
            const isSelected = selected === p.id;
            const isCurrent = p.id === currentPlan;
            return (
              <label
                key={p.id}
                className={`planCard ${isSelected ? "isSelected" : ""}`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={p.id}
                  checked={isSelected}
                  onChange={() => setSelected(p.id)}
                  className="srOnly"
                />
                <div className="planCardHeader">
                  {isCurrent && (
                    <div className="planCardBadge">CURRENT PLAN</div>
                  )}
                  {isSelected && !isCurrent && (
                    <div className="planCardSelectedBadge">✓</div>
                  )}
                  <h3 className="planCardName">{p.name}</h3>
                  <div className="planCardQuality">{p.resolution}</div>
                </div>
                <div className="planCardBody">
                  <div className="planCardPrice">
                    {p.price} <span>/month</span>
                  </div>
                  <ul className="planCardFeatures">
                    <li>
                      <span>Video Quality</span>
                      <strong>{p.quality}</strong>
                    </li>
                    <li>
                      <span>Resolution</span>
                      <strong>{p.resolution}</strong>
                    </li>
                    <li>
                      <span>Spatial Audio</span>
                      <strong>{p.id === "premium" ? "Included" : "—"}</strong>
                    </li>
                    <li>
                      <span>Simultaneous streams</span>
                      <strong>{p.screens}</strong>
                    </li>
                    <li>
                      <span>Download devices</span>
                      <strong>{p.downloads ? p.screens : 0}</strong>
                    </li>
                    <li>
                      <span>Ads</span>
                      <strong>
                        {p.id === "standard-ads" ? "Ad-supported" : "Ad-free"}
                      </strong>
                    </li>
                  </ul>
                </div>
              </label>
            );
          })}
        </div>
        <div className="planCta">
          <button className="planCtaCancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="planCtaConfirm"
            onClick={() => {
              onConfirm(selected);
              onClose();
            }}
            disabled={selected === currentPlan}
          >
            {selected === currentPlan ? "Current Plan" : "Change Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function AccountPage({ currentProfileId }: Props) {
  const {
    session,
    subscription,
    cancelSubscription,
    reactivateSubscription,
    setPlan,
  } = useStore();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const currentPlan = PLANS.find((p) => p.id === subscription.plan) ?? PLANS[2];
  const isCancelled = subscription.status === "cancelled";

  return (
    <div className="accountPage">
      <header className="accountHeader">
        <div className="accountHeaderInner">
          <button
            className="landingBrand"
            onClick={() => navigate(routes.browse)}
            aria-label="Home"
          >
            <NetflixLogo className="nfLogo" />
          </button>
          <div className="accountHeaderProfile">
            <img
              src={
                defaultProfiles.find((p) => p.id === currentProfileId)
                  ?.avatarUrl || defaultProfiles[0].avatarUrl
              }
              alt=""
              className="accountHeaderAvatar"
            />
          </div>
        </div>
      </header>

      <main className="accountMain">
        <div className="accountContainer">
          {isCancelled && (
            <div className="accountCancelBanner">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
              Your membership has been cancelled. You can reactivate at any
              time.
              <button
                className="accountCancelBannerBtn"
                onClick={reactivateSubscription}
              >
                Reactivate
              </button>
            </div>
          )}

          <div className="accountTitleRow">
            <h1 className="accountTitle">Account</h1>
            <div className="accountMemberSince">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Member Since {subscription.memberSince || "Recently"}
            </div>
          </div>

          <section className="accountSection">
            <div className="accountSectionLeft">
              <h2 className="accountSectionTitle">Membership &amp; Billing</h2>
              {isCancelled ? (
                <button
                  className="accountCancelButton accountReactivateBtn"
                  onClick={reactivateSubscription}
                >
                  Reactivate Membership
                </button>
              ) : (
                <button
                  className="accountCancelButton"
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Cancel Membership
                </button>
              )}
            </div>
            <div className="accountSectionRight">
              <div className="accountBlock">
                <div className="accountRow">
                  <span className="accountStrong">
                    {session.user?.email || "user@example.com"}
                  </span>
                  <a
                    href="#"
                    className="accountLink"
                    onClick={(e) => e.preventDefault()}
                  >
                    Change account email
                  </a>
                </div>
                <div className="accountRow">
                  <span className="accountLight">Password: ••••••••</span>
                  <a
                    href="#"
                    className="accountLink"
                    onClick={(e) => e.preventDefault()}
                  >
                    Change password
                  </a>
                </div>
              </div>
              {subscription.paymentMethod && (
                <div className="accountBlock">
                  <div className="accountRow">
                    <span className="accountStrong">
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ verticalAlign: "middle", marginRight: "6px" }}
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      {subscription.paymentMethod.brand} ••••{" "}
                      {subscription.paymentMethod.last4}
                    </span>
                    <a
                      href="#"
                      className="accountLink"
                      onClick={(e) => e.preventDefault()}
                    >
                      Manage payment info
                    </a>
                  </div>
                  <div className="accountRow">
                    <span className="accountLight">
                      {isCancelled
                        ? "Membership cancelled — no further charges"
                        : `Your next billing date is ${subscription.nextBillingDate}.`}
                    </span>
                    <a
                      href="#"
                      className="accountLink"
                      onClick={(e) => e.preventDefault()}
                    >
                      Add backup payment method
                    </a>
                  </div>
                  <div className="accountRow">
                    <a
                      href="#"
                      className="accountLink"
                      onClick={(e) => e.preventDefault()}
                    >
                      Billing details
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="accountSection">
            <div className="accountSectionLeft">
              <h2 className="accountSectionTitle">Plan Details</h2>
            </div>
            <div className="accountSectionRight">
              <div className="accountRow">
                <span className="accountStrong">
                  {currentPlan.name}
                  <span className="accountBadge">
                    {PLAN_BADGE[subscription.plan]}
                  </span>
                </span>
                <button
                  className="accountLink"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPlanModal(true)}
                >
                  Change plan
                </button>
              </div>
              <div className="accountRow">
                <span className="accountLight">
                  {currentPlan.price}/month · {currentPlan.screens} simultaneous
                  streams · {currentPlan.resolution}
                </span>
              </div>
            </div>
          </section>

          <section className="accountSection accountSectionLast">
            <div className="accountSectionLeft">
              <h2 className="accountSectionTitle">
                Profile &amp; Parental Controls
              </h2>
            </div>
            <div className="accountSectionRight">
              {defaultProfiles.map((p) => (
                <div
                  key={p.id}
                  className="accountProfileRow"
                  onClick={() => navigate(`/edit-profile?id=${p.id}`)}
                >
                  <div className="accountProfileInfo">
                    <img
                      src={p.avatarUrl}
                      alt=""
                      className="accountProfileAvatar"
                    />
                    <div>
                      <div className="accountStrong">{p.name}</div>
                      <div className="accountLight">All Maturity Ratings</div>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="accountFooter">
        <div className="accountFooterInner">
          <div className="accountFooterQuestions">
            Questions? Call 1-800-819-216 (Toll-Free)
          </div>
          <div className="accountFooterGrid">
            <a href="#" onClick={(e) => e.preventDefault()}>
              FAQ
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Help Center
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Terms of Use
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Privacy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Cookie Preferences
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Corporate Information
            </a>
          </div>
        </div>
      </footer>

      {showPlanModal && (
        <PlanModal
          currentPlan={subscription.plan}
          onClose={() => setShowPlanModal(false)}
          onConfirm={(plan) => setPlan(plan)}
        />
      )}

      {showCancelConfirm && (
        <div
          className="planModalOverlay"
          onClick={() => setShowCancelConfirm(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="accountCancelDialog"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Cancel membership?</h2>
            <p>
              If you cancel, your Netflix membership will remain active until{" "}
              <strong>{subscription.nextBillingDate}</strong>, after which you
              won't be charged.
            </p>
            <div className="accountCancelDialogBtns">
              <button
                className="planCtaCancel"
                onClick={() => setShowCancelConfirm(false)}
              >
                Keep Membership
              </button>
              <button
                className="planCtaConfirm"
                onClick={() => {
                  cancelSubscription();
                  setShowCancelConfirm(false);
                }}
              >
                Cancel Membership
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
