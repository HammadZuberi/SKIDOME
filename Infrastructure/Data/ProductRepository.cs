using System.Collections.Generic;
using Core;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ProductRepository : IProductRepository
{

    private readonly StoreContext _context;
    public ProductRepository(StoreContext context)
    {
        _context = context;
    }


    public async Task<Product> GetProductById(int id)
    {
        return await _context.Products
        .Include(p => p.ProductBrand).
        Include(p => p.ProductType)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IReadOnlyList<Product>> GetProductList()
    {
        return await _context.Products.Include(p => p.ProductBrand).Include(p => p.ProductType).ToListAsync();
    }


    public async Task<IReadOnlyList<ProductBrand>> GetProductBrandList()
    {
        return await _context.ProductBrands.ToListAsync();
    }
    public async Task<IReadOnlyList<ProductType>> GetProductTypeList()
    {
        return await _context.ProductTypes.ToListAsync();
    }
}
