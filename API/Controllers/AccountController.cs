using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Inerfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _UserManager;
        private readonly SignInManager<AppUser> _SignInManager;
        private readonly ITokenService _token;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, ITokenService token, IMapper mapper)
        {
            _token = token;
            _SignInManager = signInManager;
            _UserManager = userManager;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]

        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {

            // get current user info when website restarts after login 

            var user = await _UserManager.FindByEmailClaimsPrinciple(User);

            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = _token.CreateToken(user)
            };

        }

        [HttpGet("emailexists")]

        public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
        {


            // var user = await _UserManager.FindByEmailAsync(email);
            // if (user != null)
            //     return true;

            // return false;
            return await _UserManager.FindByEmailAsync(email) != null;

        }
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            // var Email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            // var user = await _UserManager.FindByEmailAsync(Email);
            //by claims principle
            var user = await _UserManager.FindUserByClaimsPrinciplewithAddress(User);

            return _mapper.Map<Address, AddressDto>(user.Address);
        }


        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {

            var user = await _UserManager.FindUserByClaimsPrinciplewithAddress(HttpContext.User);
            user.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await _UserManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest(new ApiResponse(400, "Problem updating the user "));
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDto login)
        {

            var user = await _UserManager.FindByEmailAsync(login.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));


            var result = await _SignInManager.CheckPasswordSignInAsync(user, login.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = _token.CreateToken(user)
            };
        }




        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterDto register)
        {

            if (CheckEmailExists(register.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse
                {
                    Errors = new[] { "The Email and Adress already exists" }
                });
            }

            var user = new AppUser
            {
                DisplayName = register.DisplayName,
                UserName = register.Email,
                Email = register.Email,

            };

            var result = await _UserManager.CreateAsync(user, register.Password);


            if (!result.Succeeded) return BadRequest(new ApiResponse(400));


            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = _token.CreateToken(user)
            };
        }

    }

}