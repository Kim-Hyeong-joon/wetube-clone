const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".video__comment > span");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.addEventListener("click", handleCommentDelete);
  const div = document.createElement("div");
  div.appendChild(icon);
  div.appendChild(span);
  newComment.appendChild(div);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleCommentDelete = async (event) => {
  const li = event.target.parentElement;
  const commentId = li.dataset.id;
  console.log(li);
  li.remove();
  await fetch(`/api/videos/comments/${commentId}`, {
    method: "DELETE",
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteBtn.forEach((btn) => btn.addEventListener("click", handleCommentDelete));
