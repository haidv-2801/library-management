using TOE.TOEIC.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TOE.TOEIC.ApplicationCore.Interfaces
{
    public interface ILibraryCardRepository : IBaseRepository<LibraryCard>
    {
        Task<long> GetTotalLibraryCard();

        Task<LibraryCard> GetLibraryCardByAccountID(Guid accountID);

        Task<string> GetNextCardCode();
    }
}
