using Microsoft.AspNetCore.Mvc;
using Core.Inerfaces;
using Core.Entities;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {

        private readonly IBasketRepository iRep;

        public BasketController(IBasketRepository iRep)
        {
            this.iRep = iRep;
        }

        //retorna lista de objetos do tipo BasketController
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await iRep.GetCustomerBasket(id);

            // if(basket == null)

            return Ok(basket ?? new CustomerBasket(id));

        }
        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket customerBasket)
        {


            var createdBasket = await iRep.UpdateCustomerBasket(customerBasket);

            return Ok(createdBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {

            await iRep.DeleteCustomerBasket(id);
        }



    }
}