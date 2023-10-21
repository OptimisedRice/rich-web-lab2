// task 1: List all of the post titles having more than six words
  fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())//response type
      .then(data => {
          let posts = data.filter(post => {
              let words = post.title.split(" ")
              return words.length > 6
          })
          console.log(posts)
          console.log(posts.length)
      });

// task 2:



