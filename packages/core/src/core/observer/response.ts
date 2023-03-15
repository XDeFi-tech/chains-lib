import { Observable } from 'rxjs';

export class Response<Data, SubscribeData> {
  constructor(
    public readonly getData: () => Promise<Data>,
    public readonly getObserver: () => Promise<Observable<SubscribeData>>
  ) {}
}
