using ChatApp.Server.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("SignalRPolicy", builder =>
    {
        var origins = new[] { "http://localhost:3000" };
        builder.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
    });
});
var app = builder.Build();

app.UseRouting();

app.UseCors("SignalRPolicy");

app.UseEndpoints(endpoints =>
    endpoints.MapHub<ChatHub>("/chat").RequireCors("SignalRPolicy")
); ;

app.Run();
