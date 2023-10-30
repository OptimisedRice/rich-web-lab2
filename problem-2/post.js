//task 1: List all of the post titles having more than six words
// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(res => res.json())//response type
//   .then(data => {
//       let posts = data.filter(post => {
//           let words = post.title.split(" ")
//           return words.length > 6
//       })
//       console.log(posts)
//       console.log(posts.length)
//   });

// task 2: Show a word frequency map for all of the body contents of the posts
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())//response type
    .then(data => {
        let wordFreq = []
        data.forEach(post => {
            let words = post.body.split(/\s+/);
            words.forEach(word => {
                let index = wordFreq.findIndex(element => {
                    return Object.keys(element)[0] === word
                })
                data = {}
                data[word] = 1
                index === -1 ? wordFreq.push(data) : wordFreq.at(index)[word] += 1
            })
        })
        const compareNums = (a, b) => {
            return Object.values(a)[0] > Object.values(b)[0] ? -1:1;
        }
        wordFreq.sort(compareNums);

        console.log(wordFreq)
    });


