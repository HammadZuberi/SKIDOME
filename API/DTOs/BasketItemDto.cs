using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{


    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }

        public List<BasketItemDto> Items { get; set; }
    }


    public class BasketItemDto
    {

        [Required] public int Id { get; set; }
        [Required] public string ProductName { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than zero")]
        public int Quantity { get; set; }

        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater than zero")]
        public decimal Price { get; set; }
        [Required] public string PictureUrl { get; set; }
        [Required] public string Brand { get; set; }
        [Required] public string Type { get; set; }

    }
}