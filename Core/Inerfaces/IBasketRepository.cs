using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Inerfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetCustomerBasket(string BasketId);
        Task<CustomerBasket> UpdateCustomerBasket(CustomerBasket customerBasket);
        Task<bool> DeleteCustomerBasket(string BasketId);
    }
}