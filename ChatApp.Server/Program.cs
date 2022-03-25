using ChatApp.Server.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("SignalRPolicy",builder =>
    {
        builder.WithOrigins("http://localhost:3000/").AllowAnyHeader().AllowAnyMethod().AllowCredentials().SetIsOriginAllowed(origin => true);
    });
});
var app = builder.Build();

app.UseRouting();

app.UseCors();

app.UseEndpoints(endpoints =>
    endpoints.MapHub<ChatHub>("/chat").RequireCors("SignalRPolicy")
); ;

app.Run();
