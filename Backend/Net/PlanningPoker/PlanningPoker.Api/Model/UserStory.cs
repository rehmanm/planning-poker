using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace PlanningPoker.Api.Model
{
    public class UserStory
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }
        public int UserStoryId { get; set; }
        public string GameId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string StoryPoints { get; set; }

    }
}
