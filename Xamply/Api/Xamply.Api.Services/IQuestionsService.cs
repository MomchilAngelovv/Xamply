using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamply.Data.Models;

namespace Xamply.Api.Services
{
    public interface IQuestionsService
    {
        Task<IEnumerable<Question>> GetQuestionListByValues(List<string> values);
    }
}
