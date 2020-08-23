using System;
using System.Collections.Generic;
using System.Text;

namespace PlanningPoker.Functions.Models.Requests
{
    public class AddUserRequest
    {
        public string GameId { get; set; }

        public string UserId { get; set; }
    }
}
