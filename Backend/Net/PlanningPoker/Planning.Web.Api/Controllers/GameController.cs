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
        [Route("api/v1/games/getGame/{gameId}")]
        public async Task<IActionResult> Get(string gameId)
        {
            GameResponseModel responseMessage = await _gameService.GetGame(gameId);

            return new OkObjectResult(responseMessage);
        }
    }
}
