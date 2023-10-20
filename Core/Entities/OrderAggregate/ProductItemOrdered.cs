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

        public ProductItemOrdered(int id, string productName, string pictureUrl)
        {
            this.Id = id;
            this.ProductName = productName;
            this.PictureUrl = pictureUrl;

        }
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}