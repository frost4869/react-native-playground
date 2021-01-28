const {observable, action} = require('mobx');

class ThemeStore {
  @observable
  darkMode = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  toggleDarkMode = () => {
    this.darkMode = !this.darkMode;
  };
}

export default ThemeStore;
