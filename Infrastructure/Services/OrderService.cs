using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Inerfaces;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<DeliveryMethod> _delRepo;
        private readonly IBasketRepository _basketRepo;
        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> delRepo
        , IGenericRepository<Product> productRepo, IBasketRepository basketRepo)
        {
            _basketRepo = basketRepo;
            _productRepo = productRepo;
            _orderRepo = orderRepo;
            _delRepo = delRepo;

        }

        public async Task<Order> CreateOrderAsync(string buyersEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {


            //get basket from repo
            var basket = await _basketRepo.GetCustomerBasket(basketId);
            // get items from product repo

            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {

                var productItem = await _productRepo.getbyIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            // GetDilevery Methods from repo
            var deliveryMethod = await _delRepo.getbyIdAsync(deliveryMethodId);
            // calculate sub total 

            var subTotal = items.Sum(item => item.Price * item.Quantity);

            //create order
            var Order = new Order(items, buyersEmail, shippingAddress, deliveryMethod, subTotal);
            //save order 
            //return order

            return Order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDileveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersByIdAsync(int id, string buyersEmail)
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrdersForUsers(string buyersEmail)
        {
            throw new NotImplementedException();
        }
    }
}