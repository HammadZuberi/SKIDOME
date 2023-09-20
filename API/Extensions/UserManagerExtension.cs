using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtension
    {

        public static async Task<AppUser> FindUserByClaimsPrinciplewithAddress(this UserManager<AppUser> userManager
        , ClaimsPrincipal principal)
        {

            var email = principal.FindFirstValue(ClaimTypes.Email);

            var result = await userManager.Users.Include(i => i.Address).SingleOrDefaultAsync(x => x.Email == email);

            return result;

        }


        public static async Task<AppUser> FindByEmailClaimsPrinciple(this UserManager<AppUser> userManager
        , ClaimsPrincipal principal)
        {
            var result = await userManager.Users.SingleOrDefaultAsync(
                x => x.Email == principal.FindFirstValue(ClaimTypes.Email));

            return result;

        }
    }
}