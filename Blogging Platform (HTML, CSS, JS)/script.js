// Sidebar toggle functionality for responsive sidebar
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('aside');
const backdrop = document.getElementById('sidebar-backdrop');

function openSidebar() {
  sidebar.classList.add('open');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

if (sidebarToggle && sidebar && backdrop) {
  sidebarToggle.addEventListener('click', openSidebar);
  backdrop.addEventListener('click', closeSidebar);
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeSidebar();
  });
}

// Blog posts data
const posts = [
  {
    title: "Exploring the Future of Technology",
    author: "Jane Doe",
    date: "2025-05-30",
    summary: "Technology is evolving rapidly, shaping the future in unprecedented ways. From AI advancements to renewable energy innovations, this blog explores key trends that will define the next decade. We discuss the impact of automation, the rise of smart devices, and how technology is influencing every aspect of our lives, from healthcare to education and beyond. Stay ahead by understanding the forces driving tomorrow's world.",
    category: "Technology"
  },
  {
    title: "Mindful Travel Tips",
    author: "John Smith",
    date: "2025-05-20",
    summary: "Discover how to travel more sustainably and meaningfully. This post covers practical tips for reducing your carbon footprint, supporting local communities, and making conscious choices while exploring new destinations. Learn how to plan eco-friendly trips, pack responsibly, and immerse yourself in cultures with respect and curiosity. Mindful travel is about creating positive impacts for both travelers and the places they visit.",
    category: "Travel"
  },
  {
    title: "Balancing Work and Life",
    author: "Emily Clark",
    date: "2025-05-10",
    summary: "Lifestyle hacks for better work-life harmony. In today's fast-paced world, finding balance is essential for well-being. This article shares strategies for setting boundaries, managing time effectively, and prioritizing self-care. Explore routines and habits that help you stay productive at work while enjoying quality time with family and friends. Achieve your goals without sacrificing your happiness or health.",
    category: "Lifestyle"
  },
  {
    title: "The Power of Online Education",
    author: "Alex Lee",
    date: "2025-05-05",
    summary: "How online learning is transforming education for everyone. We examine the benefits of digital classrooms, flexible schedules, and access to global resources. This post highlights the challenges and opportunities of remote learning, the importance of self-motivation, and the future of education technology. Whether you're a student, teacher, or lifelong learner, discover how to make the most of online education in the modern era.",
    category: "Education"
  }
];

const blogContainer = document.getElementById('blogContainer');
const searchInput = document.getElementById('searchInput');
const categoryLinks = document.querySelectorAll('[data-category]');
const form = document.getElementById('subscribeForm');

// Display posts
function displayPosts(filteredPosts) {
  blogContainer.innerHTML = filteredPosts.length
    ? filteredPosts.map(post => `
      <article class="blog-card">
        <h2 class="blog-title">${post.title}</h2>
        <p class="blog-meta">By <strong>${post.author}</strong> | Published on ${new Date(post.date).toDateString()}</p>
        <fieldset class="summary-fieldset">
          <legend>SUMMARY</legend>
          <p class="blog-summary">${post.summary}</p>
        </fieldset>
      </article>
    `).join('')
    : '<p>No blog posts found.</p>';
}

// Search functionality
function searchPosts(e) {
  const query = e.target.value.toLowerCase();
  const result = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.author.toLowerCase().includes(query)
  );
  console.log("Search:", query);
  displayPosts(result);
}

// Debounce utility function
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Category filtering
function filterByCategory(e) {
  e.preventDefault();
  const cat = e.target.dataset.category;
  let result;
  if (cat === 'All') {
    result = posts;
  } else {
    result = posts.filter(post => post.category === cat);
  }
  console.log("Category:", cat);
  displayPosts(result);
}

// Form validation
function validateForm(e) {
  e.preventDefault();
  // Hide all error messages by default
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subscribeSuccess = document.getElementById('subscribeSuccess');
  nameError.textContent = '';
  emailError.textContent = '';
  nameError.classList.remove('active');
  emailError.classList.remove('active');
  subscribeSuccess.textContent = '';
  subscribeSuccess.classList.remove('active');

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  let valid = true;

  if (!name) {
    nameError.textContent = 'Name is required.';
    nameError.classList.add('active');
    valid = false;
  }

  if (!email) {
    emailError.textContent = 'Email is required.';
    emailError.classList.add('active');
    valid = false;
  } else if (!emailValid) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.classList.add('active');
    valid = false;
  }

  if (!valid) {
    console.log("Form validation failed", { name, email });
    return;
  }

  console.log("Subscribed:", name, email);
  form.reset();
  nameError.textContent = '';
  emailError.textContent = '';
  nameError.classList.remove('active');
  emailError.classList.remove('active');
  subscribeSuccess.textContent = 'Subscribed!';
  subscribeSuccess.classList.add('active');
}

// Initialize event listeners and load posts
function initBlogPlatform() {
  displayPosts(posts);
  if (searchInput) searchInput.addEventListener('input', debounce(searchPosts, 400));
  if (categoryLinks) categoryLinks.forEach(link => link.addEventListener('click', filterByCategory));
  if (form) form.addEventListener('submit', validateForm);
}

document.addEventListener('DOMContentLoaded', initBlogPlatform);

