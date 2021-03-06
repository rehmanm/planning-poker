﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PlanningPoker.Api.Model
{
    public class GameResponseModel
    {
        public string GameId { get; set; }

        public string Title { get; set; }

        public IEnumerable<UserStory> UserStories
        {
            get;
            set;
        }
    }
}
