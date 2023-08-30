using System.Collections.Generic;
using Core.Entities;

namespace Core;

public interface IProductRepository
{

public Task<Product> GetProductById(int id);

public Task<IReadOnlyList<Product>> GetProductList();
public Task<IReadOnlyList<ProductBrand>> GetProductBrandList();
public Task<IReadOnlyList<ProductType>> GetProductTypeList();

}
