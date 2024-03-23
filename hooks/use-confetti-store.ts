import { create } from "zustand";

// Define the shape of the ConfettiStore
type ConfettiStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// Create a Zustand store for managing confetti state
export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));