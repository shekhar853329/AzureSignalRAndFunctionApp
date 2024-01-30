using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TCM.Domain.Models;
using TCM.Web.Api.SignalR;
using TCM.Web.Api.Utilities;

namespace TCM.Web.Api.Controllers
{
    [ApiController]
    [Route("api1/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly ClientService clientService;
        private readonly IHubContext<WebHub> hubContext;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ClientService clientService, IHubContext<WebHub> hubContext, ILogger<WeatherForecastController> logger)
        {
            this.clientService = clientService;
            this.hubContext = hubContext;
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> GetAsync()
        {
            var result = Enumerable.Range(1, 2).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
            var response = await clientService.SendPostAsync("broadcast", result);
            
            return result;
        }
    }
}
