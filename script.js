document.addEventListener("DOMContentLoaded", function () {
  var html = document.documentElement;
  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var sections = document.querySelectorAll("main section[id]");
  function updateActiveNav() {
    var scrollPosition = window.scrollY + 150;
    var currentSection = "hero-section";
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });
      link.classList.add("active");
      var targetId = link.getAttribute("href");
      var target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });
  var themeToggleButton = document.getElementById("theme-toggle-button");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", function () {
      html.classList.toggle("dark");
      var isDark = html.classList.contains("dark");
      themeToggleButton.setAttribute("aria-pressed", isDark);
      themeToggleButton.setAttribute(
        "aria-label",
        isDark ? "تبديل الوضع الفاتح" : "تبديل الوضع الداكن"
      );
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    html.classList.add("dark");
  } else if (savedTheme === "light") {
    html.classList.remove("dark");
  }
  if (themeToggleButton) {
    themeToggleButton.setAttribute(
      "aria-pressed",
      html.classList.contains("dark")
    );
  }
  var portfolioFilters = document.querySelectorAll(".portfolio-filter");
  var portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioFilters.forEach(function (filterButton) {
    filterButton.addEventListener("click", function () {
      var selectedFilter = filterButton.getAttribute("data-filter");
      portfolioFilters.forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
        button.classList.remove(
          "bg-linear-to-r",
          "from-primary",
          "to-secondary",
          "text-white"
        );
        button.classList.add(
          "bg-white",
          "dark:bg-slate-800",
          "text-slate-600",
          "dark:text-slate-300"
        );
      });
      filterButton.classList.add("active");
      filterButton.setAttribute("aria-pressed", "true");
      filterButton.classList.remove(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300"
      );
      filterButton.classList.add(
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white"
      );
      portfolioItems.forEach(function (item) {
        var category = item.getAttribute("data-category");
        if (selectedFilter === "all" || category === selectedFilter) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
  var testimonialCarousel =
    document.getElementById("testimonials-carousel");
  var testimonialCards =
    document.querySelectorAll(".testimonial-card");
  var nextTestimonial =
    document.getElementById("next-testimonial");
  var prevTestimonial =
    document.getElementById("prev-testimonial");
  var carouselIndicators =
    document.querySelectorAll(".carousel-indicator");
  var currentTestimonial = 0;
  function getCardsPerView() {
    if (window.innerWidth >= 1024) {
      return 3;
    }
    if (window.innerWidth >= 640) {
      return 2;
    }
    return 1;
  }
  function updateTestimonialCarousel() {
    if (!testimonialCarousel || testimonialCards.length === 0) {
      return;
    }
    var cardsPerView = getCardsPerView();
    var maxIndex = Math.max(
      0,
      testimonialCards.length - cardsPerView
    );
    if (currentTestimonial > maxIndex) {
      currentTestimonial = maxIndex;
    }
    var cardWidth = 100 / cardsPerView;
    testimonialCards.forEach(function (card) {
      card.style.width = cardWidth + "%";
    });
    testimonialCarousel.style.transform =
      "translateX(" +
      currentTestimonial * cardWidth +
      "%)";
    carouselIndicators.forEach(function (indicator, index) {
      indicator.classList.remove("bg-accent");
      indicator.classList.add(
        "bg-slate-400",
        "dark:bg-slate-600"
      );
      indicator.setAttribute("aria-selected", "false");
      if (index === currentTestimonial) {
        indicator.classList.remove(
          "bg-slate-400",
          "dark:bg-slate-600"
        );
        indicator.classList.add("bg-accent");
        indicator.setAttribute("aria-selected", "true");
      }
    });
  }
  if (nextTestimonial) {
    nextTestimonial.addEventListener("click", function () {
      var cardsPerView = getCardsPerView();
      var maxIndex = Math.max(
        0,
        testimonialCards.length - cardsPerView
      );
      if (currentTestimonial < maxIndex) {
        currentTestimonial++;
      } else {
        currentTestimonial = 0;
      }
      updateTestimonialCarousel();
    });
  }
  if (prevTestimonial) {
    prevTestimonial.addEventListener("click", function () {
      var cardsPerView = getCardsPerView();
      var maxIndex = Math.max(
        0,
        testimonialCards.length - cardsPerView
      );
      if (currentTestimonial > 0) {
        currentTestimonial--;
      } else {
        currentTestimonial = maxIndex;
      }
      updateTestimonialCarousel();
    });
  }
  carouselIndicators.forEach(function (indicator) {
    indicator.addEventListener("click", function () {
      var index = Number(
        indicator.getAttribute("data-index")
      );
      currentTestimonial = index;
      updateTestimonialCarousel();
    });
  });
  window.addEventListener("resize", updateTestimonialCarousel);
  updateTestimonialCarousel();
  var settingsToggle =
    document.getElementById("settings-toggle");
  var settingsSidebar =
    document.getElementById("settings-sidebar");
  var closeSettings =
    document.getElementById("close-settings");
  function openSettings() {
    if (!settingsSidebar) {
      return;
    }
    settingsSidebar.classList.remove("translate-x-full");
    settingsSidebar.setAttribute("aria-hidden", "false");
    if (settingsToggle) {
      settingsToggle.setAttribute("aria-expanded", "true");
    }
  }
  function closeSettingsPanel() {
    if (!settingsSidebar) {
      return;
    }
    settingsSidebar.classList.add("translate-x-full");
    settingsSidebar.setAttribute("aria-hidden", "true");
    if (settingsToggle) {
      settingsToggle.setAttribute("aria-expanded", "false");
    }
  }
  if (settingsToggle) {
    settingsToggle.addEventListener("click", function () {
      var isOpen =
        !settingsSidebar.classList.contains("translate-x-full");
      if (isOpen) {
        closeSettingsPanel();
      } else {
        openSettings();
      }
    });
  }
  if (closeSettings) {
    closeSettings.addEventListener(
      "click",
      closeSettingsPanel
    );
  }
  var fontOptions =
    document.querySelectorAll(".font-option");
  var fontClasses = [
    "font-alexandria",
    "font-tajawal",
    "font-cairo"
  ];
  function applyFont(fontName) {
    document.body.classList.remove(...fontClasses);
    var selectedFontClass = "font-" + fontName;
    if (fontClasses.includes(selectedFontClass)) {
      document.body.classList.add(selectedFontClass);
    }
    fontOptions.forEach(function (option) {
      var optionFont =
        option.getAttribute("data-font");
      var isSelected =
        optionFont === fontName;
      option.classList.toggle("active", isSelected);
      option.setAttribute(
        "aria-checked",
        isSelected ? "true" : "false"
      );
    });
    localStorage.setItem("selectedFont", fontName);
  }
  fontOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      var fontName =
        option.getAttribute("data-font");
      applyFont(fontName);
    });
  });
  var savedFont =
    localStorage.getItem("selectedFont");
  if (savedFont) {
    applyFont(savedFont);
  }
  var colorPresets = {
    purple: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#ec4899"
    },
    blue: {
      primary: "#2563eb",
      secondary: "#3b82f6",
      accent: "#06b6d4"
    },
    green: {
      primary: "#10b981",
      secondary: "#14b8a6",
      accent: "#22c55e"
    },
    orange: {
      primary: "#f97316",
      secondary: "#f59e0b",
      accent: "#ef4444"
    },
    pink: {
      primary: "#ec4899",
      secondary: "#d946ef",
      accent: "#8b5cf6"
    }
  };
  function applyColors(colors) {
    html.style.setProperty(
      "--color-primary",
      colors.primary
    );
    html.style.setProperty(
      "--color-secondary",
      colors.secondary
    );
    html.style.setProperty(
      "--color-accent",
      colors.accent
    );
    localStorage.setItem(
      "selectedColors",
      JSON.stringify(colors)
    );
  }
  function createColorSettings() {
    if (!settingsSidebar) {
      return;
    }
    var content =
      settingsSidebar.querySelector(
        ".flex-1.overflow-y-auto"
      );
    if (!content) {
      return;
    }
    var existing =
      content.querySelector("#js-color-settings");
    if (existing) {
      return;
    }
    var section = document.createElement("div");
    section.id = "js-color-settings";
    section.innerHTML = `
      <h4 class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
        <i class="fa-solid fa-pavarte text-xs"></i>
        ألوان الموقع
      </h4>
      <div class="grid grid-cols-5 gap-3">
        <button type="button" data-color-preset="purple" aria-label="اللون البنفسجي" class="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" style="background:#6366f1"></button>
        <button type="button" data-color-preset="blue" aria-label="اللون الأزرق" class="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" style="background:#2563eb"></button>
        <button type="button" data-color-preset="green" aria-label="اللون الأخضر" class="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" style="background:#10b981"></button>
        <button type="button" data-color-preset="orange" aria-label="اللون البرتقالي" class="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" style="background:#f97316"></button>
        <button type="button" data-color-preset="pink" aria-label="اللون الوردي" class="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform" style="background:#ec4899"></button>
      </div>
    `;
    content.appendChild(section);
    var presetButtons =
      section.querySelectorAll(
        "[data-color-preset]"
      );
    presetButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var preset =
          button.getAttribute("data-color-preset");
        if (colorPresets[preset]) {
          applyColors(colorPresets[preset]);
        }
      });
    });
  }
  createColorSettings();
  var savedColors =
    localStorage.getItem("selectedColors");
  if (savedColors) {
    try {
      applyColors(JSON.parse(savedColors));
    } catch (error) {
      console.log("Invalid saved colors");
    }
  }
  var scrollToTop =
    document.getElementById("scroll-to-top");
  function toggleScrollButton() {
    if (!scrollToTop) {
      return;
    }
    if (window.scrollY > 500) {
      scrollToTop.classList.remove(
        "opacity-0",
        "invisible"
      );
      scrollToTop.classList.add(
        "opacity-100",
        "visible"
      );
    } else {
      scrollToTop.classList.remove(
        "opacity-100",
        "visible"
      );
      scrollToTop.classList.add(
        "opacity-0",
        "invisible"
      );
    }
  }
  window.addEventListener(
    "scroll",
    toggleScrollButton
  );
  toggleScrollButton();
  if (scrollToTop) {
    scrollToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
  var customSelects =
    document.querySelectorAll(".custom-select");
  customSelects.forEach(function (select) {
    var wrapper =
      select.closest(".custom-select-wrapper");
    if (!wrapper) {
      return;
    }
    var options =
      wrapper.querySelectorAll(".custom-option");
    var selectedText =
      select.querySelector(".selected-text");
    select.addEventListener("click", function () {
      var isOpen =
        select.getAttribute("aria-expanded") === "true";
      document
        .querySelectorAll(".custom-select")
        .forEach(function (otherSelect) {
          otherSelect.setAttribute(
            "aria-expanded",
            "false"
          );
          var otherWrapper =
            otherSelect.closest(
              ".custom-select-wrapper"
            );
          if (otherWrapper) {
            var otherOptions =
              otherWrapper.querySelector(
                ".custom-options"
              );
            if (otherOptions) {
              otherOptions.classList.add("hidden");
            }
          }
        });
      select.setAttribute(
        "aria-expanded",
        isOpen ? "false" : "true"
      );
      var optionsContainer =
        wrapper.querySelector(".custom-options");
      if (optionsContainer) {
        optionsContainer.classList.toggle(
          "hidden",
          isOpen
        );
      }
    });
    options.forEach(function (option) {
      option.addEventListener("click", function (event) {
        event.stopPropagation();
        if (selectedText) {
          selectedText.textContent =
            option.getAttribute("data-value");
          selectedText.classList.remove(
            "text-slate-500",
            "dark:text-slate-400"
          );
        }
        select.setAttribute(
          "aria-expanded",
          "false"
        );
        var optionsContainer =
          wrapper.querySelector(".custom-options");
        if (optionsContainer) {
          optionsContainer.classList.add("hidden");
        }
      });
    });
  });
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".custom-select-wrapper")) {
      document
        .querySelectorAll(".custom-select")
        .forEach(function (select) {
          select.setAttribute(
            "aria-expanded",
            "false"
          );
        });
      document
        .querySelectorAll(".custom-options")
        .forEach(function (options) {
          options.classList.add("hidden");
        });
    }
  });
  var contactForm =
    document.querySelector("form[aria-label='نموذج التواصل']");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var fullName =
        document.getElementById("full-name");
      var email =
        document.getElementById("email");
      var phone =
        document.getElementById("phone");
      var isValid = true;
      if (fullName && fullName.value.trim() === "") {
        fullName.classList.add("border-red-500");
        isValid = false;
      } else if (fullName) {
        fullName.classList.remove("border-red-500");
      }
      if (
        email &&
        email.value.trim() === ""
      ) {
        email.classList.add("border-red-500");
        isValid = false;
      } else if (email) {
        email.classList.remove("border-red-500");
      }
      if (!isValid) {
        alert("من فضلك املأ البيانات المطلوبة.");
        return;
      }
      alert("تم إرسال رسالتك بنجاح!");
      contactForm.reset();
      document
        .querySelectorAll(".selected-text")
        .forEach(function (text) {
          text.textContent = "اختر نوع المشروع";
          text.classList.add(
            "text-slate-500",
            "dark:text-slate-400"
          );
        });
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSettingsPanel();
    }
  });
});