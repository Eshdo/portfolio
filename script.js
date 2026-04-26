// 1. TYPING EFFECT
const text = ["IT Undergraduate","WordPress Web Designer", "AI & ML Developer", "ML Enthusiast", "Data Analyst"];
let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function type() {
  if (i < text.length) {
    if (!isDeleting && j <= text[i].length) {
      currentText = text[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentText = text[i].substring(0, j--);
    }

    // Adding a blinking cursor for a better UI experience
    document.getElementById("typing").innerHTML = currentText + "<span style='animation: blink 1s infinite; font-weight: normal;'>|</span>";

    // Adjusting typing speed for reading vs deleting
    let typeSpeed = isDeleting ? 50 : 100;

    if (j === text[i].length) {
      isDeleting = true;
      typeSpeed = 1500; // Pause at the end of the word before deleting
    }
    
    if (j === 0 && isDeleting) {
      isDeleting = false;
      i++;
      if (i === text.length) i = 0;
      typeSpeed = 500; // Pause before typing the next word
    }
    
    setTimeout(type, typeSpeed);
  }
}

// Start typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  type();
});

// 2. SCROLL ANIMATION (Fade and slide up)
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // When the element enters the viewport, add the "active" class
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15 // Triggers when 15% of the element is visible on screen
});

// Observe all elements with the class "reveal"
reveals.forEach(reveal => {
  revealOnScroll.observe(reveal);
});

/* --- SKILL TYPING ANIMATION --- */

// 1. The list of skills that will be typed out. You can edit this array.
const skillsToType = [
  "Python.",
  "Html.",
  "Css.",
  "Js.",
  "WordPress",
  "n8n Automation",
  "MySQL"
];

// 2. Initialization variables for the skill typing effect
let skillI = 0; // index for the current word in the array
let skillJ = 0; // index for the current character in the word
let currentSkillText = "";
let isDeletingSkill = false;
const skillTargetElementId = "skilltyping";

// 3. The main skill typing function
function typeSkillsEffect() {
  const skillEl = document.getElementById(skillTargetElementId);
  
  // Safety check: Exit the function if the element doesn't exist on the page
  if (!skillEl) {
    return;
  }

  const fullWord = skillsToType[skillI];

  // Calculate the new text substring
  if (isDeletingSkill) {
    // If deleting, take one less character
    currentSkillText = fullWord.substring(0, skillJ--);
  } else {
    // If typing, take one more character
    currentSkillText = fullWord.substring(0, skillJ++);
  }

  // Update the element content, plus a simple blinking cursor span
  skillEl.innerHTML = currentSkillText + '<span style="animation: blinkCursor 0.8s infinite; color: inherit; margin-left: 2px;">|</span>';

  // --- Animation Timing Logic ---
  let dynamicDelay = isDeletingSkill ? 50 : 100; // Deleting is faster than typing

  if (!isDeletingSkill && skillJ > fullWord.length) {
    // Finished typing full word - Pause before deleting
    isDeletingSkill = true;
    dynamicDelay = 1500; // Pauses on the full text
  } else if (isDeletingSkill && skillJ < 0) {
    // Finished deleting word - move to the next word
    isDeletingSkill = false;
    skillI = (skillI + 1) % skillsToType.length; // cycle back to start if finished array
    dynamicDelay = 500; // Small delay before typing the next word
  }

  // Loop back and call the function again after the delay
  setTimeout(typeSkillsEffect, dynamicDelay);
}

// 4. Set the animation to run only after the complete DOM (HTML) has finished loading
document.addEventListener("DOMContentLoaded", typeSkillsEffect);