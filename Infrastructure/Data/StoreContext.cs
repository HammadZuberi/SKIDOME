
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {

        public StoreContext(DbContextOptions<StoreContext> option) : base(option)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }


        //for not messing it up creating fluent apis for entity migrations

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());


            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                //get all entitytype
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    //get all decimal type prop
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));
                    // arrange and set to double
                    foreach (var property in properties)
                    {

                        modelBuilder.Entity(entityType.Name)
                        .Property(property.Name)
                        .HasConversion<double>();
                    }


                }
            }
        }
    }

}