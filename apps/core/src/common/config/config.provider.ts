import { get } from 'lodash';
import { Injectable } from '../di';

@Injectable()
export class ConfigProvider<T = {}> {
  constructor(private readonly config: T) {}

  get(path: string) {
    return get(this.config, path);
  }

  static load<T>(config: T) {
    return new ConfigProvider<T>(config);
  }
}
