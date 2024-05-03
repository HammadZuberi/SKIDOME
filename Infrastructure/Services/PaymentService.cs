using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Inerfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Product;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration __config;
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;

        public PaymentService(IBasketRepository basketRepo,IUnitOfWork unitOfWork,IConfiguration config)
        {
          _unitOfWork = unitOfWork;
          _basketRepo = basketRepo;
            __config = config;
            
        }


        public async Task<CustomerBasket> CreateOrUpdatePaymentIntenet(string basketId)
        {
            StripeConfiguration.ApiKey = __config["StripeSettings:SecretKey"];
            // publishableKey
            var basket = await _basketRepo.GetCustomerBasket(basketId);
            var shippingPrice = 0m;

            if(basket.DileveryMethodId.HasValue){
                //item , Id ,Dileverymethod from basket only 
                var dileveryMethod= await _unitOfWork.Repository<DeliveryMethod>()
                .getbyIdAsync((int)basket.DileveryMethodId);

                shippingPrice= dileveryMethod.Price;

            }

            foreach( var item in basket.Items){

                var productItem = await _unitOfWork.Repository<Product>().getbyIdAsync((int)item.Id);

                if(item.Price != productItem.Price){

                    item.Price = productItem.Price;
                }
                var service = new PaymentIntentService();
                PaymentIntent intent;


                if(string.IsNullOrEmpty(basket.PaymentIntenetId)){

                    var options = new PaymentIntentCreateOptions{

                        Amount = (long) basket.Items.Sum( i=> i.Quantity *(i.Price *100)) 
                        + (long) shippingPrice *100,
                        Currency= "usd",
                        PaymentMethodTypes = new List<string>{"card"}
                    };

                    intent = await service.CreateAsync(options);

                    basket.PaymentIntenetId = intent.Id;
                    basket.ClientSecret = intent.ClientSecret;  
                }
                else{

                    
                    var options = new PaymentIntentUpdateOptions{

                        Amount = (long) basket.Items.Sum( i=> i.Quantity *(i.Price *100)) 
                        + (long) shippingPrice *100
                    };
                    
                    intent = await service.UpdateAsync( basket.PaymentIntenetId ,options);
                }
//cahnge the basket payment and items
                await _basketRepo.UpdateCustomerBasket(basket);
                return basket;
            }
        }
    }
}