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
    public class GameFunction
    {
        private IGameService _gameService;
        public GameFunction(IGameService gameService)
        {
            _gameService = gameService;
        }

        [FunctionName("AddGame")]
        public async Task<IActionResult> AddGame(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "games/addgame")] Game game,
            HttpRequest req,
            ILogger log)
        {

            if (string.IsNullOrEmpty(game.Title))
            {
                return new BadRequestObjectResult(
                        error: "Title can't be empty"
                    );
            }

            Game response = await _gameService.AddGame(game);

            return new OkObjectResult(response);
        }

        [FunctionName("GetGame")]
        public async Task<IActionResult> GetGame(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "games/getGame/{gameId}")]
            HttpRequest req,
            string gameId,
            ILogger log)
        {

            GameResponseModel responseMessage = await _gameService.GetGame(gameId);

            return new OkObjectResult(responseMessage);
        }
    }
}

