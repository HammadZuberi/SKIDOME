using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Errors;
using Core.Entities.Identity;
using Core.Inerfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _UserManager;
        private readonly SignInManager<AppUser> _SignInManager;
        private readonly ITokenService _token;
        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, ITokenService token)
        {
            _token = token;
            _SignInManager = signInManager;
            _UserManager = userManager;
        }

        [Authorize]
        [HttpGet]

        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {

            // get current user info when website restarts after login 

            var Email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _UserManager.FindByEmailAsync(Email);

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
        [HttpGet("Address")]
        public async Task<ActionResult<Address>> GetUserAddress()
        {
            var Email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var user = await _UserManager.FindByEmailAsync(Email);

            return user.Address;
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