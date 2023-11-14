using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DGFweb.Api.Dto;

public class UpdateUserDto
{
        public string Name { get; set; } = default!;
        // public string lastName { get; set; }
        public string password { get; set; }
}


