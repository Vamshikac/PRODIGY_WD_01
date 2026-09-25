/* =========================================================
   Kaffeine & Co. — Task 01
   JavaScript
   ========================================================= */


/* ---------------------------------------------------------
   1. SELECT THE ELEMENTS WE NEED
   --------------------------------------------------------- */

// The fixed navigation bar
const navbar = document.getElementById("navbar");

// Hamburger menu button
const menuToggle = document.getElementById("menu-toggle");

// The navigation links container
const navLinks = document.getElementById("nav-links");

// All individual navigation links
const navItems = document.querySelectorAll(".nav-links a");

// All main sections that correspond to navigation links
const sections = document.querySelectorAll("section");


/* ---------------------------------------------------------
   2. MOBILE MENU
   --------------------------------------------------------- */

// When the hamburger button is clicked...
menuToggle.addEventListener("click", () => {

  // Add/remove the "open" class on the hamburger.
  //
  // Your CSS uses:
  // .menu-toggle.open span:nth-child(1)
  // .menu-toggle.open span:nth-child(2)
  // .menu-toggle.open span:nth-child(3)
  //
  // This turns the three lines into an X.
  menuToggle.classList.toggle("open");


  // Open/close the actual navigation menu.
  //
  // Your CSS already has:
  // .nav-links.open { max-height: 320px; }
  //
  // So JavaScript only needs to add/remove "open".
  navLinks.classList.toggle("open");


  // Update the accessibility attribute.
  //
  // aria-expanded="true" means the menu is open.
  // aria-expanded="false" means the menu is closed.
  const isOpen = menuToggle.classList.contains("open");

  menuToggle.setAttribute("aria-expanded", isOpen);

});


/* ---------------------------------------------------------
   3. CLOSE MOBILE MENU WHEN A LINK IS CLICKED
   --------------------------------------------------------- */

// Go through every navigation link.
navItems.forEach((link) => {

  link.addEventListener("click", () => {

    // Remove the open state from the hamburger.
    menuToggle.classList.remove("open");

    // Close the navigation menu.
    navLinks.classList.remove("open");

    // Reset accessibility state.
    menuToggle.setAttribute("aria-expanded", "false");

  });

});


/* ---------------------------------------------------------
   4. NAVBAR SCROLL EFFECT
   --------------------------------------------------------- */

// Listen for scrolling on the page.
window.addEventListener("scroll", () => {

  /*
    window.scrollY tells us how many pixels the page
    has been scrolled vertically.

    If we're more than 50px down the page,
    add the "scrolled" class.

    Your CSS already defines what happens:

    #navbar.scrolled {
      background: var(--paper);
      color: var(--ink);
      height: 60px;
      border-bottom: 1px solid var(--line);
    }
  */

  if (window.scrollY > 50) {

    navbar.classList.add("scrolled");

  } else {

    navbar.classList.remove("scrolled");

  }

});


/* ---------------------------------------------------------
   5. ACTIVE NAVIGATION LINK
   --------------------------------------------------------- */

/*
  We want the navigation to know which section the user
  is currently looking at.

  Example:

  User is looking at #menu
       ↓
  "Menu" gets the .active class

  User scrolls to #story
       ↓
  "Our story" gets the .active class

  Your CSS already styles .active:

  .nav-links a.active {
    border-bottom-color: var(--signal);
    font-weight: 800;
  }
*/


// Create an IntersectionObserver.
//
// It watches sections as they enter/leave the screen.
const sectionObserver = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      // Only do something when the section becomes visible.
      if (entry.isIntersecting) {

        // Get the ID of the section currently visible.
        //
        // Example:
        // section id="menu"
        //
        // sectionId becomes "menu".
        const sectionId = entry.target.getAttribute("id");


        // Remove "active" from every navigation link.
        navItems.forEach((link) => {
          link.classList.remove("active");
        });


        // Find the navigation link that points to this section.
        //
        // If sectionId is "menu", this finds:
        //
        // <a href="#menu">Menu</a>
        const activeLink = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );


        // If a matching link exists, make it active.
        if (activeLink) {
          activeLink.classList.add("active");
        }

      }

    });

  },

  {
    /*
      threshold controls how much of the section needs
      to be visible before the observer reacts.

      0.3 = roughly 30% of the section is visible.
    */
    threshold: 0.3

  }

);


// Start observing every section.
sections.forEach((section) => {
  sectionObserver.observe(section);
});


/* ---------------------------------------------------------
   6. SCROLL REVEAL ANIMATION
   --------------------------------------------------------- */

/*
  We can make the content appear smoothly as the user
  scrolls down.

  Instead of manually adding a class to every element
  in the HTML, we'll select some useful elements here.

  The JavaScript will add the class:
  
      reveal

  And when they become visible:

      reveal.visible
*/


const revealElements = document.querySelectorAll(
  ".section h2, .section > .wrap > p, .price-list li, .facts > div, .route-card, .minor"
);


// Add the "reveal" class to each selected element.
revealElements.forEach((element) => {
  element.classList.add("reveal");
});


/*
  Now create another IntersectionObserver.

  This one watches the elements we want to animate.
*/
const revealObserver = new IntersectionObserver(

  (entries, observer) => {

    entries.forEach((entry) => {

      // If the element has entered the screen...
      if (entry.isIntersecting) {

        // Add the visible class.
        entry.target.classList.add("visible");


        /*
          Once the animation has happened, we don't need
          to keep watching this element.

          unobserve() stops observing that element.
        */
        observer.unobserve(entry.target);

      }

    });

  },

  {
    // Start the animation when about 15% is visible.
    threshold: 0.15

  }

);


// Start observing every reveal element.
revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* ---------------------------------------------------------
   7. ADD THE REVEAL CSS FROM JAVASCRIPT
   --------------------------------------------------------- */

/*
  Your current CSS doesn't have .reveal or .visible.

  We could add those styles to style.css, BUT since this
  is specifically our JavaScript animation, we can create
  them here.

  This means we don't have to modify your existing CSS.
*/


const revealStyle = document.createElement("style");

revealStyle.textContent = `

  .reveal {
    opacity: 0;
    transform: translateY(25px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

`;

// Add those styles to the page.
document.head.appendChild(revealStyle);


/* ---------------------------------------------------------
   8. INITIAL CHECK
   --------------------------------------------------------- */

/*
  Run the navbar check once when the page first loads.

  This is useful if the page is refreshed while already
  scrolled down.
*/

if (window.scrollY > 50) {
  navbar.classList.add("scrolled");
}


/* =========================================================
   END OF SCRIPT
   ========================================================= */