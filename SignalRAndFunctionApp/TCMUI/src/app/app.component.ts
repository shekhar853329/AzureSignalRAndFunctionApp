import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppointmentService } from "./service/appointment.service";
import { WeatherForecast } from "./interfaces/weatherForecast";
import { Subscription } from "rxjs";
import { ApiEventService } from "./service/api-event.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "TCMUI";
  count: number = 0;
  signalrData = [];
  data: WeatherForecast[] = [];
  private apiEventsSubscription: Subscription;

  constructor(
    private service: AppointmentService,
    private eventService: ApiEventService
  ) {
    this.apiEventsSubscription =
      this.eventService.weatherForescastChangedEvent$.subscribe((x) =>
        this.onApiAppointmentChangedEvent(x)
      );
  }
  ngOnDestroy(): void {
    if (this.apiEventsSubscription) {
      this.apiEventsSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {}
  getData(event: any) {
    event.preventDefault();
    this.data = this.service.getData();
  }
  private onApiAppointmentChangedEvent(model: any) {
    debugger;
    var res = JSON.parse(model) as WeatherForecast[];
    this.signalrData = [];
    this.signalrData.push(...res);
    this.count++;
  }
}
