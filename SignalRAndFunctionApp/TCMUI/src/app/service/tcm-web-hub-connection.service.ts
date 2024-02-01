import { Injectable } from "@angular/core";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  IRetryPolicy,
  RetryContext,
  ILogger,
  LogLevel,
} from "@microsoft/signalr";
import { Subscription } from "rxjs";
import { environment } from "../../environments/environment";
import { SingletonCheckHelper } from "../helpers/singleton-check.helper";
import { Task } from "../helpers/task";
import { WebHubEventCaller } from "../helpers/web-hub-event-caller";

class InfiniteRetryPolicy implements IRetryPolicy {
  nextRetryDelayInMilliseconds(retryContext: RetryContext): number {
    return Math.random() * 5000;
  }
}

@Injectable({
  providedIn: "root",
})
export class TcmWebHubConnectionService {
  private readonly hubConnection: HubConnection;

  private connectingInterval: any;

  private isInitialized = false;
  private currentUserSubscription: Subscription;

  constructor() {
    SingletonCheckHelper.ensureSingleton(this);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl("/events")
      .withAutomaticReconnect(new InfiniteRetryPolicy())
      .build();
  }

  init() {
    if (this.isInitialized) return;

    this.isInitialized = true;
    this.onCurrentUserChange();
  }

  on<T>(
    func: (x: WebHubEventCaller) => (arg: T) => void,
    handler: (arg: T) => void
  ) {
    const res = func(WebHubEventCaller.instance);
    const name = res.name;

    this.hubConnection.on(name, handler);
  }

  private async onCurrentUserChange() {
    if (this.connectingInterval) return;

    switch (this.hubConnection.state) {
      case HubConnectionState.Connected:
      case HubConnectionState.Connecting:
      case HubConnectionState.Reconnecting:
        return;
      case HubConnectionState.Disconnecting:
        await Task.delay(1000);
        break;
    }

    if (this.hubConnection.state != HubConnectionState.Disconnected) return;

    this.connectingInterval = setInterval(async () => {
      if (this.hubConnection.state != HubConnectionState.Disconnected) return;

      try {
        await this.hubConnection.start();

        clearInterval(this.connectingInterval);
        this.connectingInterval = null;

        console.log("Events hub: connection started");
      } catch (err) {
        console.log("Events hub connection error: " + err);
      }
    }, 2000);
  }
}
