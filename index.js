const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  try {
    // Get inputs using the GitHub Core library
    const data = core.getInput('data');
    const url = core.getInput('url');
    const headers = core.getInput('customHeaders');
    const method = core.getInput('method');

    // Parse the headers input as JSON
    const parsedHeaders = JSON.parse(headers);

    // Create the request body
    const requestBody = {
      data: data
    };

    axios({
      method: method.toUpperCase(),
      url: url,
      data: requestBody,
      headers: parsedHeaders
    }).then(apiResponse=>{
       const response = apiResponse.data
       response.json(response)
    })

    // Set up the axios request configuration
    // const axiosConfig = {
    //   method: method.toUpperCase(),
    //   url: url,
    //   headers: parsedHeaders,
    //   data: requestBody
    // };

    // // Send the HTTP request
    // const response = await axios(axiosConfig);

    // Log the response
    console.log('Response:', response.data);
    core.setOutput('response', response.data);
    core.setOutput('headers', response.headers);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error('Error:', error.message);
    process.exit(1);
  }
}

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  // calling the function
  run();
} catch (error) {
  core.setFailed(error.message);
}
