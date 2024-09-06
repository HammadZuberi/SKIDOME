using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }

        public List<BasketItemDto> Items { get; set; }
        public int? DileveryMethodId { get; set; }
        public string? ClientSecret { get; set; } = string.Empty;
        public string? PaymentIntenetId { get; set; } = string.Empty;
        public decimal ShippingPrice { get; set; }
    }
}
