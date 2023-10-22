// takes user input from new post modal, makes a POST request to /api/posts creating a new post 
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const returnData = await response.json();
    console.log(returnData);
    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-post-form")
  ?.addEventListener("submit", newPostHandler);

// DELETE a post that matches data-id of post interacted with
const delPostHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector("#delete-btn")
  ?.addEventListener("click", delPostHandler);

// edit an existing post, make a PUT request and update existing post with new inputed data
const editPostHandler = async () => {
  const title = document.querySelector("#edit-post-title").value.trim();
  const content = document.querySelector("#edit-post-content").value.trim();
  const id = document.querySelector("#post_id").value;
  console.log(id);
  if (id) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        postId: id,
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const returnData = await response.json();
    console.log(returnData);

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector('.edit-post-form')
  ?.addEventListener("submit", editPostHandler);

// creates a new comment with user input in comment modal, makes POST request to /api/comments/ 
const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("test");
  const comment = document.querySelector("#comment").value;
  const id = document.querySelector("#post_id").value;

  console.log(comment);
  console.log(id);

  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id: id,
        comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-comment-form")
  ?.addEventListener("submit", newCommentHandler);

