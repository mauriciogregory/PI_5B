using System.ComponentModel.DataAnnotations;

namespace DGFweb.Api.ViewModels
{
    public class RedefinirSenhaViewModel
    {
        [Display(Name = "E=mail")]
        [Required(ErrorMessage = "O campo {0} é de preenchimento obrigatório.")]
        [DataType(DataType.EmailAddress)]
        public required string Email {get;set;}

        [Display(Name = "Nova Senha")]
        [DataType(DataType.Password)]
        [MaxLength(16, ErrorMessage = "O tamanho máximo do campo {0} é de {1} caracteres.")]
        [MinLength(6, ErrorMessage = "O tamanho mínimo do campo {0} é de {1} caracteres.")]
        [Required(ErrorMessage = "O campo {0} é de preenchimento obrigatório.")]
        public string NovaSenha {get;set;}

        [Display(Name = "Confirmação da Nova Senha")]
        [DataType(DataType.Password)]
        [MaxLength(16, ErrorMessage = "O tamanho máximo do campo {0} é de {1} caracteres.")]
        [MinLength(6, ErrorMessage = "O tamanho mínimo do campo {0} é de {1} caracteres.")]
        [Required(ErrorMessage = "O campo {0} é de preenchimento obrigatório.")]
        [Compare(nameof(NovaSenha), ErrorMessage = "A confirmação da nova senha não confere com a nova senha.")]
        public required string ConfNovaSenha {get;set;}
    }
}