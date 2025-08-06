/**
 * REMOVE ONLINE TEXT - Sistema para Remover Texto "Online"
 * Implementação seguindo padrões ISTQB CTAL-TAE
 * 
 * Remove o texto "Online" da seção de estatísticas
 * Mantém apenas o ícone e o label
 * Preserva o layout alinhado
 */

class RemoveOnlineText {
    constructor() {
        this.config = {
            enableTextRemoval: true,
            preserveLayout: true,
            maintainAlignment: true
        };
        
        this.init();
    }

    /**
     * Inicialização do sistema
     */
    init() {
        console.log('🗑️ RemoveOnlineText: Inicializando remoção do texto "Online"...');
        
        try {
            this.removeOnlineText();
            this.fixOnlineElement();
            this.maintainAlignment();
            
            console.log('✅ RemoveOnlineText: Sistema inicializado com sucesso');
        } catch (error) {
            console.error('❌ RemoveOnlineText: Erro na inicialização', error);
        }
    }

    /**
     * Remover texto "Online"
     */
    removeOnlineText() {
        console.log('🗑️ Removendo texto "Online"...');
        
        const onlineTextStyle = document.createElement('style');
        onlineTextStyle.textContent = `
            /* Remover texto "Online" da seção de estatísticas */
            .stat .stat-number:contains("Online"),
            .stat .stat-number span:contains("Online"),
            .stat .stat-number div:contains("Online") {
                display: none !important;
            }
            
            /* Esconder elementos que contêm "Online" */
            .stat .stat-number:has(span:contains("Online")),
            .stat .stat-number:has(div:contains("Online")) {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }
            
            /* Manter apenas o ícone quadrado */
            .stat .stat-number:has(span:contains("Online")) span:first-child,
            .stat .stat-number:has(div:contains("Online")) div:first-child {
                display: block !important;
                width: 2.5rem !important;
                height: 2.5rem !important;
                background: linear-gradient(45deg, #ffc107, #ff8f00) !important;
                border-radius: 0.5rem !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 1.5rem !important;
            }
            
            /* Esconder o texto "Online" especificamente */
            .stat .stat-number span:contains("Online"),
            .stat .stat-number div:contains("Online"),
            .stat .stat-number:contains("Online") {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                overflow: hidden !important;
            }
        `;
        
        document.head.appendChild(onlineTextStyle);
        
        console.log('✅ Texto "Online" removido');
    }

    /**
     * Corrigir elemento Online
     */
    fixOnlineElement() {
        console.log('🔧 Corrigindo elemento Online...');
        
        const onlineFixStyle = document.createElement('style');
        onlineFixStyle.textContent = `
            /* Correção específica para o elemento Online */
            .stat:has(.stat-number:contains("Online")) .stat-number {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                min-height: 3rem !important;
                width: 100% !important;
            }
            
            /* Criar ícone quadrado para Online */
            .stat:has(.stat-number:contains("Online")) .stat-number::before {
                content: "" !important;
                display: block !important;
                width: 2.5rem !important;
                height: 2.5rem !important;
                background: linear-gradient(45deg, #ffc107, #ff8f00) !important;
                border-radius: 0.5rem !important;
                margin: 0 auto !important;
            }
            
            /* Esconder conteúdo original do Online */
            .stat:has(.stat-number:contains("Online")) .stat-number > * {
                display: none !important;
            }
            
            /* Manter apenas o ícone quadrado */
            .stat:has(.stat-number:contains("Online")) .stat-number {
                background: none !important;
                -webkit-background-clip: unset !important;
                -webkit-text-fill-color: unset !important;
                background-clip: unset !important;
            }
        `;
        
        document.head.appendChild(onlineFixStyle);
        
        console.log('✅ Elemento Online corrigido');
    }

    /**
     * Manter alinhamento
     */
    maintainAlignment() {
        console.log('📐 Mantendo alinhamento...');
        
        const alignmentStyle = document.createElement('style');
        alignmentStyle.textContent = `
            /* Manter alinhamento perfeito */
            .stats {
                display: grid !important;
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 1rem !important;
                align-items: center !important;
                justify-items: center !important;
            }
            
            .stat {
                text-align: center !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                width: 100% !important;
                min-height: 80px !important;
            }
            
            .stat-number {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                min-height: 3rem !important;
                width: 100% !important;
                text-align: center !important;
            }
            
            .stat-label {
                text-align: center !important;
                width: 100% !important;
                margin-top: 0.5rem !important;
            }
            
            /* Mobile Responsivo */
            @media (max-width: 768px) {
                .stats {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
                
                .stat {
                    min-height: 60px !important;
                }
                
                .stat-number {
                    min-height: 2.5rem !important;
                }
            }
            
            /* Viewport Pequeno */
            @media (max-height: 600px) {
                .stat {
                    min-height: 50px !important;
                }
                
                .stat-number {
                    min-height: 2rem !important;
                }
            }
        `;
        
        document.head.appendChild(alignmentStyle);
        
        console.log('✅ Alinhamento mantido');
    }

    /**
     * Aplicar correção via JavaScript
     */
    applyJavaScriptFix() {
        console.log('🔧 Aplicando correção via JavaScript...');
        
        // Encontrar elemento Online e modificar
        const stats = document.querySelectorAll('.stat');
        stats.forEach(stat => {
            const statNumber = stat.querySelector('.stat-number');
            if (statNumber && statNumber.textContent.includes('Online')) {
                // Remover conteúdo original
                statNumber.innerHTML = '';
                
                // Criar ícone quadrado
                const icon = document.createElement('div');
                icon.style.cssText = `
                    width: 2.5rem;
                    height: 2.5rem;
                    background: linear-gradient(45deg, #ffc107, #ff8f00);
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: white;
                `;
                icon.innerHTML = '🟢';
                
                statNumber.appendChild(icon);
                
                console.log('✅ Elemento Online modificado via JavaScript');
            }
        });
    }

    /**
     * Verificar se o texto foi removido
     */
    checkTextRemoval() {
        console.log('🔍 Verificando remoção do texto...');
        
        const stats = document.querySelectorAll('.stat');
        let onlineFound = false;
        
        stats.forEach((stat, index) => {
            const statNumber = stat.querySelector('.stat-number');
            if (statNumber && statNumber.textContent.includes('Online')) {
                console.log(`📊 Stat ${index + 1} ainda contém "Online"`);
                onlineFound = true;
            }
        });
        
        if (!onlineFound) {
            console.log('✅ Texto "Online" removido com sucesso');
        } else {
            console.log('⚠️ Texto "Online" ainda presente, aplicando correção JavaScript');
            this.applyJavaScriptFix();
        }
    }

    /**
     * Executar sistema
     */
    run() {
        console.log('🚀 Executando remoção do texto "Online"...');
        
        // Aplicar correções
        this.removeOnlineText();
        this.fixOnlineElement();
        this.maintainAlignment();
        
        // Verificar e aplicar correção JavaScript se necessário
        setTimeout(() => {
            this.checkTextRemoval();
        }, 500);
        
        console.log('✅ Remoção do texto "Online" executada');
    }
}

// Exportar para uso global
window.RemoveOnlineText = RemoveOnlineText; 