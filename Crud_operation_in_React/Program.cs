using CRUD.Data.Context;
using CRUD.Identity.dbContext;
using CRUD.Identity.Identity;
using CRUD.Service.Services;
using Crud_operation_in_React.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using sib_api_v3_sdk.Client;

var builder = WebApplication.CreateBuilder(args);

Configuration.Default.ApiKey.Add("api-key", builder.Configuration["BrevoApiKey:ApiKey"]);

//nswag open api
builder.Services.AddOpenApiDocument(); // Add NSwag services


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//configure connectionString here
var cs = builder.Configuration.GetConnectionString("conStr");
builder.Services.AddDbContext<ApplicationDbContext>(Options=>Options.UseSqlServer(cs));
builder.Services.AddDbContext<StudentDbContext>(Options => Options.UseSqlServer(cs));

//For identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>(
    Options =>
    {
        Options.Password.RequiredLength = 5;
        Options.User.RequireUniqueEmail = true;
    }
    ).AddEntityFrameworkStores<UserDbContext>().AddDefaultTokenProviders();

//Add config for required email
builder.Services.Configure<IdentityOptions>(
    Options => Options.SignIn.RequireConfirmedEmail = true
    );

//Add token time how many hours token will be valid
builder.Services.Configure<DataProtectionTokenProviderOptions>(
    Options => Options.TokenLifespan = TimeSpan.FromHours(10)
    );


//configure identity connectionstring here
var conStr = builder.Configuration.GetConnectionString("identityConString");
builder.Services.AddDbContext<UserDbContext>(Options => Options.UseSqlServer(conStr));

builder.Services.AddScoped<StudentManager>();

builder.Services.AddScoped<UserManager>();
builder.Services.AddScoped<EmailSender>();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAll",
        builder =>
        {
            builder.WithOrigins("AllowAll")
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
        }
        );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors("AllowAll");
// Enable the NSwag middleware
app.UseOpenApi(); // Generates the Swagger documentation
app.UseSwaggerUi(); // Generates the Swagger UI


app.UseRouting();
//Configuring Authentication Middleware to the Request Pipeline
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
