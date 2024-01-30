import { TcmWebHubConnectionService } from "../service/tcm-web-hub-connection.service";

export function applicationInitializer(
  tcmWebHubConnectionService: TcmWebHubConnectionService
) {
  return async () => {
    tcmWebHubConnectionService.init();
  };
}
