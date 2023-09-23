using Microsoft.AspNetCore.Mvc;
using Core.Inerfaces;
using Core.Entities;
using API.DTOs;
using AutoMapper;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {

        private readonly IBasketRepository iRep;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository iRep, IMapper mapper)
        {
            _mapper = mapper;
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
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto customerBasket)
        {
            //auto convert the inner object to mapping object basketitem to item dto 
            var basket = _mapper.Map<CustomerBasketDto, CustomerBasket>(customerBasket);

            var createdBasket = await iRep.UpdateCustomerBasket(basket);

            return Ok(createdBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {

            await iRep.DeleteCustomerBasket(id);
        }



    }
}