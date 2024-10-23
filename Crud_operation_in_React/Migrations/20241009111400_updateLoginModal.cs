using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crud_operation_in_React.Migrations
{
    public partial class updateLoginModal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_loginEmployeeDetail",
                table: "loginEmployeeDetail");

            migrationBuilder.RenameTable(
                name: "loginEmployeeDetail",
                newName: "LoginEmployeeDetail");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LoginEmployeeDetail",
                table: "LoginEmployeeDetail",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LoginEmployeeDetail",
                table: "LoginEmployeeDetail");

            migrationBuilder.RenameTable(
                name: "LoginEmployeeDetail",
                newName: "loginEmployeeDetail");

            migrationBuilder.AddPrimaryKey(
                name: "PK_loginEmployeeDetail",
                table: "loginEmployeeDetail",
                column: "Id");
        }
    }
}
