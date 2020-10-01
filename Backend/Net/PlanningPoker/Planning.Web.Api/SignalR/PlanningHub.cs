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
        public async Task AddToGroup(string gameId)
        {

            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);

            await Clients.Group(gameId).SendAsync("Send", $"{Context.ConnectionId} has joined the group {gameId}.");
        }

        public async Task RemoveFromGroup(string gameId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);

            await Clients.Group(gameId).SendAsync("Send", $"{Context.ConnectionId} has left the group {gameId}.");
        }

        public void SendGroup(string methodName, string groupName, string message)
        {
            Clients.Group(groupName).SendAsync(methodName, message);
        }

        public async Task StartUserStoryPlay(UserStoryRequest request)
        {
            await Clients.Group(request.GameId).SendAsync("playUserStory", request);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine("Disconnected");
            return base.OnDisconnectedAsync(exception);
        }

    }
}