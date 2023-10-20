using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Inerfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyersEmail,int deliveryMethodId,string basketId,Address shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersByIdAsync(int id,string buyersEmail);
        Task<Order> GetOrdersForUsers(string buyersEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDileveryMethodsAsync();

    }
}