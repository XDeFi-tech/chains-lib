import { Subscription } from 'rxjs';

export class Response<Returning, Filter> {
    constructor(
        protected readonly filter: Filter,
        private readonly getterMethod: (filter: Filter) => Promise<Returning>,
        private readonly subscriptionMethod: (filter: Filter) => Subscription,
    ) {}
    getData = () => this.getterMethod(this.filter);
    subscribe = () => this.subscriptionMethod(this.filter);
}

