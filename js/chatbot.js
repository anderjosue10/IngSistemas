// Configuración del chatbot móvil mejorado
document.addEventListener('DOMContentLoaded', function() {
    const chatModal = document.getElementById("chatModal");
    const toggleBtn = document.getElementById("toggleChat");
    const closeBtn = document.getElementById("closeChat");
    const chatBody = document.querySelector(".chat-body");
    const chatInput = document.querySelector(".chat-footer input");
    const chatSendBtn = document.querySelector(".chat-footer button");

    // URL de tu API desplegada en Vercel
    const API_URL = "https://root-folder-liart.vercel.app/api/gemini"; 

    // Variables para el arrastre
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialX = 0;
    let initialY = 0;
    let clickStartTime = 0;
    let isTouchDevice = 'ontouchstart' in window;

    // Estado del modal
    chatModal.style.display = "none";

    // Función para abrir/cerrar el chat (con ARIA)
    function toggleChat() {
        const isOpen = chatModal.style.display === 'block';

        if (isOpen) {
            chatModal.style.display = 'none';
            toggleBtn.setAttribute('aria-expanded', 'false');
            chatModal.setAttribute('aria-hidden', 'true');
        } else {
            chatModal.style.display = 'block';
            toggleBtn.setAttribute('aria-expanded', 'true');
            chatModal.setAttribute('aria-hidden', 'false');
            // Enfocar el input cuando se abre
            setTimeout(() => {
                chatInput.focus();
            }, 300);
        }
    }

    // Función para determinar si fue un clic rápido (no arrastre)
    function isQuickClick() {
        const clickDuration = Date.now() - clickStartTime;
        return clickDuration < 200; // Si duró menos de 200ms, es un clic
    }

    // Event listeners MEJORADOS para móvil
    if (isTouchDevice) {
        // En dispositivos táctiles, solo usar touch events
        toggleBtn.addEventListener('touchstart', function(e) {
            clickStartTime = Date.now();
            isDragging = false;
            
            // Guardar posición inicial para posible arrastre
            const touch = e.touches[0];
            dragStartX = touch.clientX;
            dragStartY = touch.clientY;
            initialX = toggleBtn.offsetLeft;
            initialY = toggleBtn.offsetTop;
        });

        toggleBtn.addEventListener('touchend', function(e) {
            // Solo abrir si no estamos arrastrando y fue un clic rápido
            if (!isDragging && isQuickClick()) {
                e.preventDefault();
                e.stopPropagation();
                toggleChat();
            }
        });

        // Remover el event listener de click en dispositivos táctiles
        toggleBtn.addEventListener('click', function(e) {
            if (isTouchDevice) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    } else {
        // En desktop, usar mouse events normalmente
        toggleBtn.addEventListener('click', function(e) {
            if (!isDragging && isQuickClick()) {
                e.stopPropagation();
                toggleChat();
            }
        });
    }
    
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        chatModal.style.display = 'none';
        toggleBtn.setAttribute('aria-expanded', 'false');
        chatModal.setAttribute('aria-hidden', 'true');
        // Return focus to the toggle button for keyboard users
        toggleBtn.focus();
    });

    // Cerrar modal al hacer clic fuera - MEJORADO
    document.addEventListener("click", function(e) {
        // Si el modal está abierto y el clic fue fuera del modal Y fuera del botón
        if (chatModal.style.display === 'block' && 
            !chatModal.contains(e.target) && 
            !toggleBtn.contains(e.target)) {
            chatModal.style.display = 'none';
            toggleBtn.setAttribute('aria-expanded', 'false');
            chatModal.setAttribute('aria-hidden', 'true');
            toggleBtn.focus();
        }
    });

    // Prevenir que los clics dentro del modal cierren el modal
    chatModal.addEventListener("click", function(e) {
        e.stopPropagation();
    });

    // ========== SISTEMA DE ARRASTRE MEJORADO ==========

    // Mouse events para arrastrar (solo desktop)
    if (!isTouchDevice) {
        toggleBtn.addEventListener("mousedown", startDrag);
    }

    function startDrag(e) {
        clickStartTime = Date.now();
        isDragging = false;
        
        // Guardar posición inicial
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        initialX = toggleBtn.offsetLeft;
        initialY = toggleBtn.offsetTop;
        
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", stopDrag);
        
        toggleBtn.style.transition = 'none';
        toggleBtn.style.cursor = 'grabbing';
    }

    function handleDrag(e) {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        
        // Solo considerar como arrastre si se movió más de 8px
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
            isDragging = true;
            toggleBtn.classList.add("dragging");
        }
        
        if (isDragging) {
            const newX = initialX + deltaX;
            const newY = initialY + deltaY;
            
            // Limitar al área visible
            const maxX = window.innerWidth - toggleBtn.offsetWidth;
            const maxY = window.innerHeight - toggleBtn.offsetHeight;
            
            toggleBtn.style.left = Math.max(10, Math.min(newX, maxX - 10)) + "px";
            toggleBtn.style.top = Math.max(10, Math.min(newY, maxY - 10)) + "px";
            toggleBtn.style.right = "auto";
            toggleBtn.style.bottom = "auto";
        }
    }

    // Sistema de arrastre para touch (ya está integrado en los eventos de touchstart/touchmove)
    function handleDragTouch(e) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - dragStartX;
        const deltaY = touch.clientY - dragStartY;
        
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
            isDragging = true;
            toggleBtn.classList.add("dragging");
        }
        
        if (isDragging) {
            const newX = initialX + deltaX;
            const newY = initialY + deltaY;
            
            const maxX = window.innerWidth - toggleBtn.offsetWidth;
            const maxY = window.innerHeight - toggleBtn.offsetHeight;
            
            toggleBtn.style.left = Math.max(10, Math.min(newX, maxX - 10)) + "px";
            toggleBtn.style.top = Math.max(10, Math.min(newY, maxY - 10)) + "px";
            toggleBtn.style.right = "auto";
            toggleBtn.style.bottom = "auto";
            
            e.preventDefault();
        }
    }

    function stopDrag() {
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", stopDrag);
        
        toggleBtn.classList.remove("dragging");
        toggleBtn.style.transition = 'all 0.3s ease';
        toggleBtn.style.cursor = 'pointer';
        
        // Resetear estado de arrastre después de un pequeño delay
        setTimeout(() => {
            isDragging = false;
        }, 100);
    }

    // Eventos de arrastre para touch
    if (isTouchDevice) {
        toggleBtn.addEventListener("touchmove", handleDragTouch, { passive: false });
        
        toggleBtn.addEventListener("touchend", function(e) {
            document.removeEventListener("touchmove", handleDragTouch);
            toggleBtn.classList.remove("dragging");
            toggleBtn.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                isDragging = false;
            }, 100);
        });
    }

    // ========== FUNCIONALIDAD DEL CHAT ==========

    // Función para enviar mensajes
    async function sendMessage() {
        const message = chatInput.value.trim();
        
        if (!message) return;

        // Agregar mensaje del usuario al chat
        addMessageToChat("user", message);
        chatInput.value = "";

        // Mostrar indicador de typing
        showTypingIndicator();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: message
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            
            // Remover indicador de typing
            removeTypingIndicator();
            
            // Extraer la respuesta del chatbot
            const botResponse = extractBotResponse(data);
            
            // Agregar respuesta del bot al chat
            addMessageToChat("bot", botResponse);

        } catch (error) {
            console.error("Error:", error);
            removeTypingIndicator();
            addMessageToChat("bot", "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.");
        }
    }

    // Función para extraer la respuesta del bot
    function extractBotResponse(data) {
        try {
            return data.candidates[0].content.parts[0].text || 
                   data.contents[0].parts[0].text || 
                   "No pude procesar la respuesta.";
        } catch (err) {
            return "Error al procesar la respuesta del servidor.";
        }
    }

    // Función para agregar mensajes al chat
    function addMessageToChat(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${sender}-message`;
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Función para mostrar indicador de typing
    function showTypingIndicator() {
        const typingElement = document.createElement("div");
        typingElement.id = "typing-indicator";
        typingElement.className = "message bot-message typing";
        typingElement.innerHTML = `<p><i>Escribiendo...</i></p>`;
        chatBody.appendChild(typingElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Función para remover indicador de typing
    function removeTypingIndicator() {
        const typingElement = document.getElementById("typing-indicator");
        if (typingElement) {
            typingElement.remove();
        }
    }

    // Event listeners para enviar mensajes
    chatSendBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        sendMessage();
    });
    
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.stopPropagation();
            sendMessage();
        }
    });

    // Iniciar con efecto de pulso
    setTimeout(() => {
        toggleBtn.classList.add("pulse");
    }, 1000);

    // Prevenir arrastre accidental en móviles
    toggleBtn.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Cerrar con tecla Escape para accesibilidad
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (chatModal.style.display === 'block') {
                chatModal.style.display = 'none';
                toggleBtn.setAttribute('aria-expanded', 'false');
                chatModal.setAttribute('aria-hidden', 'true');
                toggleBtn.focus();
            }
        }
    });
});