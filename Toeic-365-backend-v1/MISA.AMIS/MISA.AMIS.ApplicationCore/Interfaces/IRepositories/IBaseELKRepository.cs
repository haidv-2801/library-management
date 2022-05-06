using System.Threading.Tasks;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public interface IBaseELKRepository
    {
        int NumberOfShards { get; set; }
        int NumberOfReplicas { get; set; }
        Task<long> GetDocumentsCount();
        Task<bool> IsIndexExists();
        Task RefreshIndex();
        Task DeleteIndexAsync(string indexName); 
    }
}
