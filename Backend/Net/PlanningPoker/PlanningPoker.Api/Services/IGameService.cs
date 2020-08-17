using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using PlanningPoker.Api.Model;

namespace PlanningPoker.Api.Services
{
    public interface IGameService
    {
        Task<Game> AddGame(Game game);

        Task<GameResponseModel> GetGame(string id);
    }
}
