using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DGFweb.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreatedUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "User",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "mensagem",
                table: "Log",
                newName: "Mensagem");

            migrationBuilder.RenameColumn(
                name: "dataCreateAt",
                table: "Log",
                newName: "DataCreateAt");

            migrationBuilder.AddColumn<string>(
                name: "verification_code",
                table: "User",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "verification_code",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "User",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Mensagem",
                table: "Log",
                newName: "mensagem");

            migrationBuilder.RenameColumn(
                name: "DataCreateAt",
                table: "Log",
                newName: "dataCreateAt");
        }
    }
}
