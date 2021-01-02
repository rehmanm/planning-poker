using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlanningPoker.Api.Model;
using PlanningPoker.Api.Services;

namespace Planning.Web.Api.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class UserStoryController : ControllerBase
    {

        private readonly IUserStoryService _userStoryService;

        public UserStoryController(IUserStoryService userStoryService)
        {
            _userStoryService = userStoryService;
        }

        [HttpPost]
        [Route("api/v1/userStories")]
        public async Task<IActionResult> Post_AllGames(UserStory userStory)
        {
            var responseMessage = await _userStoryService.AddUserStory(userStory);

            return new CreatedResult("", responseMessage);
        }
    }
}
