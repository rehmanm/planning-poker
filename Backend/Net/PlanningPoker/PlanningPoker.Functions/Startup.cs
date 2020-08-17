using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using PlanningPoker.Api.Services;

[assembly: FunctionsStartup(typeof(PlanningPoker.Functions.Startup))]
namespace PlanningPoker.Functions
{
    class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {

            builder.Services.AddSingleton<IGameService, GameService>();
            builder.Services.AddSingleton<IUserStoryService, UserStoryService>();



            builder.Services.AddSingleton<IMongoClient>(new MongoClient("mongodb://localhost:27017"));

        }
    }
}
