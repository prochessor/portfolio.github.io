'use strict'
const accountModal = document.querySelector(".account");
const overlay = document.querySelector(".overlay");
let index = 0;
let index1 = 0;
let flag = false;
let i = 0;
let translation = 0;
let allSections = [...document.getElementsByTagName("section")];
const check = false;
const tabs = [...document.querySelectorAll(".flex-tab")];
const buttons = [...document.querySelectorAll(".button")];
const writingText = document.querySelector(".writing");
const skills = [
    [..."Web Developer..."],
    [..." Game Developer..."],
    [..."Teacher..."]
];
let menuNavs = document.querySelectorAll(".menu-nav");
let round = document.querySelector(".round");
let closeMenu = document.querySelector(".close-menu");
let landingPage = document.querySelector(".landing-page");
let quickReviewCard = document.querySelector(".card");
let scaleValue = getComputedStyle(document.documentElement).getPropertyValue("--scale-value");
let rotateValue = getComputedStyle(document.documentElement).getPropertyValue("--rotate-value");
rotateValue += 360 + "deg";
let projectHeading = [...document.querySelectorAll(".card-content h3")];
let serviceHeading = [...document.querySelectorAll(".card-content-services h3")];
let projects = document.querySelectorAll(".project-item");
let services = [...document.querySelectorAll(".services-item")];
let navBar = document.querySelector(".nav");
let slides = document.querySelectorAll(".slide");
let stickyNav = function ([entry]) {
    if (entry.isIntersecting == false) {
        navBar.classList.add("sticky")
    } else
        navBar.classList.remove("sticky")
}
let observerNav = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.1,
    rootMargin: `-${navBar.getBoundingClientRect().height-2}px`
})
if (document.documentElement.clientWidth >= 840)
    observerNav.observe(landingPage)
//Writing animation
buttons.forEach((t) => {
    t.addEventListener("click", (e) => {
        let clickedButton = e.target;
        e.preventDefault();
        clickedButton = clickedButton.closest("div")

        if (!clickedButton)
            return;
        buttons.forEach((b) => {
            b.classList.remove("btn-active")
        })
        clickedButton.classList.add("btn-active")

        tabs.forEach((tab) => {
            tab.classList.remove("tab--active")
        })
        let targetTab = clickedButton.textContent[1];
        targetTab = document.querySelector(`.tab-${targetTab}`);
        targetTab.classList.add("tab--active");
    })
})

let fade = function ([entry], observer) {
    if (entry.isIntersecting) {
        entry.target.classList.remove("section--hidden")
        observer.unobserve(entry.target);
    }

}
let options = {
    root: null,
    threshold: 0.1
}
let observer = new IntersectionObserver(fade, options);

//Contant Form
document.querySelector(".nav-form-btn").addEventListener("click", () => {
    accountModal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");

})
document.querySelector(".closeBtn").addEventListener("click", () => {
    accountModal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");

})

writingText.textContent = '';
setInterval(() => {
    if (flag == false) {
        writingText.textContent += skills[index1][index];
        index++;
        if (index > skills[index1].length - 1) {
            index = 0;
            flag = true;

        }
    } else if (flag == true) {
        writingText.textContent = writingText.textContent.slice(0, -1);
        i++;
        if (i == skills[index1].length) {
            index1++;
            if (index1 == skills.length)
                index1 = 0;
            i = 0;
            flag = false;
        }
    }
}, 90)

projects = [...projects];
[...document.querySelectorAll(".clickMe")].forEach((c) => {

    c.addEventListener("click", () => {
        scaleValue = scaleValue == 1.08 ? 1 : 1.08;
        document.documentElement.style.setProperty("--scale-value", scaleValue);
        document.documentElement.style.setProperty("--rotate-value", rotateValue);
        rotateValue = Number.parseInt(rotateValue) + 360 + "deg";
        quickReviewCard.previousElementSibling.style.transform = `translateX(${translation}px)`
        quickReviewCard.nextElementSibling.nextElementSibling.style.transform = `translateX(${-translation}px)`
        translation == 300 ? translation = 0 : translation = 300;
        projects.forEach((p, i) => {
            if (i != 0) {
                p.classList.add("hidden");
            }
        })
        services.forEach((s, i) => {
            if (i != 0) {
                s.classList.add("hidden");
            }
        })
        if (scaleValue == 1) {
            setTimeout(() => {
                quickReviewCard.classList.toggle("hidden");
                quickReviewCard.nextElementSibling.classList.toggle("hidden");
            }, 550)
        } else {
            setTimeout(() => {
                quickReviewCard.classList.toggle("hidden");
                quickReviewCard.nextElementSibling.classList.toggle("hidden");
            }, 800)
        }
    })
})

//To reveal content in the quick card
projectHeading.forEach((h) => {
    h.addEventListener("click", (e) => {
        let clicked = h.textContent[0];
        document.querySelector(`.project-${clicked}`).classList.toggle("hidden");
    })
})
serviceHeading.forEach((s) => {
    s.addEventListener("click", function (e) {
        let serviceNumber = e.target.textContent[0];
        document.querySelector(`.service-${serviceNumber}`).classList.toggle("hidden");
    })
})
allSections.forEach((s) => {
    observer.observe(s);
    s.classList.add("section--hidden");
})

//Nav hover effect
let navItems = [...document.querySelectorAll(".nav-item")];
if (document.documentElement.clientWidth >= 840) {
    navBar.addEventListener("mouseover", function (e) {
        let link = e.target;
        link = link.closest(".nav-item")
        if (!link)
            return;
        if (link.classList.contains("nav-item")) {
            navItems.forEach((c) => {
                if (c != link) {
                    c.style.opacity = 0.5;
                }
            })
        }
    })
    navBar.addEventListener("mouseout", function (e) {
        navItems.forEach((c) => {
            c.style.opacity = 1;
        })

    })

} else {
    navBar.addEventListener("mouseover", function (e) {
        let link = e.target;
        link = link.closest(".menu-nav")
        if (!link)
            return;
        if (link.classList.contains("menu-nav")) {
            navItems.forEach((c, i) => {
                if (c != link && i >= 1) {
                    c.style.opacity = 0.5;
                }
            })
        }
    })
    navBar.addEventListener("mouseout", function (e) {
        navItems.forEach((c) => {
            c.style.opacity = 1;
        })

    })
}
slides = [...slides]
slides.forEach((s, i) => {
    s.style.transform = `translateX(${i*1800+60}px)`

})
let description = [...document.querySelectorAll(".description")]
let slide = 0;
document.querySelector(".slide-container").addEventListener("click", function (e) {
    let button = e.target;
    if (button && button.classList.contains("button-slide")) {
        if (button.dataset.button == "right") {

            slide++;
            if (slide == 4) {
                slide = 0;
            }
        } else if (button.dataset.button == "left") {
            slide--;
            if (slide == -1) {
                slide = 3;
            }
        }
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${(i-slide)*1800+60 }px)`
        })
    }
})
let menuBtn = document.querySelector(".menu-button");

menuBtn.addEventListener("click", () => {
    round.style.animation = "bounce 0.5s ease-out"
    round.style.display = "block";

    closeMenu.style.display = "block";
    menuNavs.forEach((m) => {
        m.style.display = "block"
    })
})
closeMenu.addEventListener("click", () => {
    round.style.animation = "bounceBack 0.5s ease-in"
    setTimeout(() => {
        round.style.display = "none";
    }, 200)
    closeMenu.style.display = "none";
    menuNavs.forEach((m) => {
        m.style.display = "none"
    })
})