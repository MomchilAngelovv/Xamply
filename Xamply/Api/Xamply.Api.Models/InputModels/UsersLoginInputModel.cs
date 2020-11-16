namespace Xamply.Api.Models.InputModels
{
    using System.ComponentModel.DataAnnotations;

    public class UsersLoginInputModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
