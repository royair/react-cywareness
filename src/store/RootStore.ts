import UserStore from './UserStore';
import PhishingStore from './PhishingStore';

export default class RootStore {
  userStore: UserStore;
  phishingStore: PhishingStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.phishingStore = new PhishingStore(this);
  }
}

export const rootStore = new RootStore()
