import LocationSuggestionStore from './locationSuggestionStore';
import LocationStore from './locationStore';
import AuthStore from './authStore';
import ThemeStore from './themeStore';

export default class RootStore {
  constructor() {
    this.locationSuggestionStore = new LocationSuggestionStore(this);
    this.locationStore = new LocationStore(this);
    this.authStore = new AuthStore(this);
    this.themeStore = new ThemeStore(this);
  }
}
