using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DGFweb.Api.Models;
public class ForgotPasswordRequestToken
{
    [EmailAddress]
    [Required]
    public required string Email {set;get;}
}

