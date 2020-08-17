using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlanningPoker.Api.Model;
using PlanningPoker.Api.Services;

namespace PlanningPoker.Functions
{
    public class UserStoryFunction
    {
        private IUserStoryService _userStoryService;
        public UserStoryFunction(IUserStoryService userStoryService)
        {
            _userStoryService = userStoryService;
        }

        [FunctionName("AddUserStory")]
        public async Task<IActionResult> AddUserStory(
            [HttpTrigger(AuthorizationLevel.Function,  "post", Route = "userStory/addUserStory")] UserStory userStory,
            HttpRequest req,
            ILogger log)
        {
            if (string.IsNullOrEmpty(userStory.GameId))
            {
                return new BadRequestObjectResult(
                    error: "Game Id can't be empty"
                );
            }

            if (userStory.UserStoryId < 0)
            {
                return new BadRequestObjectResult(
                    error: "UserStoryId can't be empty"
                );
            }
            if (string.IsNullOrEmpty(userStory.Title))
            {
                return new BadRequestObjectResult(
                    error: "Title can't be empty"
                );
            }

            UserStory response = await _userStoryService.AddUserStory(userStory);

            return new OkObjectResult(response);
        }
    }
}
