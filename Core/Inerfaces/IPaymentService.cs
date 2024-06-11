using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Core.Inerfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket>CreateOrUpdatePaymentIntenet(string basketId);
        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);        
        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
        
    }
}