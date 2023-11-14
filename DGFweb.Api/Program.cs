using System.Configuration;
using DGFweb.Api;
using DGFweb.Api.Data;
using DGFweb.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var connectionStringMysql = builder.Configuration.GetConnectionString("ConnectionMysql");

builder.Services.AddDbContext<UserContext>(options =>
{
    options.UseMySql(
    connectionStringMysql,
    ServerVersion.Parse("8.0.30-MySQL"));
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddAutoMapper(typeof(Program));
var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services);
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dataContent = scope.ServiceProvider.GetRequiredService<UserContext>();
    dataContent.Database.Migrate();
}

startup.Configure(app, app.Environment);
app.Run();



