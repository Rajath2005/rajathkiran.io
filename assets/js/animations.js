import { gsap } from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Function to animate page transition
export const animatePageChange = (activePage) => {
    // Animate new content in
    gsap.fromTo(activePage,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
    );

    // Force ScrollTrigger to recalculate positions since layout changed
    ScrollTrigger.refresh();

    // Re-initialize ScrollTriggers for the new page content
    initScrollAnimations(activePage);
};

export const initScrollAnimations = (context = document) => {
    // Animate Sections on Scroll
    const sections = context.querySelectorAll('section, article');
    sections.forEach(section => {
        gsap.fromTo(section.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%", // Start when top of section hits 85% of viewport
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Animate List Items (Projects, Experience) with staggered reveal
    const lists = context.querySelectorAll('.service-list, .testimonials-list, .coding-profiles-list, .project-list');
    lists.forEach(list => {
        gsap.fromTo(list.children,
            { y: 30, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)", // Bouncy effect
                scrollTrigger: {
                    trigger: list,
                    start: "top 90%"
                }
            }
        );
    });

    initTimelineAnimations(context);
};

export const initTimelineAnimations = (context = document) => {
    const timelineContainers = context.querySelectorAll('.timeline-container');

    timelineContainers.forEach(container => {
        // Animate the line drawing for THIS container
        const lineFill = container.querySelector('.timeline-line-fill');
        if (lineFill) {
            gsap.to(lineFill, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 70%',
                    end: 'bottom 70%',
                    scrub: true
                }
            });
        }
    });

    // Animate Timeline Items (Applies to all cards globally)
    const items = context.querySelectorAll('.timeline-item.premium-card');
    items.forEach((item, index) => {
        // Content Reveal
        gsap.fromTo(item,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => item.classList.add('active'),
                    onLeaveBack: () => item.classList.remove('active')
                }
            }
        );
    });
};

// Initial Load Animation
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();

    const sidebar = document.querySelector('.sidebar');
    // Sidebar enters from left with bounce
    gsap.from(sidebar, { x: -100, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.75)" });
});
