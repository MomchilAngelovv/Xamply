namespace Xamply.Api.Models
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
