document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC SETTINGS
    ====================================================== */

    const prefersReduced =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       LOADER
    ====================================================== */

    const loader =
        document.querySelector(".loader");

    const loaderNumber =
        document.querySelector(".loader-number");

    const loaderBar =
        document.querySelector(".loader-line span");


    document.body.classList.add("loading");


    function startSite(){

        if(!loader){

            document.body.classList.remove("loading");

            animateHero();

            return;
        }


        loader.style.pointerEvents = "none";


        if(window.gsap && !prefersReduced){

            gsap.to(loader,{
                yPercent:-100,

                duration:.9,

                delay:.15,

                ease:"power4.inOut",

                onComplete:()=>{

                    loader.remove();

                    document.body.classList.remove(
                        "loading"
                    );

                    animateHero();

                }

            });

        }else{

            loader.remove();

            document.body.classList.remove(
                "loading"
            );

            animateHero();

        }

    }


    if(
        window.gsap &&
        !prefersReduced &&
        loader
    ){

        const counter = {
            value:0
        };


        gsap.to(loaderBar,{

            width:"100%",

            duration:1.7,

            ease:"power2.inOut"

        });


        gsap.to(counter,{

            value:100,

            duration:1.7,

            ease:"power2.out",

            onUpdate:()=>{

                if(loaderNumber){

                    loaderNumber.textContent =
                        String(
                            Math.floor(counter.value)
                        ).padStart(2,"0");

                }

            },

            onComplete:startSite

        });

    }else{

        if(loaderNumber){

            loaderNumber.textContent = "100";

        }

        if(loaderBar){

            loaderBar.style.width =
                "100%";

        }

        setTimeout(
            startSite,
            250
        );

    }


    /* =====================================================
       HERO ANIMATION
    ====================================================== */

    function animateHero(){

        if(
            !window.gsap ||
            prefersReduced
        ){

            return;
        }


        gsap.from(
            ".hero-title span",
            {
                y:100,
                opacity:0,

                duration:1.1,

                ease:"power4.out",

                stagger:.12
            }
        );


        gsap.from(
            ".hero-reveal",
            {
                y:30,
                opacity:0,

                duration:.8,

                delay:.35,

                ease:"power3.out",

                stagger:.1
            }
        );


        gsap.from(
            ".hero-image img",
            {
                scale:.8,
                opacity:0,

                duration:1.2,

                delay:.2,

                ease:"power3.out"
            }
        );


        gsap.to(
            ".hero-glow",
            {
                scale:1.15,

                opacity:.65,

                duration:2,

                repeat:-1,

                yoyo:true,

                ease:"sine.inOut"
            }
        );

    }


    /* =====================================================
       CUSTOM CURSOR
    ====================================================== */

    const cursor =
        document.querySelector(".cursor");

    const follower =
        document.querySelector(".cursor-follower");


    if(
        cursor &&
        follower &&
        window.gsap &&
        !prefersReduced &&
        window.innerWidth > 768
    ){

        window.addEventListener(
            "mousemove",
            (e)=>{

                gsap.to(cursor,{
                    x:e.clientX,
                    y:e.clientY,

                    duration:.08,

                    ease:"power2.out"
                });


                gsap.to(follower,{
                    x:e.clientX,
                    y:e.clientY,

                    duration:.28,

                    ease:"power3.out"
                });

            }
        );


        document
            .querySelectorAll(
                "a, button, .portfolio-item, .service-card"
            )
            .forEach((el)=>{

                el.addEventListener(
                    "mouseenter",
                    ()=>{

                        gsap.to(
                            follower,
                            {
                                scale:1.7,

                                duration:.2
                            }
                        );

                        cursor.classList.add(
                            "active"
                        );

                    }
                );


                el.addEventListener(
                    "mouseleave",
                    ()=>{

                        gsap.to(
                            follower,
                            {
                                scale:1,

                                duration:.2
                            }
                        );

                        cursor.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if(
        "IntersectionObserver" in window
    ){

        const observer =
            new IntersectionObserver(
                (entries,obs)=>{

                    entries.forEach(
                        (entry)=>{

                            if(
                                entry.isIntersecting
                            ){

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                obs.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:.12
                }
            );


        revealElements.forEach(
            (el)=>{
                observer.observe(el);
            }
        );

    }else{

        revealElements.forEach(
            (el)=>{
                el.classList.add(
                    "is-visible"
                );
            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    if(
        "IntersectionObserver" in window
    ){

        const navObserver =
            new IntersectionObserver(
                (entries)=>{

                    entries.forEach(
                        (entry)=>{

                            if(
                                !entry.isIntersecting
                            ){

                                return;
                            }


                            navLinks.forEach(
                                (link)=>{

                                    link.classList.toggle(
                                        "active",

                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${entry.target.id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(
            (section)=>{
                navObserver.observe(
                    section
                );
            }
        );

    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const mobileNav =
        document.querySelector(
            ".mobile-nav"
        );


    if(
        menuToggle &&
        mobileNav
    ){

        menuToggle.addEventListener(
            "click",
            ()=>{

                const isOpen =
                    mobileNav.classList.toggle(
                        "open"
                    );


                menuToggle.classList.toggle(
                    "open",
                    isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        mobileNav
            .querySelectorAll("a")
            .forEach((link)=>{

                link.addEventListener(
                    "click",
                    ()=>{

                        mobileNav.classList.remove(
                            "open"
                        );

                        menuToggle.classList.remove(
                            "open"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* =====================================================
       SCROLL PROGRESS
    ====================================================== */

    const progressBar =
        document.querySelector(
            ".scroll-progress span"
        );


    function updateScrollProgress(){

        if(!progressBar){

            return;
        }


        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? scrollTop / documentHeight
                : 0;


        progressBar.style.transform =
            `scaleX(${progress})`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive:true
        }
    );


    updateScrollProgress();


    /* =====================================================
       MAGNETIC BUTTONS
    ====================================================== */

    if(
        window.gsap &&
        !prefersReduced &&
        window.innerWidth > 768
    ){

        document
            .querySelectorAll(
                ".magnetic"
            )
            .forEach((button)=>{

                button.addEventListener(
                    "mousemove",
                    (e)=>{

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            e.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            e.clientY -
                            rect.top -
                            rect.height / 2;


                        gsap.to(
                            button,
                            {
                                x:x * .18,
                                y:y * .18,

                                duration:.3,

                                ease:"power2.out"
                            }
                        );

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    ()=>{

                        gsap.to(
                            button,
                            {
                                x:0,
                                y:0,

                                duration:.5,

                                ease:"elastic.out(1,.4)"
                            }
                        );

                    }
                );

            });

    }


    /* =====================================================
       3D TILT EFFECT
    ====================================================== */

    if(
        !prefersReduced &&
        window.innerWidth > 768
    ){

        document
            .querySelectorAll(
                ".service-card, .why-card, .process-card, .portfolio-item"
            )
            .forEach((card)=>{

                card.addEventListener(
                    "mousemove",
                    (e)=>{

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            e.clientX -
                            rect.left;


                        const y =
                            e.clientY -
                            rect.top;


                        const rotateY =
                            ((x / rect.width) - .5) * 8;


                        const rotateX =
                            ((y / rect.height) - .5) * -8;


                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-5px)`;


                    }
                );


                card.addEventListener(
                    "mouseleave",
                    ()=>{

                        card.style.transform =
                            "";

                    }
                );

            });

    }


    /* =====================================================
       PORTFOLIO MOUSE SPOTLIGHT
    ====================================================== */

    document
        .querySelectorAll(
            ".portfolio-item, .service-card"
        )
        .forEach((card)=>{

            card.addEventListener(
                "mousemove",
                (e)=>{

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        ((e.clientX - rect.left)
                        / rect.width) * 100;


                    const y =
                        ((e.clientY - rect.top)
                        / rect.height) * 100;


                    card.style.setProperty(
                        "--mx",
                        `${x}%`
                    );


                    card.style.setProperty(
                        "--my",
                        `${y}%`
                    );

                }
            );

        });


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    if(
        window.gsap &&
        !prefersReduced &&
        window.innerWidth > 768
    ){

        const hero =
            document.querySelector(
                ".hero"
            );

        const heroImage =
            document.querySelector(
                ".hero-image"
            );


        if(
            hero &&
            heroImage
        ){

            hero.addEventListener(
                "mousemove",
                (e)=>{

                    const rect =
                        hero.getBoundingClientRect();


                    const x =
                        (e.clientX -
                        rect.left -
                        rect.width / 2)
                        / rect.width;


                    const y =
                        (e.clientY -
                        rect.top -
                        rect.height / 2)
                        / rect.height;


                    gsap.to(
                        heroImage,
                        {
                            x:x * 18,
                            y:y * 10,

                            duration:.7,

                            ease:"power3.out"
                        }
                    );

                }
            );


            hero.addEventListener(
                "mouseleave",
                ()=>{

                    gsap.to(
                        heroImage,
                        {
                            x:0,
                            y:0,

                            duration:.8,

                            ease:"power3.out"
                        }
                    );

                }
            );

        }

    }


    /* =====================================================
       PORTFOLIO CAROUSEL
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const portfolioItems =
        Array.from(
            document.querySelectorAll(
                ".portfolio-item"
            )
        );

    const portfolioGrid =
        document.querySelector(
            ".portfolio-grid"
        );

    const portfolioViewport =
        document.querySelector(
            ".portfolio-viewport"
        );

    const portfolioPrev =
        document.querySelector(
            ".portfolio-prev"
        );

    const portfolioNext =
        document.querySelector(
            ".portfolio-next"
        );

    const portfolioDots =
        document.querySelector(
            ".portfolio-dots"
        );


    let currentFilter = "logo";

    let currentPage = 0;


    function getItemsPerPage(){

        if(window.innerWidth <= 768){

            return 1;
        }

        if(window.innerWidth <= 1100){

            return 2;
        }

        return 3;

    }


    function getFilteredItems(){

        return portfolioItems.filter(
            (item)=>{

                return (
                    currentFilter === "all" ||
                    item.dataset.category === currentFilter
                );

            }
        );

    }


    function updatePortfolio(){

        if(
            !portfolioGrid ||
            !portfolioViewport
        ){

            return;
        }


        const filteredItems =
            getFilteredItems();


        const itemsPerPage =
            getItemsPerPage();


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    filteredItems.length /
                    itemsPerPage
                )
            );


        currentPage =
            Math.max(
                0,
                Math.min(
                    currentPage,
                    totalPages - 1
                )
            );


        portfolioItems.forEach(
            (item)=>{

                const visible =
                    currentFilter === "all" ||
                    item.dataset.category ===
                        currentFilter;


                item.style.display =
                    visible
                        ? "block"
                        : "none";

            }
        );


        requestAnimationFrame(
            ()=>{

                const viewportWidth =
                    portfolioViewport.clientWidth;


                if(!viewportWidth){

                    return;
                }


                const gridStyle =
                    window.getComputedStyle(
                        portfolioGrid
                    );


                const gap =
                    parseFloat(
                        gridStyle.columnGap
                    ) || 0;


                let cardWidth;


                if(itemsPerPage === 1){

                    cardWidth =
                        viewportWidth;

                }else{

                    cardWidth =
                        (
                            viewportWidth -
                            gap *
                            (itemsPerPage - 1)
                        ) /
                        itemsPerPage;

                }


                filteredItems.forEach(
                    (item)=>{

                        item.style.flex =
                            `0 0 ${cardWidth}px`;

                        item.style.width =
                            `${cardWidth}px`;

                    }
                );


                const moveDistance =
                    currentPage *
                    (cardWidth + gap) *
                    itemsPerPage;


                portfolioGrid.style.transform =
                    `translate3d(
                        -${moveDistance}px,
                        0,
                        0
                    )`;


                if(portfolioPrev){

                    portfolioPrev.disabled =
                        currentPage === 0;

                }


                if(portfolioNext){

                    portfolioNext.disabled =
                        currentPage >=
                        totalPages - 1;

                }


                if(!portfolioDots){

                    return;
                }


                portfolioDots.innerHTML = "";


                for(
                    let i = 0;
                    i < totalPages;
                    i++
                ){

                    const dot =
                        document.createElement(
                            "button"
                        );


                    dot.type = "button";

                    dot.className =
                        "portfolio-dot";


                    if(
                        i === currentPage
                    ){

                        dot.classList.add(
                            "active"
                        );

                    }


                    dot.setAttribute(
                        "aria-label",
                        `Go to portfolio page ${i + 1}`
                    );


                    dot.addEventListener(
                        "click",
                        ()=>{

                            currentPage = i;

                            updatePortfolio();

                        }
                    );


                    portfolioDots.appendChild(
                        dot
                    );

                }

            }
        );

    }


    if(portfolioNext){

        portfolioNext.addEventListener(
            "click",
            ()=>{

                const totalPages =
                    Math.ceil(
                        getFilteredItems().length /
                        getItemsPerPage()
                    );


                if(
                    currentPage <
                    totalPages - 1
                ){

                    currentPage++;

                    updatePortfolio();

                }

            }
        );

    }


    if(portfolioPrev){

        portfolioPrev.addEventListener(
            "click",
            ()=>{

                if(currentPage > 0){

                    currentPage--;

                    updatePortfolio();

                }

            }
        );

    }


    filterButtons.forEach(
        (button)=>{

            button.addEventListener(
                "click",
                ()=>{

                    filterButtons.forEach(
                        (btn)=>{

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentFilter =
                        button.dataset.filter;


                    currentPage = 0;


                    updatePortfolio();

                }
            );

        }
    );


    let portfolioResizeTimer;


    window.addEventListener(
        "resize",
        ()=>{

            clearTimeout(
                portfolioResizeTimer
            );


            portfolioResizeTimer =
                setTimeout(
                    ()=>{

                        currentPage = 0;

                        updatePortfolio();

                    },
                    150
                );

        }
    );


    updatePortfolio();


    /* =====================================================
       PORTFOLIO LIGHTBOX
    ====================================================== */

    const lightbox =
        document.querySelector(
            "#portfolio-lightbox"
        );

    const lightboxImage =
        document.querySelector(
            "#lightbox-image"
        );

    const lightboxCurrent =
        document.querySelector(
            "#lightbox-current"
        );

    const lightboxTotal =
        document.querySelector(
            "#lightbox-total"
        );

    const lightboxCategory =
        document.querySelector(
            "#lightbox-category"
        );

    const lightboxTitle =
        document.querySelector(
            "#lightbox-title"
        );

    const lightboxClose =
        document.querySelector(
            ".lightbox-close"
        );

    const lightboxPrev =
        document.querySelector(
            ".lightbox-prev"
        );

    const lightboxNext =
        document.querySelector(
            ".lightbox-next"
        );


    let lightboxItems = [];

    let lightboxIndex = 0;


    function refreshLightboxItems(){

        lightboxItems =
            portfolioItems.filter(
                (item)=>{

                    return (
                        getComputedStyle(
                            item
                        ).display !== "none"
                    );

                }
            );

    }


    function getProjectTitle(item){

        const image =
            item.querySelector("img");


        if(!image){

            return "Portfolio Project";

        }


        const alt =
            image.alt || "";


        const title =
            alt
                .replace(/\d+/g,"")
                .trim();


        return title ||
            "Portfolio Project";

    }


    function openLightbox(index){

        if(
            !lightbox ||
            !lightboxItems.length
        ){

            return;
        }


        lightboxIndex = index;


        const item =
            lightboxItems[
                lightboxIndex
            ];


        const image =
            item.querySelector("img");


        if(!image){

            return;
        }


        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            image.alt;


        const category =
            item.dataset.category ||
            "project";


        lightboxCategory.textContent =
            category.toUpperCase();


        lightboxTitle.textContent =
            getProjectTitle(item);


        lightboxCurrent.textContent =
            String(
                lightboxIndex + 1
            ).padStart(2,"0");


        lightboxTotal.textContent =
            String(
                lightboxItems.length
            ).padStart(2,"0");


        lightbox.classList.add(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox(){

        if(!lightbox){

            return;
        }


        lightbox.classList.remove(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    function showNextProject(){

        if(!lightboxItems.length){

            return;
        }


        lightboxIndex =
            (
                lightboxIndex + 1
            ) %
            lightboxItems.length;


        openLightbox(
            lightboxIndex
        );

    }


    function showPreviousProject(){

        if(!lightboxItems.length){

            return;
        }


        lightboxIndex =
            (
                lightboxIndex -
                1 +
                lightboxItems.length
            ) %
            lightboxItems.length;


        openLightbox(
            lightboxIndex
        );

    }


    portfolioItems.forEach(
        (item)=>{

            item.addEventListener(
                "click",
                ()=>{

                    refreshLightboxItems();


                    const index =
                        lightboxItems.indexOf(
                            item
                        );


                    if(index !== -1){

                        openLightbox(
                            index
                        );

                    }

                }
            );

        }
    );


    if(lightboxClose){

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if(lightboxNext){

        lightboxNext.addEventListener(
            "click",
            showNextProject
        );

    }


    if(lightboxPrev){

        lightboxPrev.addEventListener(
            "click",
            showPreviousProject
        );

    }


    if(lightbox){

        lightbox.addEventListener(
            "click",
            (e)=>{

                if(
                    e.target ===
                    lightbox
                ){

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (e)=>{

            if(
                !lightbox ||
                !lightbox.classList.contains(
                    "open"
                )
            ){

                return;
            }


            if(e.key === "Escape"){

                closeLightbox();

            }


            if(e.key === "ArrowRight"){

                showNextProject();

            }


            if(e.key === "ArrowLeft"){

                showPreviousProject();

            }

        }
    );


    /* =====================================================
       CONTACT FORM / EMAILJS
    ====================================================== */

    const contactForm =
        document.getElementById(
            "contact-form"
        );

    const sendBtn =
        document.getElementById(
            "send-btn"
        );

    const formStatus =
        document.getElementById(
            "form-status"
        );


    if(
        contactForm &&
        sendBtn &&
        formStatus
    ){

        if(window.emailjs){

            emailjs.init({
                publicKey:
                    "wzZ3JlxO3St3geadt"
            });

        }


        contactForm.addEventListener(
            "submit",
            async(e)=>{

                e.preventDefault();


                if(!window.emailjs){

                    formStatus.textContent =
                        "Email service is unavailable. Please try again later.";

                    formStatus.className =
                        "error";

                    return;

                }


                sendBtn.disabled =
                    true;


                sendBtn.textContent =
                    "SENDING...";


                formStatus.textContent =
                    "";

                formStatus.className =
                    "";


                try{

                    await emailjs.sendForm(
                        "service_6hp1rlm",
                        "template_m0ehbpp",
                        contactForm
                    );


                    formStatus.textContent =
                        "✓ Message sent successfully!";


                    formStatus.className =
                        "success";


                    contactForm.reset();

                }catch(error){

                    console.error(
                        "EmailJS Error:",
                        error
                    );


                    formStatus.textContent =
                        "✕ Message could not be sent. Please try again.";


                    formStatus.className =
                        "error";

                }finally{

                    sendBtn.disabled =
                        false;


                    sendBtn.textContent =
                        "SEND MESSAGE →"; }
}
);
 }
});
