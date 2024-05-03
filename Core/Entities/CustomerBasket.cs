namespace Core.Entities
{
    public class CustomerBasket
    {
        //for redis to construct new instance of custmer basket
        public CustomerBasket()
        {

        }
        public CustomerBasket(string id)
        {
            this.Id = id;

        }
        public string Id { get; set; }

        public List<BasketItems> Items { get; set; } = new List<BasketItems>();

        public int? DileveryMethodId { get; set; }
        public string? ClientSecret { get; set; }
        public string? PaymentIntenetId { get; set; }
    }

}