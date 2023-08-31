using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core;
using Core.Inerfaces;
using Infrastructure;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        //use this keyword to make extension return and input same type
        public static IServiceCollection AddApplicationServices(this IServiceCollection Services, IConfiguration config)
        {
            // cntl +shift+l select all word


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            Services.AddEndpointsApiExplorer();
            Services.AddSwaggerGen();

            //extend the functionality by extension metonds
            Services.AddScoped<IProductRepository, ProductRepository>();

            Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            Services.AddDbContext<StoreContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
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
                policy.AllowAnyHeader().AllowAnyMethod()
                .WithOrigins("https://localhost:4200")
                );
            });

            return Services;

        }

    }
}