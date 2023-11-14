using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DGFweb.Api.Models;

public class Login
{
    [EmailAddress]public required string Email {get; set;}
    public required string Password {get; set;}
}
