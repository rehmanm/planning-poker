using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using PlanningPoker.Api.Model;

namespace PlanningPoker.Api.Services
{
    public class GameService : IGameService
    {
        private IMongoClient _client;
        private readonly IMongoCollection<Game> _gameCollection;

        private IUserStoryService _userStoryService;
        public GameService(IMongoClient client, IUserStoryService userStoryService)
        {
            _client = client;
            var database = client.GetDatabase("planning");
            _gameCollection = database.GetCollection<Game>("game");
            _userStoryService = userStoryService;
        }

        public async Task<Game> AddGame(Game game)
        {
            await _gameCollection.InsertOneAsync(game);
            return game;
        }

        public async Task<GameResponseModel> GetGame(string id)
        {

            List<Game> games = await _gameCollection.Find<Game>(x => x.GameId == id).ToListAsync();



            if (!games.Any())
            {
                return null;
            }


            List<UserStory> userStories = await _userStoryService.GetUserStories(id);

            Game game = games.First();

            GameResponseModel g = new GameResponseModel()
            {
                Id = game.GameId,
                Title = game.Title,
                UserStories = userStories 
            };

            return await Task.Run(() => g);

        }

        public async Task<List<GameResponseModel>> GetAllGame()
        {
            var games = await _gameCollection.Find(FilterDefinition<Game>.Empty).ToListAsync();

            List<GameResponseModel> list = new List<GameResponseModel>();

            foreach (Game g in games)
            {
                list.Add(
                    new GameResponseModel
                    {
                        Id = g.GameId,
                        Title = g.Title

                    }
                );
            }


            return await Task.Run(() => list);

        }
    }
}
