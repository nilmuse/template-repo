export interface ThingOptions {
  /** Whether the thing starts enabled. */
  enabled?: boolean;
}

export class Thing {
  private enabled: boolean;

  constructor(options: ThingOptions = {}) {
    this.enabled = options.enabled ?? false;
  }

  start(): void {
    this.enabled = true;
  }

  stop(): void {
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export function createThing(options?: ThingOptions): Thing {
  return new Thing(options);
}
