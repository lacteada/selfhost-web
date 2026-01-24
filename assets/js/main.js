const services = [
    {
        name: "Immich",
        url: "https://immich.lacto.vip",
        desc: "Photo & Video Gallery",
        icon: "image",
        mobileUrl: "https://immich.app/download"
    },
    {
        name: "Jellyfin",
        url: "https://jellyfin.lacto.vip",
        desc: "Media Entertainment",
        icon: "play",
        mobileUrl: "https://jellyfin.org/downloads"
    },
    {
        name: "Minecraft",
        url: "mc.lacto.vip",
        desc: "Survival Server",
        icon: "pickaxe",
        isIP: true,
        secondaryUrl: "https://github.com/benlox44/smp-mods"
    }
];

const uiConfig = {
    card: {
        base: "group flex items-center p-4 rounded-2xl bg-surface border border-border-dim transition-all duration-300 hover:border-zinc-700 w-full",
    },
    iconContainer: {
        base: "p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors"
    },
    text: {
        title: "text-base font-semibold text-zinc-100 truncate",
        subtitle: "text-xs text-zinc-500 truncate font-medium"
    },
    button: {
        base: "p-2 rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderServiceCards();
    lucide.createIcons();
});

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function renderServiceCards() {
    const serviceListContainer = document.getElementById('services-list');
    if (!serviceListContainer) return;

    const isMobile = isMobileDevice();

    services.forEach(service => {
        const cardElement = document.createElement('div');
        cardElement.className = uiConfig.card.base;

        let mainAction = null;
        if (!service.isIP) {
            if (isMobile && service.mobileUrl) {
                mainAction = {
                    url: service.mobileUrl,
                    icon: 'download',
                    title: 'Download App'
                };
            } else {
                mainAction = {
                    url: service.url,
                    icon: 'external-link',
                    title: 'Open Link'
                };
            }
        }
        
        cardElement.innerHTML = `
            <div class="${uiConfig.iconContainer.base}">
                <i data-lucide="${service.icon}" class="w-6 h-6"></i>
            </div>
            
            <div class="ml-4 flex-grow min-w-0">
                <h2 class="${uiConfig.text.title}">${service.name}</h2>
                <p class="${uiConfig.text.subtitle}">${service.desc}</p>
            </div>

            <div class="flex items-center gap-2 ml-3">
                <button onclick="copyToClipboard('${service.url}', '${service.name}')" 
                        class="${uiConfig.button.base}"
                        title="Copy to Clipboard">
                    <i data-lucide="copy" class="w-5 h-5"></i>
                </button>

                ${mainAction ? `
                <a href="${mainAction.url}" target="_blank" 
                   class="${uiConfig.button.base}"
                   title="${mainAction.title}">
                    <i data-lucide="${mainAction.icon}" class="w-5 h-5"></i>
                </a>
                ` : ''}

                ${service.secondaryUrl ? `
                <a href="${service.secondaryUrl}" target="_blank" 
                   class="${uiConfig.button.base}"
                   title="Open Mods">
                    <i data-lucide="github" class="w-5 h-5"></i>
                </a>
                ` : ''}
            </div>
        `;
        serviceListContainer.appendChild(cardElement);
    });
}

function toggleModal() {
    const modal = document.getElementById('info-modal');
    const content = document.getElementById('modal-content');
    
    if (modal.classList.contains('opacity-0')) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95', 'translate-y-4');
        content.classList.add('scale-100', 'translate-y-0');
    } else {
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-100', 'translate-y-0');
        content.classList.add('scale-95', 'translate-y-4');
    }
}

let notificationTimeout;
window.copyToClipboard = function(textToCopy, serviceName) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        const toastElement = document.getElementById('toast');
        const toastMessageElement = document.getElementById('toast-message');
        
        if (toastElement && toastMessageElement) {
            toastMessageElement.innerText = `${serviceName} copied!`;
            toastElement.classList.remove('opacity-0', 'translate-y-4');

            clearTimeout(notificationTimeout);
            notificationTimeout = setTimeout(() => {
                toastElement.classList.add('opacity-0', 'translate-y-4');
            }, 2000);
        }
    });
};
