// Função principal que é executada quando o DOM está pronto.
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializa todos os módulos da aplicação
    initSidebar();
    initNavigation();
    initScrollAnimations();
    initMouseSpotlight();
    initTypewriterEffect();
    
});

/**
 * Módulo para controlar a barra lateral (Sidebar) em dispositivos móveis.
 */
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open-sidebar-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');

    if (sidebar && openBtn && closeBtn) {
        openBtn.addEventListener('click', () => sidebar.classList.remove('-translate-x-full'));
        closeBtn.addEventListener('click', () => sidebar.classList.add('-translate-x-full'));
    }
}

/**
 * Módulo para gerenciar a navegação de página única (SPA-like).
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-container');
    const sidebar = document.getElementById('sidebar');

    // Função para mostrar a seção correta e atualizar o estado da navegação
    const showSection = (hash) => {
        const sectionId = hash ? hash.substring(1) : 'home';
        
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        navLinks.forEach(link => {
            if (link.hash === hash || (hash === '' && link.hash === '#home')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Fecha a sidebar em telas pequenas após a navegação
        if (window.innerWidth < 1024) {
            sidebar.classList.add('-translate-x-full');
        }
        
        // Rola para o topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Adiciona o evento de clique a todos os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.hash);
            // Atualiza a URL sem recarregar a página (opcional, mas bom para UX)
            history.pushState(null, '', link.hash);
        });
    });

    // Mostra a seção correta com base na URL ao carregar a página
    showSection(window.location.hash || '#home');
}

/**
 * Módulo para animar elementos quando eles entram na tela (scroll).
 * Usa a API Intersection Observer para performance.
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: para de observar o elemento depois que ele foi animado
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento está visível
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Módulo para o efeito de "spotlight" que segue o mouse.
 */
function initMouseSpotlight() {
    const spotlight = document.querySelector('.spotlight');
    if (!spotlight) return;

    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
    });
}

/**
 * Módulo para o efeito de máquina de escrever na seção Home.
 */
function initTypewriterEffect() {
    const titleEl = document.getElementById('typewriter-title');
    const subtitleEl = document.getElementById('typewriter-subtitle');
    
    const titleText = "EXÉRCITO NACIONAL DE AUROA";
    const subtitleText = "Honra, Disciplina e Excelência. Junte-se à força de elite em Ghost Recon: Breakpoint.";

    if (!titleEl || !subtitleEl) return;

    const type = (element, text, speed, callback) => {
        let i = 0;
        element.innerHTML = ""; // Limpa o elemento antes de começar
        const typing = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                if (callback) callback(); // Chama a próxima função
            }
        }, speed);
    };

    // Inicia o efeito, primeiro no título, depois no subtítulo
    type(titleEl, titleText, 100, () => {
        type(subtitleEl, subtitleText, 50);
    });
}