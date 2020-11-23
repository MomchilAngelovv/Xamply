namespace Xamply.Api.Common
{
    public class BaseResponseModel
    {
        public string Message { get; set; }
        public string Status { get; set; }
        public object Data { get; set; }
    }
}
