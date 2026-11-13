export interface TelemetryEvent {
  name: string;
  timestamp: number;
  properties?: Record<string, unknown>;
}

class TelemetryService {
  private events: TelemetryEvent[] = [];

  track(name: string, properties?: Record<string, unknown>) {
    const event: TelemetryEvent = {
      name,
      timestamp: Date.now(),
      properties
    };
    this.events.push(event);
    
    // In dev mode, log cleanly
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
      console.debug(`[Telemetry: ${name}]`, properties || {});
    }
  }

  getRecentEvents(): TelemetryEvent[] {
    return [...this.events].slice(-20);
  }
}

export const telemetry = new TelemetryService();
