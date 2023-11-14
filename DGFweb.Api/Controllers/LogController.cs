using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DGFweb.Api.Data;
using DGFweb.Api.Models;
using DGFweb.Api.Dto;

namespace DGFweb.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController: ControllerBase
    {
        private readonly UserContext _context;
        private readonly IMapper _mapper;

        public LogController(UserContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: https://localhost:5001/api/log
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Log>>> GetLog()
        {
          if (_context.Log == null)
          {
              return NotFound();
          }
            return await _context.Log.ToListAsync();
        }

        // https://localhost:5001/api/log
        [HttpPost]
        public async Task<IActionResult> PostLog(LogDTO Logdto)
        {
          if (_context.Log == null)
          {
              return Problem("Entity set 'LogContext.Log'  is null.");
          }
           
           var newLog = _mapper.Map<Log>(Logdto);
            _context.Log.Add(newLog);
            await _context.SaveChangesAsync();

            return Created($"/{newLog.Id}", newLog);
        }

        // GET: https://localhost:5001/api/log/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Log>> GetLog(int id)
        {
          if (_context.Log == null)
          {
              return NotFound();
          }
            var log = await _context.Log.FindAsync(id);

            if (log == null)
            {
                return NotFound();
            }

            return log;
        }

    }
 
}