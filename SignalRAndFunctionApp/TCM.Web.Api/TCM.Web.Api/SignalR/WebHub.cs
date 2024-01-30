using Microsoft.AspNetCore.SignalR;

namespace TCM.Web.Api.SignalR
{
    public class WebHub : Hub
    {
        private readonly ILogger<WebHub> logger;

        public WebHub(ILogger<WebHub> logger)
        {
            this.logger = logger;
        }
        public override Task OnConnectedAsync()
        {
            logger.LogInformation(Context.ConnectionId);
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            logger.LogInformation(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }        
    }
}
