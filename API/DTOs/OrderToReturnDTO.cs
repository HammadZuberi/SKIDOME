using Core.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderToReturnDTO
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; }

        public Address ShipToAddress { get; set; }

        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }

        public string DeliveryMethod { get; set; }
        public decimal ShipingPrice { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }

        public string Status { get; set; } 


    }
}