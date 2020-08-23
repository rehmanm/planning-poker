using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlanningPoker.Api.Model;
using PlanningPoker.Functions.Models.Requests;

namespace PlanningPoker.Functions
{
    public static class Singalr
    {

        [FunctionName("Negotiate")]
        public static async Task<SignalRConnectionInfo> Negotiate(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "signalr/negotiate")] HttpRequest req,
            [SignalRConnectionInfo(HubName = Constants.PlanningPokerHubName)] SignalRConnectionInfo connectionInfo,
            ILogger log)
        {
            return connectionInfo;
        }

        [FunctionName("AddUser")]
        public static async Task<IActionResult> AddUser(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "signalr/game/addUser")] AddUserRequest req,
            [SignalR(HubName = Constants.PlanningPokerHubName)] IAsyncCollector<SignalRGroupAction> signalRGroupActions,
            ILogger log)
        {

            await signalRGroupActions.AddAsync(
                    new SignalRGroupAction
                    {
                        GroupName = req.GameId,
                        UserId = req.UserId,
                        Action = GroupAction.Add
                    }
            );


            return new OkResult();
        }

        [FunctionName("RemoveUser")]
        public static async Task<IActionResult> RemoveUser(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "signalr/game/removeUser")] AddUserRequest req,
            [SignalR(HubName = Constants.PlanningPokerHubName)] IAsyncCollector<SignalRGroupAction> signalRGroupActions,
            ILogger log)
        {

            await signalRGroupActions.AddAsync(
                new SignalRGroupAction
                {
                    GroupName = req.GameId,
                    UserId = req.UserId,
                    Action = GroupAction.Remove
                }
            );


            return new OkResult();
        }

        [FunctionName("StartUserStoryPlay")]
        public static async Task StartUserStoryPlay(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "signalr/game/startUserStoryPlay")] UserStoryRequest req,
            [SignalR(HubName = Constants.PlanningPokerHubName)] IAsyncCollector<SignalRMessage> signalRMessages,
            ILogger log)
        {

            log.LogInformation($"Sending Message to group - {req.GameId} for userStory - {req.UserStoryId}");

            await signalRMessages.AddAsync(new SignalRMessage
            {
                Target = $"playUserStory-{req.GameId}",
                Arguments = new[] { req },
                //GroupName = req.GameId
                //UserId = "user"

            });

            log.LogInformation($"Sending Message to group completed - {req.GameId} for userStory - {req.UserStoryId}");

        }

    }
}
