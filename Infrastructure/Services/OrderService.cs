using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Inerfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        // private readonly IGenericRepository<Product> _productRepo;
        // private readonly IGenericRepository<Order> _orderRepo;
        // private readonly IGenericRepository<DeliveryMethod> _delRepo;
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;


        }

        public async Task<Order> CreateOrderAsync(string buyersEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {


            //get basket from repo
            var basket = await _basketRepo.GetCustomerBasket(basketId);
            // get items from product repo

            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {

                var productItem = await _unitOfWork.Repository<Product>().getbyIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }
            // GetDilevery Methods from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().getbyIdAsync(deliveryMethodId);

            // calculate sub total 
            var subTotal = items.Sum(item => item.Price * item.Quantity);
            //check to see if order exist
            var specs = new OrderByPaymentIntenIdSpecification(basket.PaymentIntenetId);

            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpecification(specs);
            //if user change thier order 
            if (order != null)
            {

                order.ShipToAddress = shippingAddress;
                order.Subtotal = subTotal;
                order.DeliveryMethod = deliveryMethod;

                _unitOfWork.Repository<Order>().Update(order);
            }
            else
            {    //create order
                order = new Order(items, buyersEmail, shippingAddress, deliveryMethod, subTotal, basket.PaymentIntenetId);

                _unitOfWork.Repository<Order>().Add(order);
            }
            //save order 
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            //delete basket after sucessful order and payment 
            // await _basketRepo.DeleteCustomerBasket(basketId);

            //return order

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDileveryMethodsAsync()
        {

            return await _unitOfWork.Repository<DeliveryMethod>().getListAllAsync();
        }

        public async Task<Order> GetOrdersByIdAsync(int id, string buyersEmail)
        {
            var sepecification = new OrderwithWithItemsOrderingSpecification(id, buyersEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpecification(sepecification);

        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUsers(string buyersEmail)
        {

            var specs = new OrderwithWithItemsOrderingSpecification(buyersEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(specs);
        }
    }
}