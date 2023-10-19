namespace Core.Entities.OrderAggregate
{
    public class DileveryMethod :BaseEntity
    {
        public string ShortName { get; set; }
        public string DiliveryTime { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }
}