using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Inerfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private readonly string WhSecret;
        private readonly ILogger<PaymentsController> _logger;
        public PaymentsController(IPaymentService paymentService, ILogger<PaymentsController> logger, IConfiguration config)
        {
            _logger = logger;
            this._paymentService = paymentService;
            WhSecret = config.GetSection("StripeSettings:WhSecret").Value;

        }


        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateorUpdatePAymentIntent(string basketId)
        {

            var basket = await _paymentService.CreateOrUpdatePaymentIntenet(basketId);

            if (basket == null)
                return BadRequest(new ApiResponse(400, "Problem with your basket"));

            return basket;


        }
        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {

            var json = await new StreamReader(Request.Body).ReadToEndAsync();


            try
            {

                //verify comming form Stripe;
                var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WhSecret, throwOnApiVersionMismatch: false);
                PaymentIntent intent;
                Order order;

                // Handle the event
                if (stripeEvent.Type == Events.PaymentIntentPaymentFailed)
                {
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment failed {id}", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation("Payment  to update order {id}", order.Id);

                }
                else if (stripeEvent.Type == Events.PaymentIntentSucceeded)
                {
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment succeded {id}", intent.Id);
                    //todo 
                    //update order with the new status

                    order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);

                    _logger.LogInformation("ORDER UPDATE TO PAYMENT SUCCESS {id} ", order.Id);
                }
                // ... handle other event types
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }

                return Ok();
            }
            catch (StripeException e)
            {
                Console.WriteLine($"Failed to update payment failed: {e.StackTrace}");
                return BadRequest();
            }

        }

    }

}