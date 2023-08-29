// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Core;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly IProductRepository _context;

        public ProductsController(IProductRepository context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
        {

            var products = await _context.GetProductList();
            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>>  GetProduct(int id)
        {

            var products = await _context.GetProductById(id);
            return Ok(products);
        }

        
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {

            var products = await _context.GetProductBrandList();
            return Ok(products);
        }
        
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {

            var products = await _context.GetProductTypeList();
            return Ok(products);
        }
    }
}