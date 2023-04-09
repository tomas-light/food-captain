import { NavigateFunction, Location } from 'react-router-dom';

export class AppNavigator {
  constructor(
    private readonly getNavigateFunction: () => {
      navigate: NavigateFunction;
      location: Location;
    }
  ) {}

  get navigate(): NavigateFunction {
    return this.getNavigateFunction().navigate;
  }
  get location(): Location {
    return this.getNavigateFunction().location;
  }
}
