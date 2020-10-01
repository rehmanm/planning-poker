using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Planning.Web.Api.SignalR;
using PlanningPoker.Api.Services;

namespace Planning.Web.Api
{
    public class Startup
    {
        public IWebHostEnvironment HostingEnvironment { get; private set; }
        public IConfiguration Configuration { get; private set; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            HostingEnvironment = env;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200",
                                "http://www.contoso.com")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                        //.AllowAnyOrigin();
                    });
            });


            services.AddControllers();
            services.AddSignalR().AddAzureSignalR(); ;



            services.AddSingleton<IGameService, GameService>();
            services.AddSingleton<IUserStoryService, UserStoryService>();
            services.AddSingleton<IMongoClient>(new MongoClient(Configuration["MONGO_CONNECTION_STRING"]));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseAzureSignalR(routes => { routes.MapHub<PlanningHub>("/planning"); });

            app.UseCors(MyAllowSpecificOrigins)
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();

                    //endpoints.MapHub<PlanningHub>("/planning");

                });
        }

        private void ConfigureSignalRService(IServiceCollection services)
        {
            var signalRBuilder = services.AddSignalR()
                .AddJsonProtocol();

            var azureServiceConnectionString = Configuration.GetConnectionString("SignalRDatabaseConnectionString");
            if (!string.IsNullOrEmpty(azureServiceConnectionString))
            {
                signalRBuilder.AddAzureSignalR(azureServiceConnectionString);
            }
        }
    }
}
