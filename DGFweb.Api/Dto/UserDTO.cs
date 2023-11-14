using System;
using System.Collections.Generic;
using System.Linq;
using DGFweb.Api.Models;

namespace DGFweb.Api.Dto
{
    public class UserDTO
    {

        public int Id { get; set; }
        public string Name { get; set; } = default!;
        // public string LastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public List<LogDTO> Log { get; set; }
    }
}


