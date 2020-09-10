import LocationSuggestionStore from './locationSuggestionStore';
import LocationStore from './locationStore';

export default class RootStore {
  constructor() {
    this.locationSuggestionStore = new LocationSuggestionStore(this);
    this.locationStore = new LocationStore(this);
  }
}
