using Core.Entities;

namespace Core.Specifications
{
    public class ProductswithTypeBrandSpecifications : BaseSpecification<Product>
    {
        // changing the base parameters values
        public ProductswithTypeBrandSpecifications(ProductSpecsParam productParam) :
        base(
            x =>
            //|| or else operator
            (string.IsNullOrEmpty(productParam.Search) || x.Name.ToLower().Contains(productParam.Search)) &&
             (!productParam.BrandId.HasValue || x.ProductBrandId == productParam.BrandId) &&
               (!productParam.TypeId.HasValue || x.ProductTypeId == productParam.TypeId)
            )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);

            AddPagination(productParam.PageSize, (productParam.PageSize * (productParam.PageIndex - 1)));
            if (productParam.Sort != null)
            {
                switch (productParam.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(x => x.Price);
                        break;
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }


            }


        }


        public ProductswithTypeBrandSpecifications(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }

    }
}