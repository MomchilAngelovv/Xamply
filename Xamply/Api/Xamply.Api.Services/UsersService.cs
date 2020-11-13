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
            var user = await this.userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }

            var hashedPassword = this.userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (hashedPassword != PasswordVerificationResult.Success)
            {
                return null;
            }

            var role = (await this.userManager.GetRolesAsync(user)).Single();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = this.configuration["JwtConfiguration:Audience"],
                Issuer = this.configuration["JwtConfiguration:Issuer"],
                Subject = new ClaimsIdentity(new[]
                {
                     new Claim(ClaimTypes.NameIdentifier, user.Id),
                     new Claim(ClaimTypes.Email, user.Email),
                     new Claim(ClaimTypes.Role, role),
                }),
                Expires = DateTime.UtcNow.AddDays(14),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this.configuration["JwtConfiguration:Secret"])), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var secutiryToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(secutiryToken);
            user.MetaData = token;

            return user;
        }

        public async Task<XamplyUser> RegisterAsync(string email, string password)
        {
            var user = new XamplyUser
            {
                Email = email,
                UserName = email,
            };

            var result = await this.userManager.CreateAsync(user, password);

            if (result.Succeeded == false)
            {
                throw new ArgumentException(Errors.UsersRegisterFailed);
            }

            await this.userManager.AddToRoleAsync(user, Roles.Default);

            return user;
        }
    }
}
