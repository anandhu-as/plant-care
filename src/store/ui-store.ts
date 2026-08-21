import { create } from "zustand";
import { persist } from "zustand/middleware";

type UiStore = {
  zenMode: boolean;
  mounted: boolean;
  welcomeOpen: boolean;
  welcomeClosing: boolean;
  setMounted: (v: boolean) => void;
  toggleZenMode: () => void;
  openWelcome: () => void;
  dismissWelcome: () => void;
};

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      zenMode: false,
      mounted: false,
      welcomeOpen: false,
      welcomeClosing: false,
      setMounted: (v) => set({ mounted: v }),
      toggleZenMode: () => set((s) => ({ zenMode: !s.zenMode })),
      openWelcome: () => set({ welcomeOpen: true }),
      dismissWelcome: () => {
        set({ welcomeClosing: true });
        setTimeout(() => {
          set({ welcomeOpen: false, welcomeClosing: false });
        }, 250);
      },
    }),
    {
      name: "plantcare-ui",
      partialize: (s) => ({ zenMode: s.zenMode }),
    }
  )
);
