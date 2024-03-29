﻿using System.Collections.Generic;
using System.Threading.Tasks;
using TOE.TOEIC.ApplicationCore.Entities;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public interface IAdvanceQuery
    {
        Task<CommonStats> StatsAggregationAsync(string key, string fieldName);
        /// <summary>
        /// This method is just an example how to pull individual stats though all stats can be pull 
        /// using above StatsAggregationAsync method.
        /// </summary>
        Task<double> MedianAggregationAsync(string key, string fieldName);
        Task<List<GroupStats>> GroupByAsync(string fieldName);
    }
}
