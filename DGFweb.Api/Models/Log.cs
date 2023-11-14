using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DGFweb.Api.Models
{
    public class Log
    {
        [Key] public int Id { get; set; }
        public DateTime DataCreateAt { get; set; }
        public required String Mensagem { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}

