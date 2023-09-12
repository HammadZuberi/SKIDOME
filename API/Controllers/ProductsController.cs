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
using API.Errors;
using System.Net;
using API.Helpers;

namespace API.Controllers
{
    // [ApiController]
    // [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {


        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IMapper _mapper;
        public ProductsController(IGenericRepository<Product> productRepo, IGenericRepository<ProductBrand> brandRepo
        , IGenericRepository<ProductType> typeRepo, IMapper mapper)
        {
            //_context = context;
            _productRepo = productRepo;
            _brandRepo = brandRepo;
            _typeRepo = typeRepo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDTO>>> GetProducts
        ([FromQuery] ProductSpecsParam productParam)
        {
            var specs = new ProductswithTypeBrandSpecifications(productParam);

            var countspecs = new ProductsfilterswithPagingspecification(productParam);
            var totalItems = await _productRepo.GetCount(countspecs);

             //var products2 = await _productRepo.getListAllAsync();
            var products = await _productRepo.ListAsync(specs);

            var Data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);

            var response = new Pagination<ProductToReturnDTO>( productParam.PageSize,productParam.PageIndex, totalItems, Data);

            return Ok(response);
        }


        [HttpGet("{id}")]
        //producing swager doc for error response not mandatory for all but noce to have
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiExceptions), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDTO>> GetProducts(int id)
        {

            var specs = new ProductswithTypeBrandSpecifications(id);
            // var products = await _productRepo.getbyIdAsync(id);
            var products = await _productRepo.GetEntityWithSpecification(specs);

            if (products == null)
                return NotFound(new ApiExceptions(404));
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