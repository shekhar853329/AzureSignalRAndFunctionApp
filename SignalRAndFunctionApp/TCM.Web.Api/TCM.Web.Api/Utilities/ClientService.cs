using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace TCM.Web.Api.Utilities
{
    public class ClientService
    {
        public async Task<HttpResponseMessage> SendGetAsync(string functionName)
        {
            HttpResponseMessage response = new();
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("http://localhost:5002/");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    //GET Method
                    response = await client.GetAsync($"api/{functionName}");
                    response.EnsureSuccessStatusCode();
                    return response;
                }

            }
            catch (Exception ex)
            {
                return response;
            }
        }
        public async Task<HttpResponseMessage> SendPostAsync(string functionName, object body)
        {
            HttpResponseMessage response = new();
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    //httpClient.BaseAddress = new Uri("http://localhost:5002/");
                    httpClient.BaseAddress = new Uri("https://tcmazurefunction.azurewebsites.net/");
                    httpClient.DefaultRequestHeaders.Accept.Clear();
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    string requestBody = JsonConvert.SerializeObject(body);

                    StringContent content = new StringContent(requestBody, System.Text.Encoding.UTF8, "application/json");

                    response = await httpClient.PostAsync($"events/{functionName}?code=fPret4BHswERgDIIn_a8sPyS3JuSS7QJKxLBKGCyxdduAzFunCFFQQ==", content);

                    response.EnsureSuccessStatusCode();
                    return response;
                }

            }
            catch (Exception ex)
            {
                return response;
            }
        }
    }
}
