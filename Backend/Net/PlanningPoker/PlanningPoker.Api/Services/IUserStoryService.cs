using System.Collections.Generic;
using System.Threading.Tasks;
using PlanningPoker.Api.Model;

namespace PlanningPoker.Api.Services
{
    public interface IUserStoryService
    {

        Task<UserStory> AddUserStory(UserStory userStory);
        Task<List<UserStory>> GetUserStories(string gameId);
        Task<bool> UpdateStoryPoint(int userStoryId, string storyPoints);


    }
}