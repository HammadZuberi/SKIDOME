using System.CodeDom;
using System.Reflection;
using API.Errors;
using API.Middleware;
using Core;
using Core.Inerfaces;
using Infrastructure;
using Infrastructure.Data;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

//added extensions for clean code.
builder.Services.AddApplicationServices(builder.Configuration);


// builder.Services.adddbcontext
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//to serve images
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//for creating auto migration and our db again when app runs if not saved prev

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
//log program class
var logger = services.GetRequiredService<ILogger<Program>>();
try
{

    await context.Database.MigrateAsync();
    await StoreContextSeedData.SeedData(context);

}
catch (Exception ex)
{
    logger.LogError(ex, "Application encountered a migration error");
}
app.Run();
