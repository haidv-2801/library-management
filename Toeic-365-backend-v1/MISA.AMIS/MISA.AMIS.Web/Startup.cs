using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TOE.TOEIC.ApplicationCore;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.ApplicationCore.MiddleWare;
using TOE.TOEIC.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TOE.TOEIC.ApplicationCore.Helpers;
using Nest;

namespace TOE.TOEIC.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowCROSPolicy",
                    builder =>
                    {
                        builder.WithOrigins("*")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                    });
            });

            // Config authenication
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
              .AddJwtBearer(options =>
              {
                  options.RequireHttpsMetadata = false;
                  options.SaveToken = true;
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuer = true,
                      ValidateAudience = true,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      ValidIssuer = Configuration["Jwt:Issuer"],
                      ValidAudience = Configuration["Jwt:Issuer"],
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                  };
              });
            services.AddMvc(x => x.EnableEndpointRouting = false);

            //
            services.AddScoped<ClientIpCheckActionFilter>(container =>
            {
                var loggerFactory = container.GetRequiredService<ILoggerFactory>();
                var logger = loggerFactory.CreateLogger<ClientIpCheckActionFilter>();

                return new ClientIpCheckActionFilter(
                    Configuration["AdminSafeList"], logger);
            });

            //Add Elasticsearch
            //services.AddElasticsearch(Configuration);
            var url = Configuration["elasticsearch:url"];
            var settings = new ConnectionSettings(new Uri(url)).DefaultIndex("posts");
            var client = new ElasticClient(settings);
            services.AddSingleton(client);

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen();

            //base
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));

            //account
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAccountService, AccountService>();

            //post
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IPostService, PostService>();

            //menu
            services.AddScoped<IMenuRepository, MenuRepository>();
            services.AddScoped<IMenuService, MenuService>();

            //book
            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<IBookService, BookService>();

            //elastic search
            services.AddScoped(typeof(IElasticRepository<>), typeof(ElasticRepository<>));
            services.AddScoped(typeof(IElasticService<>), typeof(ElasticService<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseMiddleware<ErrorHandlingMiddleWare>();

            app.UseRouting();
            app.UseStaticFiles();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMvc();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseMiddleware<AdminSafeListMiddleware>(Configuration["AdminSafeList"]);
        }
    }
}
