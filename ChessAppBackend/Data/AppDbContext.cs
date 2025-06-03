using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ChessAppBackend.Models;

namespace ChessAppBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

    }
}
