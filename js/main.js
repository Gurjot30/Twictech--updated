(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 25,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  document.addEventListener("DOMContentLoaded", () => {
    const popupForm = document.getElementById("popupForm");
    const closeButton = document.querySelector(".close-popup");

    if (popupForm) {
      // Show the popup automatically when the page loads
      popupForm.style.display = "flex"; // Ensures flex centering

      // Close the popup when clicking outside the modal content
      window.addEventListener("click", (event) => {
        if (event.target === popupForm) {
          closePopup();
        }
      });

      // Close button functionality
      if (closeButton) {
        closeButton.addEventListener("click", closePopup);
      }
    }
  });

  // Function to close the popup form
  function closePopup() {
    const popupForm = document.getElementById("popupForm");
    if (popupForm) {
      popupForm.style.display = "none";
    }
  }

  // Function to open the popup form (if needed)
  function openPopup() {
    const popupForm = document.getElementById("popupForm");
    if (popupForm) {
      popupForm.style.display = "flex";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.querySelector("#phone");

    const iti = window.intlTelInput(phoneInput, {
      initialCountry: "", // No default country selected
      separateDialCode: true, // Keeps the dial code separate from the input field
      preferredCountries: ["us", "gb", "in"], // You can set preferred countries
    });

    // Optional: Ensure input starts empty
    phoneInput.value = "";
  });

  document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    // Auto change slides every 5 seconds
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    // Event listeners for buttons
    prevBtn.addEventListener("click", function () {
      prevSlide();
      stopAutoSlide(); // Stop auto-sliding when manually navigated
      startAutoSlide(); // Restart auto-sliding
    });

    nextBtn.addEventListener("click", function () {
      nextSlide();
      stopAutoSlide(); // Stop auto-sliding when manually navigated
      startAutoSlide(); // Restart auto-sliding
    });

    showSlide(currentIndex);
    startAutoSlide(); // Start automatic slideshow on page load
  });

  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider-container");
    const slides = Array.from(document.querySelectorAll(".slider-item"));
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 30; // Include margin for the slide spacing
    const speed = 0.2; // Adjusted speed for smoother transition
    let position = 0;
    let isHovered = false; // To track if the slider is hovered

    // Clone slides for seamless looping
    slides.forEach((slide) => {
      let clone = slide.cloneNode(true); // Clone each slide
      slider.appendChild(clone); // Add the clone to the end of the container
    });

    // Function to move the slider
    function moveSlide() {
      if (!isHovered) {
        // Only move the slide if it's not hovered
        slider.style.transition = `transform ${speed}s linear`; // Use a faster transition
        position -= 1; // Speed of the movement for each frame

        // When original slides have moved completely out, reset to the start without delay
        if (position <= -totalSlides * slideWidth) {
          position = 0;
          slider.style.transition = "none"; // Disable transition during reset for instant loop
          slider.style.transform = `translateX(${position}px)`; // Instant reset
          setTimeout(() => {
            slider.style.transition = `transform ${speed}s linear`; // Re-enable transition after reset
          }, 10); // Small delay to apply the transition again
        }

        slider.style.transform = `translateX(${position}px)`; // Apply the transformation
      }
      requestAnimationFrame(moveSlide); // Keep moving continuously
    }

    // Pause the slider when hovering over any slide
    slider.addEventListener("mouseenter", function () {
      isHovered = true; // Pause the slide movement
    });

    // Resume the slider when mouse leaves the slider container
    slider.addEventListener("mouseleave", function () {
      isHovered = false; // Resume the slide movement
    });

    // Start the infinite loop
    moveSlide();
  });

  document.addEventListener("DOMContentLoaded", function () {
    let section = document.querySelector(".main-container");

    // Apply transition effect for smooth color change
    section.style.transition = "background-color 1s ease-in-out"; // Adjust time as needed

    let observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.style.backgroundColor = "#5b0e2d"; // Change to blue when visible
          } else {
            section.style.backgroundColor = "#ff9800"; // Revert to maroon when out of view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    observer.observe(section);
  });
  //Clients Loop
  document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const clone = track.innerHTML; // Clone logos for smooth loop

    track.innerHTML += clone; // Duplicate content to avoid gaps
  });

  // background image
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });

  document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");

      header.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        // Close all items
        accordionItems.forEach((i) => i.classList.remove("active"));
        document
          .querySelectorAll(".plus")
          .forEach((plus) => (plus.textContent = "+"));

        // Open current item if it was closed
        if (!isActive) {
          item.classList.add("active");
          header.querySelector(".plus").textContent = "-";
        }
      });
    });
  });
})(jQuery);
