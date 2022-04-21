using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nest;
using System;
using System.Collections.Generic;
using System.Text;
using TOE.TOEIC.ApplicationCoore.Entities;

namespace TOE.TOEIC.ApplicationCore.Helpers
{
    public static class ElasticsearchExtensions
    {
        public static void AddElasticsearch(this IServiceCollection services, IConfiguration configuration)
        {
            var url = configuration["elasticsearch:url"];
            var settings = new ConnectionSettings(new Uri(url));
            var client = new ElasticClient(settings);
            services.AddSingleton(client);
        }
    }
}
