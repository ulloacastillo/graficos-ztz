import { create } from 'zustand';

export const useImageStore = create((set) => ({
  image: [],
  addImage: (img) => set({ image: img }),
}));
