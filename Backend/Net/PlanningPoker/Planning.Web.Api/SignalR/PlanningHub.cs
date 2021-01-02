using System;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using PlanningPoker.Api.Model.Requests;

namespace Planning.Web.Api.SignalR
{
    public class PlanningHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public async Task<string> Negotiate()
        {
            return "test";
        }

        public async Task AddToGroup(string gameId, string userName, bool isUser)
        {

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);

            await Clients.Group(gameId)
                .SendAsync("Send", $"{Context.ConnectionId} - {userName} has joined the group {gameId}.");

            if (isUser)
                await Clients.Group(gameId).SendAsync("userAdded", userName);
        }

        public async Task RemoveFromGroup(string gameId, string userName, bool isUser)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);

            await Clients.Group(gameId).SendAsync("Send", $"{Context.ConnectionId} has left the group {gameId}.");

            if (isUser)
                await Clients.Group(gameId).SendAsync("userLeft", userName);
        }

        public void SendGroup(string methodName, string groupName, string message)
        {
            Clients.Group(groupName).SendAsync(methodName, message);
        }

        public async Task StartUserStoryPlay(UserStoryRequest request)
        {
            await Clients.Group(request.GameId).SendAsync("playUserStory", request);
        }

        public async Task SendStoryPoint(string gameId,string userName, string storyPoint)
        {
            await Clients.Group(gameId).SendAsync("updateStoryPoint", userName, storyPoint);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine("Disconnected");
            return base.OnDisconnectedAsync(exception);
        }

    }
}