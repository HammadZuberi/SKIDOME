using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core;
using Core.Inerfaces;
using Infrastructure;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        //use this keyword to make extension return and input same type
        public static IServiceCollection AddApplicationServices(this IServiceCollection Services, IConfiguration config)
        {
            // cntl +shift+l select all word



            //extend the functionality by extension metonds
            Services.AddSingleton<IResponseCacheInterface,ResponseCacheService>();
            Services.AddScoped<IProductRepository, ProductRepository>();
            Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            Services.AddScoped<IBasketRepository, BasketRepository>();
            Services.AddScoped<ITokenService, TokenService>();
            Services.AddScoped<IOrderService,OrderService>();
            Services.AddScoped<IUnitOfWork,UnitOfWork>();
            Services.AddScoped<IPaymentService, PaymentService>();

            //service IOC

            Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            Services.AddDbContext<StoreContext>(opt =>
            {
                // opt                .UseSqlite(config.GetConnectionString("DefaultConnection"));
                
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            Services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var option = ConfigurationOptions.Parse(config.GetConnectionString("Redis"));
                return ConnectionMultiplexer.Connect(option);
            });

            // for overridding the normal behavior of the validation error by api controller pass the clubed error 
            Services.Configure<ApiBehaviorOptions>(option =>
            {
                option.InvalidModelStateResponseFactory = actionContext =>
                {

                    var errors = actionContext.ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .SelectMany(e => e.Value.Errors)
                    .Select(e => e.ErrorMessage).ToArray();

                    var errorstate = new ApiValidationErrorResponse { Errors = errors };

                    return new BadRequestObjectResult(errorstate);
                };
            });

            //cross origin resource server
            Services.AddCors(option =>
            {

                option.AddPolicy("CorsPolicy", policy =>
                policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
                // .WithOrigins("https://localhost:4200")
                );
            });

            return Services;

        }

    }
}