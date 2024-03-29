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
  showImages: [],
  initialColor: '#4158be',
  endColor: '#05002b',
  useImage: true,
  filterType: 'Mes',
  textColor: '#000000',
  selectedYear: 'Todos',
  setTheme: (value) => set({ theme: value }),
  setUseImage: (bool) => set({ useImage: bool }),
  setEvents: (events) => set({ events: [...events] }),
  setFilterType: (type) => set({ filterType: type }),
  setInitialColor: (color) => set({ initialColor: color }),
  setEndColor: (color) => set({ endColor: color }),
  setShowImages: (list) => set({ showImages: [...list] }),
  setTextColor: (color) => set({ textColor: color }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  chartType: 'bar',
  setChartType: (type) => set({ chartType: type }),
}));
