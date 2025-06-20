
// ---------------------------------------------
const form = document.getElementById("post-creation-form");
const postsList = document.getElementById("posts");
const host = "http://localhost:3000/";

const generateId = () => Math.random().toString(36).slice(2);

function savePostToLocalStorage(post) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function saveCommentToLocalStorage(postId, comment) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.comments = post.comments || [];
    post.comments.push(comment);
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}

function showPost(post) {
  const li = document.createElement("li");
  li.innerHTML = `
        <div>
          <img src="${post.img || ""}" alt="Post image">
          <p>${post.caption}</p>
          <ul class="comments-list">
            ${post.comments?.map(c => `<p><strong>Anonymous:</strong>${c.text}</p>`).join("") || ""}
          </ul>
          <form class="comment-form">
            <input name="comment" type="text" placeholder="Add a comment" required>
            <button type="submit">+</button>
          </form>
        </div>
      `;

  const commentForm = li.querySelector(".comment-form");
  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const commentText = commentForm.querySelector('input[name="comment"]').value;
    const comment = { id: generateId(), text: commentText };
    try {
      saveCommentToLocalStorage(post.id, comment);
      const commentList = li.querySelector(".comments-list");
      const p = document.createElement("p");
      p.textContent = comment.text;
      commentList.appendChild(p);
      commentForm.reset();

      const res = (await axios.post("/api/comments", { text: commentText, postId: post.id })).data;
    } catch (err) {
      console.error("Error:", err.message);
    }
  });
  return li;
}

async function loadPosts() {
  try {
    const posts = (await axios.get("/api")).data;
    localStorage.setItem("posts", JSON.stringify(posts));
    postsList.innerHTML = "";
    posts.forEach(post => postsList.appendChild(showPost(post)));
  } catch (err) {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.forEach(post => postsList.appendChild(showPost(post)));
    console.error("Error fetching posts:", err.message);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = form.querySelector('input[name="url"]').value;
  const caption = form.querySelector('input[name="caption"]').value;

  try {
    const res = (await axios.post(`${host}parse-url`, { url })).data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(res, "text/html");
    const img = doc.querySelector('meta[property="og:image"]')?.content;

    const post = { id: generateId(), img, caption, comments: [] };

    savePostToLocalStorage(post);
    postsList.prepend(showPost(post));
    form.reset();

    await axios.post("/api/posts", { img: img, caption });
  } catch (err) {
    console.error("Error:", err.message);
  }
});

loadPosts();
