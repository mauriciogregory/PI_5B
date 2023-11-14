using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DGFweb.Api.Dto
{
    public class LogDTO
    {
        public int Id { get; set; }
        public DateTime dataCreateAt { get; set; }
        public string mensagem { get; set; }
        public int UserId { get; set; }
    }
}


