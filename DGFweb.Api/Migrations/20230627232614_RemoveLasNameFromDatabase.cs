using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DGFweb.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveLasNameFromDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lastName",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "mensagem",
                table: "Log",
                newName: "Mensagem");

            migrationBuilder.RenameColumn(
                name: "dataCreateAt",
                table: "Log",
                newName: "DataCreateAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Mensagem",
                table: "Log",
                newName: "mensagem");

            migrationBuilder.RenameColumn(
                name: "DataCreateAt",
                table: "Log",
                newName: "dataCreateAt");

            migrationBuilder.AddColumn<string>(
                name: "lastName",
                table: "User",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
