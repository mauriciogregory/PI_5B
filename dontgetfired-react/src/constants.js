const signupFields=[
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Informe seu email"   
    },
    {
        labelText:"Nome completo",
        labelFor:"nome",
        id:"name",
        name:"name",
        type:"text",
        isRequired:true,
        placeholder:"Informe seu nome"   
    },
    {
        labelText:"Senha",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Informe sua senha"   
    },
    {
        labelText:"Confirme a senha",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirme sua senha"   
    }
]

export {signupFields}

