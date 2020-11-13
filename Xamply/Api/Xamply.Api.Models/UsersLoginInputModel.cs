using System.ComponentModel.DataAnnotations;

namespace Xamply.Api.Models
{
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
