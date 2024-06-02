using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Inerfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        public PaymentsController(IPaymentService paymentService)
        {
            this._paymentService = paymentService;
            
        }


        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateorUpdatePAymentIntent(string basketId){

        var basket = await _paymentService.CreateOrUpdatePaymentIntenet(basketId);
        
        if(basket == null)
        return BadRequest(new ApiResponse(400, "Problem with your basket"));

        return basket;

    }
    }
}