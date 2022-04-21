using ClosedXML.Excel;
using TOE.TOEIC.ApplicationCoore.Entities;
using TOE.TOEIC.ApplicationCore.Entities;
using TOE.TOEIC.ApplicationCore.Interfaces;
using TOE.TOEIC.Entities;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Nest;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{

    public class ElasticsearchService
    {
        #region Declare
        IConfiguration _config;
        ElasticClient _elasticClient;
        #endregion

        #region Constructer
        public ElasticsearchService(IConfiguration config, ElasticClient elasticClient)
        {
            _config = config;
            _elasticClient = elasticClient;
        }
        #endregion

        #region Methods
        //public async Task SaveSingleAsync(Post post)
        //{
        //    if (_cache.Any(p => p.PostID == post.PostID))
        //    {
        //        await _elasticClient.UpdateAsync<Post>(post, u => u.Doc(post));
        //    }
        //    else
        //    {
        //        _cache.Add(post);
        //        await _elasticClient.IndexDocumentAsync(post);
        //    }
        //}

        //public async Task SaveManyAsync(Post[] posts)
        //{
        //    _cache.AddRange(posts);
        //    var result = await _elasticClient.IndexManyAsync(posts);
        //    if (result.Errors)
        //    {
        //        // the response can be inspected for errors
        //        foreach (var itemWithError in result.ItemsWithErrors)
        //        {
        //            //_logger.LogError("Failed to index document {0}: {1}",
        //            //    itemWithError.PostID, itemWithError.Error);
        //        }
        //    }
        //}

        //public async Task SaveBulkAsync(Post[] posts)
        //{
        //    _cache.AddRange(posts);
        //    var result = await _elasticClient.BulkAsync(b => b.Index("posts").IndexMany(posts));
        //    if (result.Errors)
        //    {
        //        // the response can be inspected for errors
        //        foreach (var itemWithError in result.ItemsWithErrors)
        //        {
        //            //_logger.LogError("Failed to index document {0}: {1}",
        //            //    itemWithError.PostID, itemWithError.Error);
        //        }
        //    }
        //}

        //public async Task DeleteAsync(Post post)
        //{
        //    await _elasticClient.DeleteAsync<Post>
        //(post);

        //    if (_cache.Contains(post))
        //    {
        //        _cache.Remove(post);
        //    }
        //}
        #endregion
    }
}
