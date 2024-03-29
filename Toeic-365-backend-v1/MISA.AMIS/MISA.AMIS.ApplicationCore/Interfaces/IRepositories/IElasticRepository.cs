﻿using Nest;
using System.Collections.Generic;
using System.Threading.Tasks;
using TOE.TOEIC.ApplicationCore.Entities;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    /// <summary>
    /// Core interface which communicates with Elastic Search endpoint.
    /// </summary>
    /// <remarks>
    /// Operations like create, update, upsert, delete, sorting as well as querying over documents
    /// can be accomplished.
    /// </remarks>
    /// <typeparam name="T">Any class which decorates with ElasticsearchType and Description attribute.</typeparam>
    public interface IElasticRepository<T> : IBaseELKRepository, IAdvanceQuery where T : class
    {
        Task<CreateIndexResponse> CreateIndexAsync();
        Task DeleteIndexAsync(); 
        Task<GetIndexResponse> GetIndexAsync();
        Task<GetIndexResponse> GetAllIndicesAsync();
        Task AddDocumentAsync(T value);
        Task DeleteDocumentAsync(T value);
        Task UpsertDocumentAsync(T value);
        Task UpdateDocumentAsync(T value);
        Task<T> GetDocumentAsync(string id);
        Task<(long Count, IEnumerable<T> Documents)>
            GetDocumentsAsync(GridQueryModel gridQueryModel); 
    }
}
