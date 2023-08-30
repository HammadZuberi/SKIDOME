using System.CodeDom;
using System.Reflection;
using Core;
using Core.Inerfaces;
using Infrastructure;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductRepository,ProductRepository>();

builder.Services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// builder.Services.adddbcontext
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//for creating auto migration and our db again when app runs if not saved prev

using var scope = app.Services.CreateScope();
var services =scope.ServiceProvider;
var context = services.GetRequiredService<StoreContext>();
//log program class
var logger= services.GetRequiredService<ILogger<Program>>();
try{

    await context.Database.MigrateAsync();
    await StoreContextSeedData.SeedData(context);

}catch(Exception ex){
    logger.LogError(ex,"Application encountered a migration error");
}
app.Run();
