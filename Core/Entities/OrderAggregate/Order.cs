

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
            
        }
        public Order(IReadOnlyList<OrderItem> OrderItems,
        string email, Address shipToAddress, DeliveryMethod deliveryMethod, decimal subtotal)
        {
            this.BuyerEmail = email;
            this.ShipToAddress = shipToAddress;
            this.DeliveryMethod = deliveryMethod;
            this.Subtotal = subtotal;
            this.OrderItems=OrderItems;

        } 
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public Address ShipToAddress { get; set; }

        public IReadOnlyList<OrderItem> OrderItems { get; set; }

        public DeliveryMethod DeliveryMethod { get; set; }

        public decimal Subtotal { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        //for stripe payment 
        public string PaymentIntentId { get; set; }

        //automapper reads the GET and map to Total property
        public decimal GetTotal()
        {

            return Subtotal + DeliveryMethod.Price;
        }
    }
}