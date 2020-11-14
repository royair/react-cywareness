import {
  observable,
  action,
  makeAutoObservable,
  runInAction
} from 'mobx';
import {map} from 'lodash'

import epaxios from '../utils/epaxios'

import RootStore from './RootStore'

export default class PhishingStore {
  @observable rootStore: RootStore;
  @observable phishings: Phishing[] = [];
  @observable isReady: boolean;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.phishings = [];
    this.isReady = false;

    makeAutoObservable(this);
  }

  @action get = async () => {
    try {
      const {data} = await epaxios('/data')
      console.log(data);

      runInAction(() => {
        this.phishings = map(data, (value, key) => new Phishing({
          data: value,
          name: key
        }))
      })
    } catch (e) {

    }
  };
}

class Phishing {
  @observable name: string;
  @observable data: number;

  constructor(phishing: { name: string, data: number }) {
    this.name = phishing.name
    this.data = phishing.data
  }
}

