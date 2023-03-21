using Microsoft.AspNetCore.Builder;

namespace JJSWare
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                policy => policy
                .WithOrigins("http://localhost:5000", "http://localhost:4200"));
            });

            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
            }
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}