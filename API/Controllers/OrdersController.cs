using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Inerfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;

        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;

        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.basketId, address);

            if (order == null)
                return BadRequest(new ApiResponse(400, "Problem creating order"));

            return Ok(order);
        }



        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDTO>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var order = await _orderService.GetOrdersForUsers(email);

            if (order == null)
                return BadRequest(new ApiResponse(400, "Problem showing the orders"));


            return Ok(_mapper.Map<IReadOnlyList<OrderToReturnDTO>>(order));
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDTO>> GetOrdersForUser(int id)
        {
            var email = HttpContext.User.RetrieveEmailFromPrincipal();

            var order = await _orderService.GetOrdersByIdAsync(id, email);

            if (order == null)
                return NotFound(new ApiResponse(404, "Problem showing the orders"));

            return Ok(_mapper.Map<OrderToReturnDTO>(order));
        }


        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethod()
        {
            // var email = HttpContext.User.RetrieveEmailFromPrincipal();
            var deliveryMethod = _orderService.GetDileveryMethodsAsync();


            if (deliveryMethod == null)
                return NotFound(new ApiResponse(404));

            return Ok(await deliveryMethod);
        }
    }
}