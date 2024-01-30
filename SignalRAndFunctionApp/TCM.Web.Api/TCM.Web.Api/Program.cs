using Microsoft.AspNetCore.Http.Connections;
using TCM.Web.Api.SignalR;
using TCM.Web.Api.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<WebHub>();
builder.Services.AddSignalR().AddAzureSignalR(options =>
{
    options.ConnectionString = "Endpoint=https://tcmnotification.service.signalr.net;AccessKey=bKCrhfboCJzU45esPEotaNWIrv7kF+LX+OiIsezbR8Y=;Version=1.0;";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseForwardedHeaders();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
    endpoints.MapHub<WebHub>($"/events", options =>
    {
        options.Transports = HttpTransportType.WebSockets;
    });
});

app.Run();
