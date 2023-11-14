using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DGFweb.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using DGFweb.Api.Data;
using System.Configuration;
using System.Net.Mail;
using System.Net;
using System.Text.Json;
using System.Net.Mime;

namespace DGFweb.Api.Controllers
{
    // https://localhost:5001/api/auth
    [ApiController]
    [Route("api/auth")]
    [Authorize]
    public class AuthController : Controller
    {
        private readonly JWTSettings _jwtsettings;
        private readonly UserContext _context;

        public AuthController(IOptions<JWTSettings> jwtsettings, UserContext context)
        {
            _jwtsettings = jwtsettings.Value;
            _context = context;
        }
        // https://localhost:5001/v1/auth/login
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ActionResult<UserToken> Authenticate([FromBody] Login login)
        {

            var user = _context.User.FirstOrDefault(_ => _.email == login.Email);

            if (user == null)
            {
                return NotFound(new { message = "E-mail ou Senha inválidos" });
            }

            if (!BCrypt.Net.BCrypt.Verify(login.Password, user.password))
            {
                return NotFound(new { message = "E-mail ou Senha não estão corretas" });
            }
            else
            {
                var token = GenerateAccessToken(user);

                return new UserToken
                {
                    User = user,
                    JWTToken = token
                };
            }
        }

        // https://localhost:5001/api/auth/send-email
        [HttpPost]
        [Route("/api/auth/send-email")]
        [AllowAnonymous]
        public async Task<ActionResult<ValidateTokenSendToEmail>> SendEmail([FromBody] ForgotPasswordRequestToken forgotPasswordRequestToken)
        {
            var email = forgotPasswordRequestToken.Email;
            if (forgotPasswordRequestToken.Email == null)
            {
                return NotFound(new { message = "Campo email não pode ser nulo!" });
            }

            var user = _context.User.FirstOrDefault(_ => _.email == email);

            if (user == null)
            {
                throw new Exception("Usuário incorreto ou inexistente");
            }
            var token = GenerateNewToken();

            ValidateTokenSendToEmail validateTokenSendToEmail = new ValidateTokenSendToEmail
            {
                Token = token
            };

            user.verification_code = validateTokenSendToEmail.Token;
            user.code_expiration_time = DateTimeOffset.Now.AddSeconds(DateTime.UtcNow.Millisecond + 1);
            _context.User.Update(user);
            await _context.SaveChangesAsync();

            SendEmailVerification(user);

            return Ok(true);
        }

        // https://localhost:5001/api/auth/validate-code
        [HttpPost]
        [Route("/api/auth/validate-code")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> ValidaToken([FromBody] ResetPassword resetPassword)
        {

            if (resetPassword.token == null || resetPassword.email == null)
            {
                return NotFound(new { message = "Token não existe ou campos não podem ser nulos!" });
            }

            //Any = return bool
            var user = _context.User.FirstOrDefault(x => x.email == resetPassword.email && x.verification_code == resetPassword.token);

            if (user == null)
            {
                return NotFound(new { message = "Email não cadastrado ou Token não válido!" });
            }

            DateTime expirationTokenTime = user.code_expiration_time.DateTime;
            DateTime nowTime = DateTime.UtcNow;

            int result = DateTime.Compare(nowTime, expirationTokenTime);

            if (result == 1)
            {
                return NotFound(new { message = "Token expirado ou não válido!" });
            }

            if (_context.User.Any(x => x.verification_code == resetPassword.token))
            {
                user.password = BCrypt.Net.BCrypt.HashPassword(resetPassword.password);
                _context.User.Update(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            return NotFound(new { message = "Token não é válido!" });
        }

        private string GenerateAccessToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtsettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.email.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateNewToken()
        {
            var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(8));
            var newToken = !_context.User.Any(user => user.verification_code == token);
            return token;
        }

        // send email to with token
        private static void SendEmailVerification(User user)
        {
            //string messagemContent;

            var smtpClient = new SmtpClient("smtp.ethereal.email")
            {
                Port = 587,
                Credentials = new NetworkCredential("nova.reynolds@ethereal.email", "tpZgf27bW4KN9JpsB2"),
                EnableSsl = true,
            };

            var attach = Attachment.CreateAttachmentFromString(JsonSerializer.Serialize(
                new
                {
                    Menssage = "Teste"
                }), "email.json", Encoding.UTF8, MediaTypeNames.Application.Json);
            var message = new MailMessage("password_recover@dontgetfired.com", user.email)
            {
                Subject = "Token For Password Recover",

                Body = $@"<h6>Verificação de Email<h6>
                        <p>{user.verification_code}</p>",
                IsBodyHtml = true
            };

            message.Attachments.Add(attach);
            smtpClient.Send(message);
        }
    }
}

