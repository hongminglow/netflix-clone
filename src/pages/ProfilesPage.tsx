import { useState } from "react";
import { NetflixLogo } from "@/components/NetflixLogo";
import { defaultProfiles } from "@/data/profiles";
import { useI18n } from "@/i18n";
import { navigate, routes } from "@/lib/router";

type Props = {
  onSelect: (profile: { id: string; name: string }) => void;
};

export function ProfilesPage({ onSelect }: Props) {
  const { t } = useI18n();
  const [manageMode, setManageMode] = useState(false);

  return (
    <div className="profiles">
      <header className="profilesTopBar">
        <button
          className="landingBrand"
          onClick={() => navigate(routes.home)}
          aria-label="Home"
        >
          <NetflixLogo className="nfLogo" />
        </button>
      </header>

      <main className="profilesMain">
        <h1 className="profilesTitle">
          {manageMode ? t("profiles_manage") : t("profiles_title")}
        </h1>
        <div className="profilesGrid">
          {defaultProfiles.map((p) => (
            <button
              key={p.id}
              className={`profileCard ${manageMode ? "isManageMode" : ""}`}
              onClick={() => {
                if (manageMode) {
                  navigate(`/edit-profile?id=${p.id}`);
                } else {
                  onSelect({ id: p.id, name: p.name });
                  navigate(routes.browse);
                }
              }}
            >
              <div className="profileAvatarWrapper">
                <img
                  className="profileAvatar"
                  src={p.avatarUrl}
                  alt=""
                  loading="lazy"
                />
                {manageMode && (
                  <div className="profileEditOverlay">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="profileName">{p.name}</div>
            </button>
          ))}

          {!manageMode && defaultProfiles.length < 5 && (
            <button
              className="profileCard profileCardAdd"
              aria-label="Add profile"
            >
              <div className="profileAvatarWrapper">
                <div className="profileAvatarPlus">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="profileName">Add Profile</div>
            </button>
          )}
        </div>
        <button
          className={manageMode ? "profilesManageDone" : "profilesManage"}
          onClick={() => setManageMode(!manageMode)}
        >
          {manageMode ? "Done" : t("profiles_manage")}
        </button>
      </main>
    </div>
  );
}
