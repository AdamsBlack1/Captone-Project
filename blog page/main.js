document.addEventListener("DOMContentLoaded", function () {
  const addBlogBtn = document.getElementById("addBlogBtn");
  const blogModal = document.getElementById("blogModal");
  const viewModal = document.getElementById("viewModal");
  const closeBtns = document.querySelectorAll(".close, .close-view");

  // Format date
  function formatDate(date) {
    const suffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    const day = date.getDate();
    return `${day}${suffix(day)} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`;
  }

  function updateBlogCount() {
    const count = document.querySelectorAll(".blogs-table tbody tr").length;
    document.getElementById("blogCount").textContent = `(${count})`;
  }

  // Load blogs from API
  function loadAdminBlogs() {
    fetch("https://my-style-mag-backend.onrender.com/api/v1/blog/admin", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          const tableBody = document.querySelector(".blogs-table tbody");
          tableBody.innerHTML = "";
          data.data.forEach(blog => addBlogToTable(blog));
          updateBlogCount();
        } else {
          alert("Failed to load blogs: " + data.message);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }

  // Add blog to table
  function addBlogToTable(blog) {
    const table = document.querySelector(".blogs-table tbody");
    const newRow = table.insertRow();

    newRow.innerHTML = `
      <td><input type="checkbox" /></td>
      <td class="title-cell"><span class="blog-title">${blog.title}</span></td>
      <td>${blog.category}</td>
      <td>${blog.status}</td>
      <td>${formatDate(new Date(blog.updatedAt))}</td>
      <td>${formatDate(new Date(blog.createdAt))}</td>
      <td>${blog.views || 0}</td>
      <td>
        <i class="ri-more-fill action-menu" style="cursor:pointer;" data-id="${blog._id}"></i>
      </td>
    `;

    // View modal
    newRow.querySelector(".title-cell").addEventListener("click", function () {
      document.getElementById("viewTitle").innerText = blog.title;
      document.getElementById("viewCategory").innerText = `Category: ${blog.category}`;
      document.getElementById("viewContent").innerText = blog.content;
      document.getElementById("viewStatus").innerText = `Status: ${blog.status}`;
      document.getElementById("viewModified").innerText = `Modified: ${formatDate(new Date(blog.updatedAt))}`;
      document.getElementById("viewViews").innerText = `Views: ${blog.views || 0}`;
      document.getElementById("viewImageContainer").style.display = "none";
      viewModal.classList.add("show");
    });
  }

  // Open modal
  addBlogBtn.onclick = () => blogModal.classList.add("show");

  // Close modals
  closeBtns.forEach((btn) => (btn.onclick = () => {
    blogModal.classList.remove("show");
    viewModal.classList.remove("show");
  }));

  window.onclick = function (event) {
    if (event.target === blogModal) blogModal.classList.remove("show");
    if (event.target === viewModal) viewModal.classList.remove("show");
  };

  // Create new blog
  document.getElementById("blogForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value;
    const status = document.getElementById("status").value;

    fetch("https://my-style-mag-backend.onrender.com/api/v1/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, category, content, status })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          addBlogToTable(data.data);
          updateBlogCount();
          this.reset();
          blogModal.classList.remove("show");
        } else {
          alert("Error creating blog: " + data.message);
        }
      })
      .catch(err => {
        console.error("Create error:", err);
        alert("An error occurred while creating blog.");
      });
  });

  // Action menu (edit / delete)
  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("action-menu")) {
      document.querySelectorAll(".dropdown-menu").forEach(menu => menu.remove());
    }

    if (e.target.classList.contains("action-menu")) {
      document.querySelectorAll(".dropdown-menu").forEach(menu => menu.remove());

      const dropdown = document.createElement("div");
      dropdown.className = "dropdown-menu";
      dropdown.innerHTML = `
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;

      const rect = e.target.getBoundingClientRect();
      dropdown.style.position = "fixed";
      dropdown.style.top = `${rect.bottom + 5}px`;
      dropdown.style.left = `${rect.left - 80}px`;
      document.body.appendChild(dropdown);

      // Delete blog
      dropdown.querySelector(".delete-btn").onclick = () => {
        const blogId = e.target.getAttribute("data-id");

        fetch(`https://my-style-mag-backend.onrender.com/api/v1/blog/${blogId}`, {
          method: "DELETE",
          credentials: "include"
        })
          .then(res => res.json())
          .then(data => {
            if (data.status) {
              e.target.closest("tr").remove();
              updateBlogCount();
              dropdown.remove();
            } else {
              alert("Delete failed: " + data.message);
            }
          })
          .catch(err => {
            console.error("Delete error:", err);
            alert("An error occurred while deleting.");
          });
      };

      // Edit (placeholder)
      dropdown.querySelector(".edit-btn").onclick = () => {
        alert("Edit functionality coming soon!");
        dropdown.remove();
      };
    }
  });

  // Initial blog load
  loadAdminBlogs();
});
