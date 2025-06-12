document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Thank you for your message!");
  this.reset();
});

// Update event listeners for multiple product cards
document.querySelectorAll(".buyNowBtn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (confirm("Are you sure you want to buy this product?")) {
      alert("Thank you for your purchase!");
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('detailsModal');
  const modalDetails = document.querySelector('.modal-details');
  const closeModalBtn = document.querySelector('.close-modal');

  document.querySelectorAll('.toggleDetailsBtn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const details = btn.parentElement.querySelector('.moreDetails');
      if (details) {
        modalDetails.innerHTML = details.innerHTML;
        modal.removeAttribute('hidden');
      }
    });
  });

  closeModalBtn.addEventListener('click', function() {
    modal.setAttribute('hidden', '');
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.setAttribute('hidden', '');
    }
  });
});

// About carousel functionality
(function() {
  const slides = document.querySelectorAll('.about-slide');
  const dots = document.querySelectorAll('.about-dots .dot');
  let current = 0;
  let interval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function startAuto() {
    interval = setInterval(nextSlide, 3500);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      stopAuto();
      startAuto();
    });
  });

  showSlide(0);
  startAuto();
})();
