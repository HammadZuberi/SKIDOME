using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderwithWithItemsOrderingSpecification : BaseSpecification<Order>
    {
        public OrderwithWithItemsOrderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o=> o.OrderItems);
            AddInclude(o=> o.DeliveryMethod);
            AddOrderByDesc(o=> o.OrderDate);
        }

        public OrderwithWithItemsOrderingSpecification(int OrderId, string email) : base(o=> o.Id ==OrderId && o.BuyerEmail==email)
        {
            
            AddInclude(o=> o.OrderItems);
            AddInclude(o=> o.DeliveryMethod);
        }
    }
}