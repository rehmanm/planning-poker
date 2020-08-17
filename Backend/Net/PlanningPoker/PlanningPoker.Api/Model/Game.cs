using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PlanningPoker.Api.Model
{
    public class Game
    {

        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId Id { get; set; }
        public string GameId { get; set; }
        public string Title { get; set; }

    }
}
