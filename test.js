const axios = require('axios');

async function testApi() {
  try {
    // Test GET request
    const response = await axios.get('http://localhost:3000/books');
    console.log('GET /books response:', response.data);

    // Test POST request
    const postResponse = await axios.post('http://localhost:3000/books', {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald'
    });
    console.log('POST /books response:', postResponse.data);

  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testApi();