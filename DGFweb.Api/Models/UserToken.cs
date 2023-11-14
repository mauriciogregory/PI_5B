namespace DGFweb.Api.Models
{
    public class UserToken
    {
        public required User User {get;set;}
        public required string JWTToken {get;set;}
    }
}


