import axios from 'axios';

async function main() {

  const inputUrl = 'https://test-share.shub.edu.vn/api/intern-test/input';
  const inputResponse = await axios.get(inputUrl);
  const { token, data, query } = inputResponse.data;


  const n = data.length;
  const prefixSum = new Array(n + 1).fill(0);
  const evenSum = new Array(n + 1).fill(0);
  const oddSum = new Array(n + 1).fill(0);



  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + data[i];
    evenSum[i + 1] = evenSum[i] + (i % 2 === 0 ? data[i] : 0);
    oddSum[i + 1] = oddSum[i] + (i % 2 !== 0 ? data[i] : 0);
  }


  const results: number[] = [];
  for (const { type, range } of query) {
    const [l, r] = range;
    if (type === '1') {
    
      const totalSum = prefixSum[r + 1] - prefixSum[l];
      results.push(totalSum);
    } else if (type === '2') {
    
      const evenTotal = evenSum[r + 1] - evenSum[l];
      const oddTotal = oddSum[r + 1] - oddSum[l];
      const alternatingSum = evenTotal - oddTotal;
      results.push(alternatingSum);
    }
  }

// console.log("Kết quả: ", results);

const requestData = { results: results };
// console.log("Dữ liệu gửi lên server: ", requestData);


const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
};

// Gửi kết quả lên API.
const outputUrl = 'https://test-share.shub.edu.vn/api/intern-test/output';
try {
  const response = await axios.post(outputUrl, results, config);
  console.log("Phản hồi từ server: ", response.data, response.status);
} catch (error) {
  console.error("Lỗi khi gửi yêu cầu: ", error.response?.data ?? error.message);
}

}

main().catch(console.error);