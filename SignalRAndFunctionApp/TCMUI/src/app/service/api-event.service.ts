import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SingletonCheckHelper } from "../helpers/singleton-check.helper";
import { TcmWebHubConnectionService } from "./tcm-web-hub-connection.service";
import { WeatherForecast } from "../interfaces/weatherForecast";

@Injectable({
  providedIn: "root",
})
export class ApiEventService {
  private readonly weatherForescastChangedEvent =
    new Subject<WeatherForecast[]>();
  get weatherForescastChangedEvent$() {
    return this.weatherForescastChangedEvent.asObservable();
  }
  constructor(connection:TcmWebHubConnectionService) {
    SingletonCheckHelper.ensureSingleton(this);
    connection.on(x => x.Receive_ApiAppointmentChanged, (x) => this.weatherForescastChangedEvent.next(x));
  }
}
