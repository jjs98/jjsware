using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JJSWare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalenderController : ControllerBase
    {
        // GET: api/<CalenderController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value10", "value2" };
        }

        // GET api/<CalenderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CalenderController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CalenderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CalenderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
