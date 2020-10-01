using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace PlanningPoker.Api.Model.Requests
{
    public class UserStoryRequest
    {
        public object Id { get; set; }
        [JsonProperty("userStoryId")]
        public int UserStoryId { get; set; }
        [JsonProperty("gameId")]
        public string GameId { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("storyPoints")]
        public string StoryPoints { get; set; }

    }
}
