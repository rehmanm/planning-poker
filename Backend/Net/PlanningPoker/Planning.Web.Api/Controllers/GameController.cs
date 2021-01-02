using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PlanningPoker.Api.Model;
using PlanningPoker.Api.Services;
using System.Threading.Tasks;

namespace Planning.Web.Api.Controllers
{
    //[Route("api/v1/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {

        private IGameService _gameService;
        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        [Route("api/v1/games/{gameId}")]
        public async Task<IActionResult> Get(string gameId)
        {
            GameResponseModel responseMessage = await _gameService.GetGame(gameId);

            return new OkObjectResult(responseMessage);
        }

        [HttpGet]
        [Route("api/v1/games")]
        public async Task<IActionResult> Get_AllGames()
        {
            List<GameResponseModel> responseMessage = await _gameService.GetAllGame();

            return new OkObjectResult(responseMessage);
        }

        [HttpPost]
        [Route("api/v1/games")]
        public async Task<IActionResult> Post_AllGames(Game game)
        {
            var responseMessage = await _gameService.AddGame(game);

            return new CreatedResult("", responseMessage);
        }
    }
}
