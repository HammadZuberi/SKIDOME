﻿using System.Text.Json;
using Core.Entities;
using Infrastructure.Data;

namespace Infrastructure;

public class StoreContextSeedData
{


    public static async Task SeedData(StoreContext context)
    {


        
        if (!context.ProductTypes.Any())
        {

            var ProductTypesData = File.ReadAllBytes(@"../Infrastructure/Data/SeedData/types.json");
            var ProductTypes = JsonSerializer.Deserialize<List<ProductType>>(ProductTypesData);
            context.AddRange(ProductTypes);
        }
        
        if (!context.ProductBrands.Any())
        {

            var ProductBrandsData = File.ReadAllBytes(@"../Infrastructure/Data/SeedData/brands.json");
            var ProductBrands = JsonSerializer.Deserialize<List<ProductBrand>>(ProductBrandsData);
            context.AddRange(ProductBrands);
        }

        if (!context.Products.Any())
        {

            var ProductsData = File.ReadAllBytes(@"../Infrastructure/Data/SeedData/products.json");
            var products = JsonSerializer.Deserialize<List<Product>>(ProductsData);
            context.AddRange(products);
        }

        if(context.ChangeTracker.HasChanges())
        await context.SaveChangesAsync();

    }
}
