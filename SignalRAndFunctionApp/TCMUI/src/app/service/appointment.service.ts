import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WeatherForecast } from "../interfaces/weatherForecast";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getData(): WeatherForecast[] {
    var appData: WeatherForecast[] = [];
    this.http.get<WeatherForecast[]>("/api1/WeatherForecast").subscribe(
      (data) => {
        appData.push(...data);
      },
      (err) => {
        console.log(err);
      }
    );
    return appData;
  }
}
