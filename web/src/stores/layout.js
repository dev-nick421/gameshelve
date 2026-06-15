import { defineStore } from 'pinia';

// Cross-component UI state for the library page's section "arrange" mode (#40).
// The header button toggles it; the library page reacts by enabling drag-to-
// reorder of its rails. Kept tiny and separate from persisted settings.
export const useLayoutStore = defineStore('layout', {
  state: () => ({
    arranging: false,
  }),
  actions: {
    toggleArranging() {
      this.arranging = !this.arranging;
    },
    stopArranging() {
      this.arranging = false;
    },
  },
});
