document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section-container');
    const recruitmentButton = document.getElementById('recruitment-button');
    const openSidebarBtn = document.getElementById('open-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const sectionContainer = document.getElementById('section-content-container');
    const parallaxBg = document.getElementById('parallax-bg');

    // Função para exibir a seção com transição
    let activeSectionId = 'home';
    let isTransitioning = false;

    function showSection(sectionId) {
        if (isTransitioning || activeSectionId === sectionId) return;

        isTransitioning = true;
        const currentSection = document.getElementById(activeSectionId);
        const nextSection = document.getElementById(sectionId);

        // Inicia a transição de saída da seção atual
        currentSection.classList.add('leaving');

        // Adiciona um listener para o fim da animação de saída
        currentSection.addEventListener('animationend', function handler() {
            currentSection.classList.add('hidden');
            currentSection.classList.remove('leaving');
            
            // Exibe a próxima seção e inicia a transição de entrada
            nextSection.classList.remove('hidden');
            nextSection.classList.add('entering');
            
            nextSection.addEventListener('animationend', function handler() {
                nextSection.classList.remove('entering');
                isTransitioning = false;
                nextSection.removeEventListener('animationend', handler);
            });

            activeSectionId = sectionId;
            currentSection.removeEventListener('animationend', handler);
        });

        // Atualiza o estado da navegação
        navItems.forEach(item => {
            const itemId = item.id.replace('nav-', '');
            item.classList.remove('active');
            if (itemId === sectionId) {
                item.classList.add('active');
            }
        });

        // Fecha a barra lateral em telas pequenas
        if (window.innerWidth < 1024) {
            sidebar.classList.add('-translate-x-full');
        }
        
        // Rola para o topo da página após a transição
        setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    }

    // Adiciona listeners de clique aos itens da navegação
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.currentTarget.id.replace('nav-', '');
            showSection(sectionId);
        });
    });

    // Adiciona listener de clique ao botão de recrutamento
    if (recruitmentButton) {
        recruitmentButton.addEventListener('click', () => {
            showSection('recruitment');
        });
    }

    // Listeners para abrir/fechar a barra lateral em mobile
    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
    });
    
    // Efeito de Parallax no fundo
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrollY * 0.2}px)`;
    });

    // Exibe a seção 'home' por padrão na inicialização
    showSection('home');
});