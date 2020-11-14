﻿namespace Xamply.Api.Utilities
{
    using System;
    using System.Text;
    using System.Threading.Tasks;
    using System.IdentityModel.Tokens.Jwt;

    using Microsoft.AspNetCore.Http;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.Extensions.Configuration;

    public class ParseAuthorizationToken
    {
        private readonly RequestDelegate next;
        private readonly IConfiguration configuration;

        public ParseAuthorizationToken(RequestDelegate next, IConfiguration configuration)
        {
            this.next = next;
            this.configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            string authHeader = context.Request.Headers["Authorization"];

            if (authHeader != null)
            {
                var token = authHeader.Replace("Bearer ", string.Empty);
                var principal = new JwtSecurityTokenHandler()
                    .ValidateToken(
                        token,
                        new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = this.configuration["JwtConfiguration:Issuer"],
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JwtConfiguration:Secret"])),
                            ValidAudience = this.configuration["JwtConfiguration:Audience"],
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ClockSkew = TimeSpan.FromMinutes(1),
                        }, out _);

                context.User = principal;
            }
            await next(context);
        }
    }
}
