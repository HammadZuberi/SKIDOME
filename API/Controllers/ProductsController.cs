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
using Core.Inerfaces;
using Core.Specifications;
using System.Runtime.InteropServices;
using API.DTOs;
using AutoMapper;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {


        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IMapper _mapper;
        public ProductsController(IGenericRepository<Product> productRepo, IGenericRepository<ProductBrand> brandRepo
        , IGenericRepository<ProductType> typeRepo, IMapper mapper)
        {
            // _context = context;
            _productRepo = productRepo;
            _brandRepo = brandRepo;
            _typeRepo = typeRepo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
        {
            var specs = new ProductswithTypeBrandSpecifications();

            // var products = await _productRepo.getListAllAsync();

            var products = await _productRepo.ListAsync(specs);
            return Ok(_mapper.Map<IReadOnlyList<Product> , IReadOnlyList<ProductToReturnDTO>>(products));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {

            var specs = new ProductswithTypeBrandSpecifications(id);
            // var products = await _productRepo.getbyIdAsync(id);
            var products = await _productRepo.GetEntityWithSpecification(specs);

            return Ok(_mapper.Map<Product, ProductToReturnDTO>(products));
        }


        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {

            var products = await _brandRepo.getListAllAsync();
            return Ok(products);
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {

            var products = await _typeRepo.getListAllAsync();
            return Ok(products);
        }
    }
}