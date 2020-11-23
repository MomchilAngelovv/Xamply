﻿namespace Xamply.Api.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Xamply.Api.Common;
    using Xamply.Api.Models.InputModels;
    using Xamply.Api.Services;

    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(
            IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<object>> Register(UsersRegisterInputModel inputModel)
        {
            var user = await this.usersService.RegisterAsync(inputModel.Email, inputModel.Password);

            var response = new
            {
                user.Id,
                user.Email,
                user.CreatedOn
            };

            return response;
        }

        [HttpPost("login")]
        public async Task<ActionResult<BaseResponseModel>> Login(UsersLoginInputModel inputModel)
        {
            var user = await this.usersService.LoginAsync(inputModel.Email, inputModel.Password);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var response = new BaseResponseModel
            {
                Message = ResponseMessages.LoginSuccess,
                Status = ResponseStatuses.Success,
                Data = new
                {
                    user.Id,
                    user.Email,
                    AccessToken = user.MetaData
                },
            };

            return response;
        }
    }
}
