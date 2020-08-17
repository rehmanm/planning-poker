using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using PlanningPoker.Api.Model;

namespace PlanningPoker.Api.Services
{
    public class UserStoryService : IUserStoryService
    {

        private IMongoClient _client;
        private readonly IMongoCollection<UserStory> _userStoryCollection;
        public UserStoryService(IMongoClient client)
        {
            _client = client;
            var database = client.GetDatabase("planning");
            _userStoryCollection = database.GetCollection<UserStory>("userstory");
        }
        public async Task<UserStory> AddUserStory( UserStory userStory)
        {
            await _userStoryCollection.InsertOneAsync(userStory);
            return userStory;
        }

        public async Task<List<UserStory>> GetUserStories(string gameId)
        {
            List<UserStory> userStories = await _userStoryCollection.Find(x => true).ToListAsync();

            //_userStoryCollection.Fin

            if (!userStories.Any())
            {
                return null;
            }

            return userStories;
        }
    }
}