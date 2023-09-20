using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {

        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var user = new AppUser()
                {
                    DisplayName = "Hammad",
                    Email = "Hzuberi@test.com",
                    UserName = "HammadZuberi",
                    Address = new Address
                    {
                        FirstName = "Hammad",
                        LastName = "zuberi",
                        State = "NY",
                        Street = "340 Street",
                        City = "New York",
                        ZipCode = "90210"

                    }
            };
                var user1 = new AppUser()
                {
                    DisplayName = "BOB",
                    Email = "bob@test.com",
                    UserName = "Bob Test",
                    Address = new Address
                    {
                        FirstName = "BOB",
                        LastName = "TEST",
                        State = "NY",
                        Street = "340 Street",
                        City = "New York",
                        ZipCode = "90210"

                    }
            };
            await userManager.CreateAsync(user,"PA$$word12");
            
            await userManager.CreateAsync(user1,"Pa$$w0rd");
        }

    }
}
}