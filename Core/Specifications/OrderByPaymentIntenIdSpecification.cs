

using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntenIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntenIdSpecification(string paymentIntenetId) : 
        base(o => o.PaymentIntentId == paymentIntenetId)
        {
        }
    }
}