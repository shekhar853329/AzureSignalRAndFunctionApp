
import { WeatherForecast } from '../interfaces/weatherForecast';
export class WebHubEventCaller {

	private constructor() {
		Object.defineProperty(this.Receive_ApiAppointmentChanged, 'name', { value: 'Receive_ApiAppointmentChanged', writable: false });
	}

	static readonly instance = new WebHubEventCaller();

	Receive_ApiAppointmentChanged(model: WeatherForecast[]) { }

}
