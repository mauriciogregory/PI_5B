using System.ComponentModel.DataAnnotations;

    namespace DGFweb.Api.ViewModels
    {
        public class EsqueciSenhaViewModel
        {
            [Display(Name = "E-mail")]
            [Required(ErrorMessage = "O campo {0} é de preencimento obrigatório.")]
            [DataType(DataType.EmailAddress)]
            public string Email {get;set;}
        }
    }