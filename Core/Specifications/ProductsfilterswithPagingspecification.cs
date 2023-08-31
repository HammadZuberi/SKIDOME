using Core.Entities;

namespace Core.Specifications
{
    public class ProductsfilterswithPagingspecification : BaseSpecification<Product>

    {

        public ProductsfilterswithPagingspecification(ProductSpecsParam productParam) :
            base(
                x =>
                 (string.IsNullOrEmpty(productParam.Search) || x.Name.ToLower().Contains(productParam.Search)) &&
                (!productParam.BrandId.HasValue || x.ProductBrandId == productParam.BrandId) &&
                   (!productParam.TypeId.HasValue || x.ProductTypeId == productParam.TypeId)
                )
        {

        }

    }
}