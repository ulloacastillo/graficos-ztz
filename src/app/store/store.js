import { create } from 'zustand';

export const useImageStore = create((set) => ({
  image: [],
  addImage: (img) => set({ image: img }),
  isUpload: false,
  setIsUpload: (isUpload) => set({ isUpload: isUpload }),
}));

export const useIconStore = create((set) => ({
  icons: [],
  addIcons: (icons) => set({ icons: icons }),
}));

export const useDataStore = create((set) => ({
  data: '',
  setData: (data) => set({ data: data }),
}));

export const useChartSettings = create((set) => ({
  chartSettings: { theme: 'default' },
  setChartSettings: (value) =>
    set((state) => ({
      chartSettings: { ...state.chartSettings, theme: value },
    })),
}));