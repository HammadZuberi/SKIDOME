using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtension
    {
        public static IServiceCollection AddSwaggerDocument(this IServiceCollection services)
        {

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                var SecuritySchema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer Scheme ",
                    Name = "Authorisation",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer",SecuritySchema);

                //variable 
                var SecurityRequirement = new OpenApiSecurityRequirement{
                    {
                        SecuritySchema,new [] {"Bearer"}
                    }
                };

                c.AddSecurityRequirement(SecurityRequirement);
            });
            return services;
        }


        public static IApplicationBuilder UseSwaggerDocument(this IApplicationBuilder app)
        {

            app.UseSwagger();
            app.UseSwaggerUI();

            return app;
        }
    }
}