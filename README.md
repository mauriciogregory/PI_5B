Instale os seguintes pacotes usando o nuget ou o comando:
```sh
dotnet add package nomeDoPacote
```

>MySql.EntityFrameworkCore ou MySql.Data.EntityFrameworkCore package

>Pomelo.EntityFrameworkCore.MySql

>System.Windows.Extensions

>Microsoft.EntityFrameworkCore --version 7.0.3

>Microsoft.AspNetCore.Mvc.NewtonsoftJson --version 7.0.3

>AutoMapper.Extensions.Microsoft.DependencyInjection -Version 12.0.0

Criar o Banco de Dado no Mysql e mudar as Strings de conexão do arquivo do projeto de C#:
>appsettings.Development.json
```json
"ConnectionStrings": {
    "ConnectionMySql": "Server=localhost;port=3306;initial catalog=dontgetfired;uid=root;pwd=sua senha"
  },
```

Executar as migrations:
```sh
dotnet ef add migrations NomeDaNovaMigration
```
Criar as tabelas no Banco de Dados:
```sh
dotnet ef database update
```
# ethereal.email logar com o user e pass do appsettings.json