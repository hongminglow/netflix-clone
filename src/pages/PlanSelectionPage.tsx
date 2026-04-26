import { useState } from "react";
import { NetflixLogo } from "@/components/NetflixLogo";
import { navigate, routes } from "@/lib/router";
import { useStore, type PlanId } from "@/store";

const PLANS: {
  id: PlanId;
  name: string;
  price: string;
  videoQuality: string;
  resolution: string;
  spatialAudio: boolean;
  screens: number;
  downloads: number;
  ads: boolean;
}[] = [
  {
    id: "standard-ads",
    name: "Standard with Ads",
    price: "RM 18.90",
    videoQuality: "Good",
    resolution: "1080p",
    spatialAudio: false,
    screens: 2,
    downloads: 0,
    ads: true,
  },
  {
    id: "standard",
    name: "Standard",
    price: "RM 38.90",
    videoQuality: "Great",
    resolution: "1080p",
    spatialAudio: false,
    screens: 2,
    downloads: 2,
    ads: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "RM 54.90",
    videoQuality: "Best",
    resolution: "4K+HDR",
    spatialAudio: true,
    screens: 4,
    downloads: 6,
    ads: false,
  },
];

type Plan = (typeof PLANS)[number];

const FEATURE_ROWS: { label: string; render: (p: Plan) => React.ReactNode }[] =
  [
    { label: "Monthly price", render: (p) => p.price },
    { label: "Video quality", render: (p) => p.videoQuality },
    { label: "Resolution", render: (p) => p.resolution },
    {
      label: "Spatial audio",
      render: (p) =>
        p.spatialAudio ? (
          <span className="planSelCheck">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
        ) : (
          "—"
        ),
    },
    { label: "Supported devices", render: () => "TV, PC, phone, tablet" },
    { label: "Simultaneous streams", render: (p) => String(p.screens) },
    { label: "Download devices", render: (p) => String(p.downloads) },
    { label: "Ads", render: (p) => (p.ads ? "Ad-supported" : "Ad-free") },
  ];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

export function PlanSelectionPage() {
  const { subscription, setPlan } = useStore();
  const [selected, setSelected] = useState<PlanId>(subscription.plan);
  const [hoveredPlan, setHoveredPlan] = useState<PlanId | null>(null);

  const handleNext = () => {
    setPlan(selected);
    navigate(routes.payment);
  };

  return (
    <div className="planSel">
      <header className="planSelHdr">
        <button
          onClick={() => navigate(routes.home)}
          aria-label="Home"
          className="landingBrand"
        >
          <NetflixLogo className="nfLogo" />
        </button>
      </header>

      <main className="planSelMain">
        {/* Step indicator */}
        <div className="planSelSteps">
          <div className="planSelStepItem isComplete">
            <div className="planSelStepCircle">
              <CheckIcon />
            </div>
          </div>
          <div className="planSelStepLine isDone" />
          <div className="planSelStepItem isCurrent">
            <div className="planSelStepCircle">2</div>
          </div>
          <div className="planSelStepLine" />
          <div className="planSelStepItem">
            <div className="planSelStepCircle">3</div>
          </div>
        </div>

        <p className="planSelStepLabel">STEP 2 OF 3</p>
        <h1 className="planSelTitle">Choose the plan that's right for you</h1>
        <ul className="planSelPerks">
          <li>
            <CheckIcon />
            Watch all you want. Ad-free available.
          </li>
          <li>
            <CheckIcon />
            Recommendations just for you.
          </li>
          <li>
            <CheckIcon />
            Change or cancel your plan anytime.
          </li>
        </ul>

        <div className="planSelTableWrap">
          <table className="planSelTable">
            <thead>
              <tr>
                <th className="planSelTableEmpty" />
                {PLANS.map((p) => (
                  <th
                    key={p.id}
                    className={`planSelTableTh ${selected === p.id ? "isSelected" : ""} ${hoveredPlan === p.id ? "isHighlighted" : ""}`}
                    onClick={() => setSelected(p.id)}
                    onMouseEnter={() => setHoveredPlan(p.id)}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    {p.id === "premium" && (
                      <div className="planSelBestBadge">BEST VALUE</div>
                    )}
                    <button
                      className={`planSelColBtn ${selected === p.id ? "isSelected" : ""}`}
                      onClick={() => setSelected(p.id)}
                      onMouseEnter={() => setHoveredPlan(p.id)}
                      onMouseLeave={() => setHoveredPlan(null)}
                    >
                      <div className="planSelColName">{p.name}</div>
                      <div className="planSelColRadioWrap">
                        {selected === p.id ? (
                          <div className="planSelColRadioFilled">
                            <svg
                              viewBox="0 0 24 24"
                              width="22"
                              height="22"
                              fill="none"
                            >
                              <circle cx="12" cy="12" r="10" fill="#e50914" />
                              <path
                                d="M7 12l4 4 6-7"
                                stroke="#fff"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="planSelColRadioEmpty" />
                        )}
                      </div>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map((row) => (
                <tr key={row.label}>
                  <td className="planSelFeatureLabel">{row.label}</td>
                  {PLANS.map((p) => (
                    <td
                      key={p.id}
                      className={`planSelFeatureVal ${selected === p.id ? "isSelected" : ""} ${hoveredPlan === p.id ? "isHighlighted" : ""}`}
                      onClick={() => setSelected(p.id)}
                      onMouseEnter={() => setHoveredPlan(p.id)}
                      onMouseLeave={() => setHoveredPlan(null)}
                    >
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="nfButton nfButtonRed planSelNextBtn"
          onClick={handleNext}
        >
          Next
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </main>
    </div>
  );
}
