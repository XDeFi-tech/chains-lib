import { get } from 'lodash';

import 'reflect-metadata';
import { Injectable } from '../di';

@Injectable()
export class ConfigProvider<T = object> {
  constructor(private readonly config: T) {}

  static load<T>(config: T) {
    return new ConfigProvider<T>(config);
  }

  get(path: string) {
    return get(this.config, path);
  }
}
