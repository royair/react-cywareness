import {
  observable,
  action,
  makeAutoObservable,
  computed,
  runInAction
} from 'mobx';
import epaxios from '../utils/epaxios'

import RootStore from './RootStore'

export default class UserStore {
  @observable rootStore: RootStore;
  @observable user: User;
  @observable isReady: boolean;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.user = new User();
    this.isReady = false;

    this.getMe()

    makeAutoObservable(this);
  }

  @action getMe = async () => {
    this.isReady = true
  };

  @action login = async ({username, password}: { username: string, password: string }) => {
    const {data} = await epaxios.post('/login', {
      username,
      password
    })

    runInAction(() => {
      this.user = new User(data)
    })
  };

  @action logout = async () => {

  };

  @computed get isAuthenticated() {
    return !!this.user.auth_token
  }
}

class User {
  @observable auth_token?: string;
  @observable login?: string;

  constructor(user: { auth_token?: string, login?: string } = {}) {
    this.auth_token = user.auth_token;
    this.login = user.login;
  }
}
