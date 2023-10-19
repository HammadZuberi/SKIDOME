using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {


        public ProductItemOrdered()
        {

        }

        public ProductItemOrdered(int id, int productName, int pictureUrl)
        {
            this.Id = id;
            this.ProductName = productName;
            this.PictureUrl = pictureUrl;

        }
        public int Id { get; set; }
        public int ProductName { get; set; }
        public int PictureUrl { get; set; }
    }
}