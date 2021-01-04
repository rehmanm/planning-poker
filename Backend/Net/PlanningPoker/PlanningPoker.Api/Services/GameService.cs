using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
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
            var response = await _gameCollection.Aggregate().Match(x => x.GameId == id).Lookup(
                "userstory", "GameId", "GameId", "UserStories"
                ).Project(
                     new BsonDocument
                        {
                            { "_id", 0 },
                            { "GameId", 1 },
                            { "Title", 1 },
                            { "UserStories",
                    new BsonDocument
                            {
                                { "UserStoryId", 1 },
                                { "Title", 1 },
                                { "Description", 1 },
                                { "StoryPoints", 1 },
                                { "GameId", 1 },

                            } }
                        }).ToListAsync();



            if (!response.Any())
            {
                return null;
            }

            var res = response.Select(x => BsonSerializer.Deserialize<GameResponseModel>(x)).First();

            return res;

        }

        public async Task<List<GameResponseModel>> GetAllGame()
        {
            var response = await _gameCollection.Aggregate().Lookup(
                "userstory", "GameId", "GameId", "UserStories"
                ).Project(
                     new BsonDocument
                        {
                            { "_id", 0 },
                            { "GameId", 1 },
                            { "Title", 1 },
                            { "UserStories",
                    new BsonDocument
                            {
                                { "UserStoryId", 1 },
                                { "Title", 1 },
                                { "Description", 1 },
                                { "StoryPoints", 1 },
                                { "GameId", 1 },
                            } }
                        }).ToListAsync();


            if (!response.Any())
            {
                return null;
            }

            var res = response.Select(x => BsonSerializer.Deserialize<GameResponseModel>(x)).ToList();

            return res;

        }
    }
}
