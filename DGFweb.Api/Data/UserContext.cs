using Microsoft.EntityFrameworkCore;
using DGFweb.Api.Models;
using Microsoft.Extensions.Options;
// using Microsoft.EntityFrameworkCore;
// using Pomelo.EntityFrameworkCore;
// using Pomelo.EntityFrameworkCore.MySql;

namespace DGFweb.Api.Data

{
    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            //
        }

        public DbSet<Log> Log {get; set;}
        public DbSet<User> User { get; set;}
    }
}

