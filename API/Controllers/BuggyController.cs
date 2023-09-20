using System.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using API.Errors;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Pipelines.Sockets.Unofficial.Arenas;

namespace API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {

        private readonly StoreContext iRep;

        public BuggyController(StoreContext iRep)
        {
            this.iRep = iRep;
        }

        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> TestAuthSecretText()
        {

            return "Seacret Stuff returend";
        }
        
        [HttpGet("notFound")]
        public ActionResult GetnotFoundRequest()
        {
            var thing = iRep.Products.Find(43);
            if (thing == null)

                return NotFound(new ApiResponse(404));

            return Ok();

        }

        //retorna lista de objetos do tipo BuggyController
        [HttpGet("ServerError")]
        public ActionResult GetServerError()
        {
            var thing = iRep.Products.Find(43);
            var thingreturn = thing.ToString();

            return Ok();

        }
        //retorna lista de objetos do tipo BuggyController
        [HttpGet("BadRequest")]
        public ActionResult GetBadRequest()
        {

            return BadRequest(new ApiResponse(400));

        }

        //retorna um objeto do tipo BuggyController pelo id
        [HttpGet("BadRequest/{id}")]
        public ActionResult GetByID(int id)
        {
            return Ok();
        }


        // //atualiza um objeto do tipo BuggyController pelo id
        // [HttpPut("{id}")]
        // public IActionResult UpdateByID(int id, [FromBody] BuggyController BuggyController)
        // {
        //     try
        //     {
        //         if (iRep.Update(id, BuggyController))
        //         {
        //             return Ok("Atualizado com sucesso");
        //         }
        //         else
        //         {
        //             return BadRequest("Não foi possível atualizar objeto");
        //         }

        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        // }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProductTypes()
        {

            var products = await iRep.Products.ToListAsync();
            products.OrderBy(p => p.Price);
            return Ok(products);
        }
    }
}