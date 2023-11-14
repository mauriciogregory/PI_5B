using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DGFweb.Api.Models;

public class ResetPassword
{
    public required string token { get; set; }
    public required string email { set; get; }
    public required string password { set; get; }
}



