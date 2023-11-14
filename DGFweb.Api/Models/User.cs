using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Org.BouncyCastle.Asn1.Cms;

namespace DGFweb.Api.Models
{
    public class User
    {

        [Key] public int Id { get; set; }
        public string  Name { get; set; } = default!;
        [EmailAddress]  public required string email { get; set; }
        public required string password { get; set; } = default;
        public string verification_code {get;set;} = "0";
        public DateTimeOffset code_expiration_time {get;set;} = default;
        public List<Log>? Log { get; set; }

    }
}




