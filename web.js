// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const closeMenu = document.querySelector('.close-menu i');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    const newsletterForm = document.getElementById('newsletter-form');
    const sections = document.querySelectorAll('section');
    
    // Variables
    let currentSlide = 0;
    const maxSlide = testimonials.length - 1;
    
    // Fonctions
    
    // Gestion du header au scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Navigation mobile
    function toggleMobileNav() {
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    // Slider de témoignages
    function goToSlide(slideIndex) {
        if (testimonialSlider) {
            testimonials.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
                slide.style.opacity = index === slideIndex ? '1' : '0.5';
            });
            
            // Mettre à jour les indicateurs
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
            
            currentSlide = slideIndex;
        }
    }
    
    function nextSlide() {
        if (currentSlide === maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        if (currentSlide === 0) {
            currentSlide = maxSlide;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
    }
    
    // Animation au défilement
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Si la section est visible dans la fenêtre
            if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
                section.classList.add('fade-in');
                
                // Animer les éléments à l'intérieur
                const features = section.querySelectorAll('.feature-card');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.classList.add('slide-up');
                    }, index * 150);
                });
                
                const courses = section.querySelectorAll('.course-card');
                courses.forEach((course, index) => {
                    setTimeout(() => {
                        course.classList.add('slide-up');
                    }, index * 150);
                });
            }
        });
    }
    
    // Initialisation du slider
    function initTestimonialSlider() {
        if (testimonialSlider) {
            // Positionnez les slides côte à côte
            testimonials.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * index}%)`;
            });
            
            // Démarrez à la première slide
            goToSlide(0);
            
            // Défilement automatique
            setInterval(nextSlide, 5000);
        }
    }
    
    // Soumission du formulaire de newsletter
    function handleNewsletterSubmit(e) {
        if (newsletterForm) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simuler une soumission réussie
                newsletterForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <p>Merci de vous être inscrit ! Vous recevrez bientôt nos actualités.</p>
                    </div>
                `;
            }
        }
    }
    
    // Parallax effet sur le hero
    function handleParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    }
    
    // Gestion des animations au chargement
    function handleLoadAnimations() {
        // Animer les éléments du hero
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) heroContent.classList.add('fade-in');
        if (heroImage) heroImage.classList.add('fade-in');
        
        // Vérifiez les sections visibles
        checkScroll();
    }
    
    // Créer une bulle décorative aléatoirement
    function createBubble() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            // Positions et tailles aléatoires
            const size = Math.random() * 100 + 50;
            const left = Math.random() * 100;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
            
            hero.appendChild(bubble);
            
            // Supprimer la bulle après l'animation
            setTimeout(() => {
                bubble.remove();
            }, 10000);
        }
    }
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('scroll', handleParallax);
    
    if (hamburger) hamburger.addEventListener('click', toggleMobileNav);
    if (closeMenu) closeMenu.addEventListener('click', toggleMobileNav);
    if (overlay) overlay.addEventListener('click', toggleMobileNav);
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    
    // Initialisation
    handleScroll();
    handleLoadAnimations();
    initTestimonialSlider();
    
    // Créer des bulles toutes les 3 secondes
    setInterval(createBubble, 3000);
    
    // Animation des images au survol
    const courseImages = document.querySelectorAll('.course-image');
    courseImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', () => {
            image.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // Animation des feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Simuler un chargement de page
    window.addEventListener('load', () => {
        const loader = document.createElement('div');
        loader.classList.add('page-loader');
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Chargement...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
});

// Composant React pour le slider de cours (pour utilisation future avec React)
class CourseSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            courses: [
                {
                    id: 1,
                    title: "Développement Web Full Stack",
                    image: "/api/placeholder/400/250",
                    rating: 4.8,
                    reviews: 2345,
                    description: "Maîtrisez HTML, CSS, JavaScript, React et Node.js"
                },
                {
                    id: 2,
                    title: "Intelligence Artificielle et Machine Learning",
                    image: "/api/placeholder/400/250",
                    rating: 4.9,
                    reviews: 1876,
                    description: "Fondamentaux de l'IA et modèles machine learning"
                },
                {
                    id: 3,
                    title: "Marketing Digital Avancé",
                    image: "/api/placeholder/400/250",
                    rating: 4.0,
                    reviews: 987,
                    description: "Stratégies marketing pour la visibilité en ligne"
                }
            ]
        };
    }
    
    nextSlide = () => {
        this.setState(prevState => ({
            currentSlide: (prevState.currentSlide + 1) % this.state.courses.length
        }));
    }
    
    prevSlide = () => {
        this.setState(prevState => ({
            currentSlide: prevState.currentSlide === 0 ? this.state.courses.length - 1 : prevState.currentSlide - 1
        }));
    }
    
    render() {
        const { currentSlide, courses } = this.state;
        
        return (
            <div className="course-slider">
                <div className="slider-container">
                    {courses.map((course, index) => (
                        <div 
                            key={course.id}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
                        >
                            <div className="course-card">
                                <div className="course-image">
                                    <img src={course.image} alt={course.title} />
                                </div>
                                <div className="course-info">
                                    <h3>{course.title}</h3>
                                    <div className="course-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`fas fa-star ${i < Math.floor(course.rating) ? '' : 'faded'}`}></i>
                                        ))}
                                        <span>{course.rating} ({course.reviews} avis)</span>
                                    </div>
                                    <p>{course.description}</p>
                                    <a href="#" className="btn-course">Voir le cours</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider-controls">
                    <button className="prev" onClick={this.prevSlide}><i className="fas fa-chevron-left"></i></button>
                    <button className="next" onClick={this.nextSlide}><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
        );
    }
}

// Fonction pour détecter l'intersection des éléments (animation au défilement)
function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Exécuter après le chargement complet
window.addEventListener('load', setupIntersectionObserver);