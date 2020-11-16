using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamply.Data.Models;
using Xamply.Api.Services.Common;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Xamply.Api.Services
{
    public class UsersService : IUsersService
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<XamplyUser> userManager;

        public UsersService(
            IConfiguration configuration,
            UserManager<XamplyUser> userManager)
        {
            this.configuration = configuration;
            this.userManager = userManager;
        }

        public async Task<XamplyUser> LoginAsync(string email, string password)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null || !await userManager.CheckPasswordAsync(user, password))
            {
                return null;
            }

            var role = (await this.userManager.GetRolesAsync(user)).Single();

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role),
            };

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JwtConfiguration:Secret"]));

            var token = new JwtSecurityToken
            (
                issuer: this.configuration["JwtConfiguration:Issuer"],
                audience: this.configuration["JwtConfiguration:Audience"],
                expires: DateTime.Now.AddDays(14),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            user.MetaData = new JwtSecurityTokenHandler().WriteToken(token);
            return user;
        }

        public async Task<XamplyUser> RegisterAsync(string email, string password)
        {
            var userExists = await this.userManager.FindByEmailAsync(email);
            if (userExists != null)
            {
                throw new ArgumentException(Errors.UserAlreadyExists);
            }

            var user = new XamplyUser()
            {
                Email = email,
                UserName = email
            };

            var userCreateResult = await this.userManager.CreateAsync(user, password);
            if (!userCreateResult.Succeeded)
            {
                throw new ArgumentException(Errors.UsersRegisterFailed);
            }

            await this.userManager.AddToRoleAsync(user, Roles.Default);

            return user;
        }
    }
}
