import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = { id: string; email: string };
export type Profile = { id: string; name: string };
export type PlanId = "standard-ads" | "standard" | "premium";

export interface Subscription {
  plan: PlanId;
  status: "active" | "cancelled" | "pending";
  nextBillingDate: string;
  memberSince: string;
  paymentMethod: {
    last4: string;
    brand: string;
    expiry: string;
    name: string;
  } | null;
}

function addOneMonth(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function nowMonthYear(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

interface AppState {
  session: {
    user: User | null;
    profile: Profile | null;
  };
  setSession: (
    updater: (prev: AppState["session"]) => AppState["session"],
  ) => void;

  subscription: Subscription;
  setPlan: (plan: PlanId) => void;
  activateSubscription: (
    paymentMethod: NonNullable<Subscription["paymentMethod"]>,
  ) => void;
  cancelSubscription: () => void;
  reactivateSubscription: () => void;
  resetSubscription: () => void;

  myLists: Record<string, string[]>;
  addToList: (profileId: string, movieId: string) => void;
  removeFromList: (profileId: string, movieId: string) => void;

  lang: "en" | "bm" | "zh" | "ms";
  setLang: (lang: "en" | "bm" | "zh" | "ms") => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      session: { user: null, profile: null },
      setSession: (updater) =>
        set((state) => ({ session: updater(state.session) })),

      subscription: {
        plan: "premium",
        status: "active",
        nextBillingDate: addOneMonth(),
        memberSince: nowMonthYear(),
        paymentMethod: {
          last4: "1234",
          brand: "Visa",
          expiry: "12/27",
          name: "Netflix User",
        },
      },
      setPlan: (plan) =>
        set((state) => ({ subscription: { ...state.subscription, plan } })),

      activateSubscription: (paymentMethod) =>
        set((state) => ({
          subscription: {
            ...state.subscription,
            status: "active",
            paymentMethod,
            nextBillingDate: addOneMonth(),
            memberSince: state.subscription.memberSince || nowMonthYear(),
          },
        })),

      cancelSubscription: () =>
        set((state) => ({
          subscription: { ...state.subscription, status: "cancelled" },
        })),

      reactivateSubscription: () =>
        set((state) => ({
          subscription: {
            ...state.subscription,
            status: "active",
            nextBillingDate: addOneMonth(),
          },
        })),

      resetSubscription: () =>
        set(() => ({
          subscription: {
            plan: "premium",
            status: "pending",
            nextBillingDate: "",
            memberSince: "",
            paymentMethod: null,
          },
        })),

      myLists: {},
      addToList: (profileId, movieId) =>
        set((state) => {
          const list = state.myLists[profileId] || [];
          if (list.includes(movieId)) return state;
          return {
            myLists: { ...state.myLists, [profileId]: [...list, movieId] },
          };
        }),
      removeFromList: (profileId, movieId) =>
        set((state) => {
          const list = state.myLists[profileId] || [];
          return {
            myLists: {
              ...state.myLists,
              [profileId]: list.filter((id) => id !== movieId),
            },
          };
        }),

      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    { name: "nf.store" },
  ),
);
