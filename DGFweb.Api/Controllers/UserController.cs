using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DGFweb.Api.Data;
using DGFweb.Api.Models;
using DGFweb.Api.Dto;
using Microsoft.AspNetCore.Authorization;

namespace DGFweb.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase

    {
        private readonly UserContext _context;
        private readonly IMapper _mapper;

        public UserController(UserContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: // https://localhost:5001/api/user
        [HttpGet]
        public async Task<ActionResult> GetUser()
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var users = await _context.User.Include(_ => _.Log).ToListAsync();
            return Ok(users);
        }


        // https://localhost:5001/api/user
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostUser(UserDTO userdto)
        {
            if (_context.User == null)
            {
                return Problem("Dados vazios ou inexistentes.");
            }

            if (_context.User.Any(x => x.email == userdto.email))
            {
                throw new Exception("Usuário existente ou email já cadastrado!");
            }

            var newUser = _mapper.Map<User>(userdto);
            newUser.password = BCrypt.Net.BCrypt.HashPassword(newUser.password);

            var log = new Log
            {
                Mensagem = "Usuário Criado!",
                DataCreateAt = DateTime.UtcNow
            };

            newUser.Log.Add(log);

            _context.User.Add(newUser);

            await _context.SaveChangesAsync();

            return Created($"/{newUser.Id}", newUser);
        }

        // deleta: https://localhost:5001/api/user/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET:  https://localhost:5001/api/user/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }

            var user = await _context.User
            .Include(_ => _.Log).Where(_ => _.Id == id).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // https://localhost:5001/api/user/1
        [HttpPatch("{id}")]
        public async Task<IActionResult> PutUser(int id, UpdateUserDto updateUserDto)
        {
            if (_context.User == null)
            {
                return NotFound();
            }

            if (!_context.User.Any(x => x.Id == id))
            {
                throw new Exception("Usuário incorreto ou inexistente");
            }

            var user = await _context.User.Where(_ => _.Id == id).FirstOrDefaultAsync();

            // var updateUser = _mapper.Map<UserDTO>(updateUserDto);
            user!.password = BCrypt.Net.BCrypt.HashPassword(updateUserDto.password);

            var log = new Log
            {
                Mensagem = "Usuário Modificado!",
                DataCreateAt = DateTime.UtcNow
            };

            user!.Log.Add(log);

            user.Name = updateUserDto.Name;
            // user.lastName = updateUserDto.lastName;
            _context.User.Update(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // https://localhost:5001/api/user/change_password
        [HttpPatch("change_password")]
        public async Task<IActionResult> NewPassword(UserChangePasswordDTO userChangePasswordDTO)
        {
            if (_context.User == null)
            {
                return NotFound();
            }

            if (!_context.User.Any(x => x.email == userChangePasswordDTO.email))
            {
                throw new Exception("Email incorreto ou usuário não cadastrado!");
            }

            var user = await _context.User.Where(_ => _.email == userChangePasswordDTO.email).FirstOrDefaultAsync();

            user.email = userChangePasswordDTO.email;
            user.password = BCrypt.Net.BCrypt.HashPassword(userChangePasswordDTO.password);

            // var updateUser = _mapper.Map<User>();
            _context.User.Update(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

    }
}

