using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Infrastructure.Data;

namespace Infrastructure;

public class StoreContextSeedData
{
    public static async Task SeedData(StoreContext context)
    {
        var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        if (!context.ProductTypes.Any())
        {
            var ProductTypesData = File.ReadAllBytes(path + @"/Data/SeedData/types.json");
            var ProductTypes = JsonSerializer.Deserialize<List<ProductType>>(ProductTypesData);
            context.AddRange(ProductTypes);
        }

        if (!context.ProductBrands.Any())
        {
            var ProductBrandsData = File.ReadAllBytes(path + @"/Data/SeedData/brands.json");
            var ProductBrands = JsonSerializer.Deserialize<List<ProductBrand>>(ProductBrandsData);
            context.AddRange(ProductBrands);
        }

        if (!context.Products.Any())
        {
            var ProductsData = File.ReadAllBytes(path + @"/Data/SeedData/products.json");
            var products = JsonSerializer.Deserialize<List<Product>>(ProductsData);
            context.AddRange(products);
        }

        if (!context.DileveryMethods.Any())
        {
            var DeliveryData = File.ReadAllBytes(@"../Infrastructure/Data/SeedData/delivery.json");
            var Delivery = JsonSerializer.Deserialize<List<DeliveryMethod>>(DeliveryData);
            context.AddRange(Delivery);
        }
        if (context.ChangeTracker.HasChanges())
            await context.SaveChangesAsync();
    }
}
