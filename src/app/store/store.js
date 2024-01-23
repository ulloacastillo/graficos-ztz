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
  theme: 'default',
  events: [],
  initialColor: '#9f8df8',
  endColor: '#0000ff',
  useImage: false,
  filterType: 'Mes',
  setTheme: (value) => set({ theme: value }),
  setUseImage: (bool) => set({ useImage: bool }),
  setEvents: (events) => set({ events: [...events] }),
  setFilterType: (type) => set({ filterType: type }),
  setInitialColor: (color) => set({ initialColor: color }),
  setEndColor: (color) => set({ endColor: color }),
}));
