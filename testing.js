const BASE_URL = 'http://localhost:3000';

async function post(endpoint, body) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return { error: 'Fetch failed' };
  }
}


async function get(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        return await response.json();
    } catch(error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        return { error: 'Fetch failed' };
    }
}


async function runTests() {
  console.log('--- Running API Verification Tests ---');

  // Test /time
  console.log('\n[TEST] /time');
  const timeRes = await get('/time');
  console.log('  Response:', timeRes);
  if (typeof timeRes.result === 'number' && timeRes.result > 0) {
      console.log('   PASSED');
  } else {
      console.log('   FAILED');
  }

  // Test /fizzbuzz
  console.log('\n[TEST] /fizzbuzz');
  const fizzbuzzBody = ["hello", 123];
  const fizzbuzzRes = await post('/fizzbuzz', fizzbuzzBody);
  console.log('  Sent:', fizzbuzzBody);
  console.log('  Response:', fizzbuzzRes);
  if (fizzbuzzRes.result && fizzbuzzRes.result[0] === "hello" && fizzbuzzRes.result[1] === 123) {
      console.log('   PASSED');
  } else {
      console.log('   FAILED');
  }

   // Test /data 
  console.log('\n[TEST] /data');
  const dataBody = { input: "Hello Base64" };
  const dataRes = await post('/data', dataBody);
  console.log('  Sent:', dataBody);
  console.log('  Response:', dataRes);
  // "SGVsbG8gQmFzZTY0" is the base64 of "Hello Base64"
  if (dataRes.result === "SGVsbG8gQmFzZTY0") {
       console.log('   PASSED');
  } else {
      console.log('   FAILED');
  }
  
  // Test /zap
  console.log('\n[TEST] /zap');
  const zapBody = { input: "test123ing456" };
  const zapRes = await post('/zap', zapBody);
  console.log('  Sent:', zapBody);
  console.log('  Response:', zapRes);
  if (zapRes.result === "testing") {
       console.log('   PASSED');
  } else {
      console.log('   FAILED');
  }

  // Test /alpha
  console.log('\n[TEST] /alpha');
  const alphaBody1 = { input: "OnlyLetters" };
  const alphaRes1 = await post('/alpha', alphaBody1);
  console.log('  Sent:', alphaBody1, '-> Response:', alphaRes1);

  const alphaBody2 = { input: "NotOnly123" };
  const alphaRes2 = await post('/alpha', alphaBody2);
  console.log('  Sent:', alphaBody2, '-> Response:', alphaRes2);
  if (alphaRes1.result === true && alphaRes2.result === false) {
       console.log('   PASSED');
  } else {
      console.log('   FAILED');
  }

  // Test /glitch
  console.log('\n[TEST] /glitch');
  const glitchOddBody = { input: "abcde" }; // odd length -> reverse
  const glitchOddRes = await post('/glitch', glitchOddBody);
  console.log('  Sent (odd):', glitchOddBody, '-> Response:', glitchOddRes);

  const glitchEvenBody = { input: "abcdef" }; // even length -> randomize
  const glitchEvenRes = await post('/glitch', glitchEvenBody);
  console.log('  Sent (even):', glitchEvenBody, '-> Response:', glitchEvenRes);
  
  if (glitchOddRes.result === "edcba" && glitchEvenRes.result.length === 6) {
       console.log('   PASSED');
  } else {
      console.log('   FAILED');
  }

  console.log('\n--- Tests Complete ---');
}

runTests();
