"use client";

import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

// --- NOTA PARA A ANIMAÇÃO ---
// Para a animação de confete funcionar, adicione este script
// ao seu ficheiro HTML principal ou no _app.tsx/_document.tsx do seu projeto Next.js:
// <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>


// --- TIPOS (TYPES) ---
// Define os atributos de RPG para cada memória
type Attribute = 'Romance' | 'Aventura' | 'Companheirismo' | 'Sincronia';

// Define a estrutura de cada objeto de memória, agora com atributos de RPG
type Memory = {
  id: number;
  title: string;
  emoji?: string;
  imageUrl: string;
  description: string;
  attribute: Attribute;
};

// --- DADOS DAS MEMÓRIAS (MOCK DATA) ---
// Cada memória agora tem um 'attribute' que fortalece a Ficha de Aventura
const initialMemories: Memory[] = [
  {
    id: 1,
    title: 'Nosso Primeiro Encontro',
    emoji: '☕️',
    imageUrl: './matriz.png',
    description: 'Praça, café, passeio pela cidade e muita conversa (com fofocas). Nosso primeiro encontro foi completo!',
    attribute: 'Romance',
  },
  {
    id: 2,
    title: 'São Pauloooooo...',
    emoji: '🐙',
    imageUrl: './sao-paulo.jpg',
    description: 'Nossa primeira viagem de casal, e que viagem inesquecível! Cada momento com você foi único, e eu amei absolutamente tudo.',
    attribute: 'Aventura',
  },
  {
    id: 3,
    title: 'Ano novo em Poços',
    emoji: '🎆',
    imageUrl: './pocos.png',
    description: 'O final de ano mais perfeito que já tive foi ao seu lado, cada segundo até a meia-noite e depois dela foi perfeito. Que seja o primeiro de muitos anos novos!',
    attribute: 'Companheirismo',
  },
  {
    id: 4,
    title: 'Passeio de helicóptero',
    emoji: '🚁',
    imageUrl: './heli.png',
    description: 'Fomos ao céu e foi seu primeiro voo, primeiro de muitos, muitos!',
    attribute: 'Aventura',
  },
  {
    id: 5,
    title: 'Vimos Friends do começo ao fim',
    emoji: '📺',
    imageUrl: './friends.jpg',
    description: 'Sua série conforto se tornou a minha queridinha também, amei vermos a série na medida que íamos nos conhecendo e fortalecendo nossa relação. Phoebe Buffay entenda: você é perfeita!',
    attribute: 'Sincronia',
  },
  {
    id: 6,
    title: 'Seu aniversário',
    emoji: '🎂',
    imageUrl: './birthday.png',
    description: 'Passamos seu aniversário com sua família, foi tão gostoso e especial. Me senti tão acolhido em meio a pessoas tão boas.',
    attribute: 'Companheirismo',
  },
  {
    id: 7,
    title: 'Conversas',
    emoji: '💬',
    imageUrl: './arturito.png',
    description: 'Falamos sobre tudo, de espiritualidade a subselebs, e sempre conseguimos ter um gosto muito mútuo em tudo, nossas conversas são ótimas e sempre me agregam muito.',
    attribute: 'Sincronia',
  },
  {
    id: 8,
    title: 'Alianças',
    emoji: '💍',
    imageUrl: './ring.png',
    description: 'Você selou nosso compromisso com as alianças, com direito a nome e data, como sempre sonhei.',
    attribute: 'Romance',
  },
  {
    id: 9,
    title: 'Química',
    emoji: '❤️‍🔥',
    imageUrl: './lula.jpeg',
    description: 'Nossa química é inigualável, você parece desenhado pra mim, amo todo nosso contato, e pra mim sempre é único e maravilhoso. É o melhor que já tive. AAAAAAAAAAAAAAAHHHHHHHHHHHHHH',
    attribute: 'Romance',
  }
];

// Declara a função confetti para o TypeScript, que virá de um script externo
declare const confetti: any;


// --- COMPONENTES ---

// Componente da Modal de Boas-vindas com efeito de máquina de escrever
const WelcomeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const fullText = "Amor, desde que te conheci no dia 07 de dezembro de 2024, entendi que os pedidos de coração e alma são atendidos. Eu já havia desejado tantas vezes encontrar alguém que valesse a pena, que pudesse me transbordar e que quisesse crescer e lutar junto, e eu sabia que em algum momento eu iria achar, mesmo que ainda demorasse: eu iria achar. E então nosso caminho se cruzou (novamente, pois no longínquo 2016 a gente já havia se conhecido virtualmente), no dia 14 a gente firmou namoro - o que eu confesso que fiquei muito receoso, dado o que já passei e estávamos muito recentes em tudo - e posso dizer que nesses seis meses não tenho dúvida que está sendo o melhor relacionamento que já tive. Já fizemos tantas coisas, conversamos tanto, vimos séries, jogamos, e em nenhum dia nos desentendemos. Conheci sua família e você conheceu a minha, seus pais me acolheram assim como sua irmã, suas tias e por aí vai, fui aceito por todos. Em nenhum momento tivemos qualquer comportamento, fala ou cobrança desnecessária, e isso é um ponto importantíssimo pra mim, pois ressalta a nossa maturidade diante da vida e diante do relacionamento em si. Você já fez tanto por mim e simplesmente eu não tenho como agradecer. Minha vó se foi nesse meio tempo, e você me ajudou tanto até o último momento. Espero honrar isso todos os dias da minha vida. Feliz seis meses, eu te amo!";
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        if (typedText.length < fullText.length) {
            const randomDelay = Math.random() * 50 + 20;
            const timeoutId = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, randomDelay);
            return () => clearTimeout(timeoutId);
        }
    }, [typedText, fullText]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full mx-auto transform transition-all duration-300 scale-95" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-700 font-cursive mb-4">Seis Meses</h2>
                <div className="text-gray-600 leading-relaxed text-left mb-6 min-h-[200px] max-h-[50vh] overflow-y-auto">
                    <p>
                        {typedText}
                        {typedText.length < fullText.length && <span className="inline-block w-0.5 h-5 bg-gray-600 align-bottom animate-blink"></span>}
                    </p>
                </div>
                <div className="text-center">
                    <button onClick={onClose} className="bg-purple-500 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-600 transition-colors duration-300 shadow-lg">Fechar</button>
                </div>
            </div>
        </div>
    );
};

// Componente da Modal de Rolagem de Dado Refatorado
const DiceRollModal: React.FC<{ onFinish: (resultIndex: number) => void; maxNumber: number }> = ({ onFinish, maxNumber }) => {
    const [displayNumber, setDisplayNumber] = useState<number>(1);
    const [isFinished, setIsFinished] = useState(false);
    const finalResultIndex = useRef(Math.floor(Math.random() * maxNumber));

    useEffect(() => {
        let rollInterval: ReturnType<typeof setTimeout>;
        const totalDuration = 3500;
        const slowDownPoint = totalDuration - 1500;

        const startTime = Date.now();

        const roll = () => {
            const elapsedTime = Date.now() - startTime;

            if (elapsedTime >= totalDuration) {
                setDisplayNumber(Math.floor(Math.random() * 100));
                setIsFinished(true);

                if (typeof confetti === 'function') {
                    const origin = { x: 0.5, y: 0.5 };
                    confetti({ particleCount: 150, angle: 90, spread: 180, startVelocity: 70, origin, gravity: 0.7, scalar: 1.2, colors: ['#FFD700', '#FFFFFF', '#E0BBE4'] });
                    confetti({ particleCount: 100, spread: 360, startVelocity: 50, origin, shapes: ['star'], colors: ['#FFD700', '#FFC300', '#FFDA77', '#FFFFFF'] });
                }

                setTimeout(() => onFinish(finalResultIndex.current), 1500);
            } else {
                let delay;
                if (elapsedTime < slowDownPoint) {
                    delay = 50;
                } else {
                    const remainingTime = totalDuration - elapsedTime;
                    delay = 50 + (1 - remainingTime / (totalDuration - slowDownPoint)) * 400;
                }
                setDisplayNumber(Math.floor(Math.random() * 100) + 1);
                rollInterval = setTimeout(roll, delay);
            }
        };

        roll();

        return () => clearTimeout(rollInterval);
    }, [onFinish, maxNumber]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-hidden">
             {/* Emojis de dados a rolar */}
             {!isFinished && Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="absolute text-5xl opacity-0 animate-tumbling-dice"
                     style={{
                        top: `${10 + Math.random() * 80}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animationDuration: `${1 + Math.random() * 0.5}s`,
                        animationDelay: `${Math.random() * 0.5}s`
                     }}
                >🎲</div>
            ))}
             <div className="relative w-48 h-48 flex items-center justify-center animate-dice-roll-container">
               <div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0" className={`absolute inset-0 w-full h-full text-white drop-shadow-xl transition-transform duration-350 ${isFinished ? 'animate-dice-land' : 'animate-dice-spin'}`}>
                    <path fill="white" d="m91.898 52.449h-0.070313l-17.531-2.5117c-0.26172-0.039062-0.44141-0.28125-0.41016-0.53906 0.039062-0.26172 0.28125-0.44141 0.53906-0.41016l16.629 2.3789-20.121-40.59c-0.12109-0.23828-0.019532-0.51953 0.21875-0.64062 0.23828-0.12109 0.51953-0.019531 0.64062 0.21875l20.531 41.41c0.078125 0.16016 0.058593 0.35156-0.039063 0.48828-0.089844 0.12891-0.23828 0.19922-0.39062 0.19922z"/>
                    <path fill="white" d="m30.012 72.039c-0.10156 0-0.19922-0.03125-0.28125-0.089843-0.14062-0.10156-0.21875-0.28125-0.19141-0.44922l6.3086-45.922c0.019532-0.16016 0.12109-0.30078 0.26953-0.37109 0.14844-0.070312 0.32031-0.058593 0.46094 0.03125l38.051 23.828c0.14844 0.089844 0.23047 0.26172 0.21875 0.42969-0.011718 0.17188-0.10938 0.32812-0.26172 0.39844l-44.359 22.09c-0.070312 0.03125-0.14062 0.050781-0.21094 0.050781zm6.6797-45.598-6.0898 44.289 42.781-21.309-36.699-22.98z"/>
                    <path fill="white" d="m30.012 72.039c-0.14844 0-0.28906-0.070312-0.39062-0.19922l-21.902-29.789c-0.078125-0.10938-0.10938-0.25-0.078125-0.37891s0.10938-0.25 0.23047-0.32031l28.219-16.121c0.16016-0.089844 0.35156-0.078125 0.5 0.019531 0.14844 0.10156 0.23047 0.28125 0.21094 0.46094l-6.3086 45.922c-0.03125 0.19141-0.17188 0.35156-0.35938 0.39844-0.039062 0.011719-0.078124 0.011719-0.12109 0.011719zm-21.211-30.129 20.891 28.41 6.0195-43.789z"/>
                    <path fill="white" d="m74.371 49.941c-0.089844 0-0.17969-0.019531-0.25-0.070312l-38.051-23.828c-0.14844-0.089844-0.23828-0.26172-0.21875-0.44141 0.011719-0.17969 0.12109-0.32812 0.28906-0.39844l35.051-15.07c0.14062-0.058593 0.30078-0.050781 0.44141 0.03125 0.12891 0.078126 0.21875 0.21875 0.23047 0.37109l2.9883 38.898c0.011719 0.17969-0.070312 0.35156-0.23047 0.44922-0.078125 0.050782-0.16016 0.070313-0.25 0.070313zm-37.031-24.223 36.469 22.84-2.8711-37.289-33.602 14.449z"/>
                    <path fill="white" d="m69.789 89.91c-0.070312 0-0.12891-0.011718-0.19922-0.039062l-39.789-17.879c-0.17188-0.078126-0.28125-0.23828-0.28125-0.42969s0.10156-0.35156 0.26172-0.44141l44.359-22.102c0.14844-0.078125 0.33984-0.058593 0.48828 0.039063 0.14062 0.10156 0.21875 0.26953 0.19922 0.44922l-4.5703 39.969c-0.019531 0.14844-0.10937 0.28906-0.23828 0.35938-0.070312 0.039062-0.14844 0.058593-0.23828 0.058593zm-38.66-18.371 38.27 17.199 4.3984-38.449-42.672 21.25z"/>
                    <path fill="white" d="m8.1016 42.238c-0.12891 0-0.26172-0.050781-0.35156-0.14844-0.14844-0.16016-0.17188-0.41016-0.039062-0.58984l21.379-31.211c0.10156-0.14062 0.26172-0.23047 0.44141-0.21094 0.17188 0.011719 0.32031 0.12109 0.39062 0.28125l6.8281 15.07c0.10156 0.23047 0.019531 0.48828-0.19922 0.60937l-28.219 16.121c-0.070312 0.039063-0.16016 0.058594-0.23828 0.058594zm21.297-30.699-19.73 28.781 26.031-14.871-6.3008-13.898z"/>
                    <path fill="white" d="m69.789 89.91h-0.078124l-45.602-8.0781c-0.14844-0.03125-0.28906-0.12891-0.35156-0.26953-0.070312-0.14062-0.058593-0.30859 0.019532-0.44141l5.8086-9.8008c0.12109-0.21094 0.37891-0.28906 0.60937-0.19141l39.789 17.879c0.21875 0.10156 0.32812 0.35156 0.26172 0.57813-0.058594 0.19922-0.25 0.33984-0.46094 0.33984zm-44.828-8.8984 41.121 7.2891-35.879-16.121-5.2383 8.8398z"/>
                    <path fill="white" d="m36.32 26.121c-0.17969 0-0.35937-0.10156-0.44141-0.28125l-6.8281-15.07c-0.070312-0.14844-0.050781-0.32031 0.03125-0.46094 0.089844-0.14062 0.23828-0.21875 0.39844-0.21875h41.879c0.23047 0 0.42188 0.16016 0.46875 0.37891 0.050781 0.21875-0.070313 0.44922-0.28125 0.53906l-35.051 15.07c-0.058594 0.03125-0.12891 0.039063-0.19141 0.039063zm-6.0898-15.082 6.3281 13.969 32.488-13.969z"/>
                    <path fill="white" d="m24.199 81.84h-0.039063c-0.17969-0.011719-0.33984-0.12891-0.41016-0.30078l-16.09-39.598c-0.089844-0.21875 0-0.48047 0.21094-0.60156 0.21094-0.12109 0.48047-0.058594 0.62109 0.12891l21.91 29.801c0.10938 0.14844 0.12109 0.35938 0.03125 0.53125l-5.8086 9.8008c-0.089844 0.14844-0.23828 0.23047-0.41016 0.23047zm-14.211-36.699 14.289 35.148 5.1602-8.6992z"/>
                    <path fill="white" d="m69.789 89.91c-0.050781 0-0.10156 0-0.14844-0.03125-0.21094-0.070312-0.35156-0.28125-0.32031-0.51172l4.5703-39.969c0.011719-0.12891 0.078125-0.25 0.17969-0.32031 0.10156-0.070313 0.23047-0.10938 0.35938-0.089844l17.531 2.5117c0.16016 0.019531 0.28906 0.12109 0.35937 0.26953 0.070313 0.14062 0.058594 0.30859-0.019531 0.44922l-22.109 37.461c-0.089844 0.14844-0.25 0.23828-0.41016 0.23828zm5-39.898-4.2617 37.25 20.602-34.91z"/>
                    <path fill="white" d="m41.301 59.012c-0.12109 0-0.23047-0.039063-0.32031-0.12109-0.14844-0.14062-0.19922-0.35938-0.10938-0.55078 0.019531-0.050782 2.1602-4.75 1.9297-7.7383-0.14062-1.8398-0.80859-3.25-1.7812-3.7891-0.64062-0.35156-1.3789-0.30859-2.2188 0.12891-2.3008 1.2109-1.1992 3.8984-1.1602 4.0117 0.10156 0.23828-0.011719 0.51953-0.25 0.62891s-0.51953-0.011719-0.62891-0.25c-0.53125-1.2383-0.87891-3.9414 1.5898-5.2305 1.4219-0.75 2.4805-0.48047 3.1289-0.12109 1.25 0.69141 2.1016 2.3984 2.2695 4.5508 0.17188 2.2305-0.80859 5.1992-1.4609 6.8906l7.1484-4.1602c0.23047-0.14062 0.51953-0.058594 0.64844 0.17188 0.12891 0.23047 0.058593 0.51953-0.17188 0.64844l-8.3789 4.8789c-0.070312 0.039062-0.16016 0.070312-0.23828 0.070312z"/>
                    <path fill="white" d="m53.078 51.891c-2.1914 0-4.5117-1.4492-5.4688-2.9805-1.0703-1.6992-1.4297-4.0117-0.92188-5.8906 0.32031-1.1914 0.94922-2.0508 1.8086-2.5117 2.2188-1.1602 6 0 7.8711 3.5312 1.5391 2.9219 1.0781 5.8984-1.1094 7.2617-0.66016 0.41016-1.4102 0.58984-2.1719 0.58984zm-4.1367-10.531c-0.78906 0.41016-1.1602 1.2695-1.3281 1.9102-0.42969 1.6094-0.10938 3.6719 0.80859 5.1289 1.1992 1.9102 4.4219 3.2695 6.3281 2.0898 2.0508-1.2695 1.8711-3.9297 0.76953-6-1.5586-2.9492-4.7617-4.0781-6.5781-3.1289z"/>
                    <path fill="white" d="m54.02 31.379c-0.089843 0-0.17969-0.03125-0.26953-0.078125-0.21875-0.14844-0.28125-0.44141-0.12891-0.66016l6.1406-9.1797-2.6289 0.64844c-0.26172 0.058594-0.51953-0.089844-0.57812-0.35156-0.058594-0.26172 0.089843-0.51953 0.35156-0.57812l3.8281-0.94922c0.19141-0.050781 0.39062 0.03125 0.51172 0.19141 0.10938 0.16016 0.12109 0.37891 0 0.53906l-6.8203 10.211c-0.089843 0.14062-0.23828 0.21094-0.39844 0.21094z"/>
                    <path fill="white" d="m61.859 35.781c-0.078125 0-0.17188-0.019531-0.25-0.070312-0.23047-0.14063-0.30078-0.42969-0.16016-0.66016l3.4688-5.7109-3.3281-2.3203c-0.16016-0.10938-0.23047-0.30078-0.19922-0.48828 0.039063-0.19141 0.17969-0.32812 0.37109-0.37109l6.0312-1.2617c0.17969-0.039063 0.37891 0.039062 0.48828 0.19141 0.10938 0.14844 0.12109 0.35938 0.019531 0.51953l-2.1016 3.4492 2.5117 1.75c0.21875 0.14844 0.26953 0.44922 0.12109 0.67188-0.14844 0.21875-0.44922 0.26953-0.67188 0.12109l-2.4609-1.7109-3.4297 5.6484c-0.089843 0.14844-0.25 0.23047-0.41016 0.23047zm1.1914-8.9023 2.3711 1.6484 1.4883-2.4609-3.8594 0.80859z"/>
                    <path fill="white" d="m49.199 17.73s-0.089844 0-0.14062-0.019531l-7.3398-2.2383-2.8711 1.8008c-0.10938 0.070312-0.25 0.089843-0.37891 0.058593-0.12891-0.039062-0.23828-0.12109-0.30078-0.23828l-1.7617-3.3789c-0.089844-0.17188-0.070312-0.37891 0.058594-0.53125 0.12109-0.14844 0.32031-0.21094 0.51172-0.14844l4.6016 1.3984 3.3398-2.1016c0.21875-0.14062 0.51953-0.070312 0.66016 0.14844s0.070313 0.51953-0.14844 0.66016l-2.6406 1.6602 6.5508 2c0.25 0.078125 0.39062 0.33984 0.32031 0.60156-0.058594 0.21094-0.25 0.33984-0.46094 0.33984zm-11.41-3.4609 0.98828 1.9102 1.7305-1.0898-2.7188-0.82812z"/>
                    <path fill="white" d="m21.012 31.34c-0.058594 0-0.10938 0-0.17188-0.03125-0.25-0.089844-0.37109-0.37109-0.28125-0.60938l2.4297-6.5703-0.17188 0.23047c-0.16016 0.21094-0.44922 0.26172-0.67188 0.10938-0.21094-0.14844-0.26172-0.44922-0.10938-0.67188l2.2188-3.0586c0.14062-0.19141 0.39844-0.25 0.60938-0.14062 0.21094 0.10938 0.30859 0.35938 0.21875 0.58984l-3.6406 9.8516c-0.070312 0.19141-0.25 0.30859-0.44922 0.30859z"/>
                    <path fill="white" d="m26.25 28.48c-0.32812 0-0.62891-0.10938-0.87891-0.32812-0.42969-0.37109-0.66016-1.0117-0.66016-1.8008 0-1.1016 0.60937-1.9219 1.3086-2.6211-0.32812-0.30859-0.57812-0.76953-0.57812-1.5312 0-1.2305 1.3086-2.8789 2.1602-3.0312 0.42188-0.070313 0.76953 0 1.0312 0.21875 0.35156 0.30078 0.51172 0.82031 0.51172 1.7109 0 0.98828-0.71875 1.7383-1.4883 2.4297 0.60938 0.26953 1.2891 0.71094 1.3398 1.8906 0.058594 1.4492-1.0703 2.8086-2.5312 3.0312-0.070313 0.011719-0.14844 0.019531-0.21875 0.019531zm0.62109-4.2422c-0.67188 0.62891-1.1992 1.2695-1.1992 2.1094 0 0.5 0.12109 0.89844 0.32812 1.0781 0.089844 0.078125 0.19922 0.10938 0.32812 0.089844 0.94922-0.14062 1.75-1.1016 1.7109-2.0391-0.03125-0.76172-0.39844-0.91016-1.0117-1.1602-0.050782-0.019531-0.10156-0.039062-0.14844-0.058594zm1.0391-4.1289s-0.089844 0-0.14062 0.011719c-0.32031 0.058594-1.3711 1.25-1.3711 2.0898 0 0.44922 0.12109 0.69922 0.32812 0.87109 0.011719 0 0.019532-0.019531 0.03125-0.03125 0.73047-0.64844 1.4297-1.2695 1.4297-1.9492 0-0.78906-0.14062-0.94922-0.17188-0.96875-0.019531-0.019531-0.058594-0.019531-0.10938-0.019531zm-1.9883 2.1016z"/>
                    <path fill="white" d="m27.141 53.121c-0.17188 0-0.32031-0.089844-0.41016-0.23047-0.039063-0.058594-3.8008-6.2891-5.5117-8.7617-0.64844-0.92969-1.3789-1.3789-2.0117-1.2305-0.64062 0.16016-1.1484 0.92969-1.2812 1.9688-0.26172 1.9883 1.7695 2.3281 1.8594 2.3516 0.26172 0.039062 0.44141 0.28906 0.39844 0.55078-0.039063 0.26172-0.28906 0.44141-0.55078 0.39844-1.0508-0.17188-2.9609-1.0898-2.6602-3.4102 0.19141-1.4609 0.96094-2.5195 2-2.7695 1.0391-0.25 2.1406 0.33984 3.0195 1.6094 1.2695 1.8398 3.6484 5.7109 4.8398 7.6484l1.3398-10.281c0.03125-0.26172 0.26953-0.44922 0.53906-0.41016 0.26172 0.03125 0.44922 0.26953 0.41016 0.53906l-1.5117 11.629c-0.03125 0.19922-0.17969 0.35938-0.37891 0.41016-0.03125 0-0.070313 0.011719-0.10156 0.011719z"/>
                    <path fill="white" d="m61.199 80.711c-1.6484 0-2.8516-1.0312-3.5117-2.25-0.76953-1.4219-0.12891-2.9688 0.73828-4.5117-1.8398-0.039063-3.6797-0.32031-4.7188-1.8008-0.82031-1.1719-1.1406-2.4297-0.89062-3.5703 0.23047-1.0586 0.92969-1.9492 2.0391-2.6016 1.3086-0.76172 2.5898-1.0117 3.6992-0.69922 1.0586 0.28906 1.9297 1.0391 2.6016 2.25 0.98828 1.7695 0.019531 3.6406-1.0586 5.4688 1.9883-0.019532 3.8516 0.039062 4.7695 1.3711 0.53906 0.78125 0.94141 2.1289 0.62109 3.3906-0.25 1.0117-0.92969 1.8203-1.9609 2.3398-0.85156 0.42969-1.6289 0.62109-2.3281 0.62109zm-1.6797-6.7617c-0.89062 1.5117-1.6094 2.9219-1 4.0508 0.46094 0.83984 1.8086 2.6406 4.5781 1.2383 0.78906-0.39844 1.2812-0.98047 1.4688-1.7188 0.23828-0.96875-0.078125-2.0312-0.48047-2.6094-0.69141-0.98828-2.4414-0.96875-4.3008-0.96094h-0.26172zm-1.9414-7.8398c-0.85156 0-1.6602 0.35938-2.25 0.69922-0.87891 0.51172-1.4102 1.1797-1.5781 1.9805-0.19141 0.87109 0.070312 1.8711 0.73828 2.8086 0.87891 1.25 2.6602 1.3984 4.4883 1.3984 0-0.019532 0.019532-0.03125 0.03125-0.050782 1.0898-1.8086 2.1094-3.5312 1.3086-4.9609-0.53906-0.96875-1.2188-1.5703-2.0195-1.7891-0.23828-0.070312-0.48047-0.089843-0.71875-0.089843z"/>
                    <path fill="white" d="m84.359 45.398c-0.89844 0-2.1211-1.0781-3.5-2.3906-0.26172-0.25-0.46875-0.44922-0.60938-0.55859-0.19922-0.17188-0.23047-0.46875-0.070312-0.67188 0.17187-0.19922 0.46875-0.23047 0.67187-0.070313 0.14844 0.12891 0.37891 0.33984 0.66016 0.60938 1.5703 1.4883 2.5312 2.1992 2.8516 2.1289 0.26172-0.92187-1.8516-5.5508-3.5781-8.6914 0.011719 0.60938-0.039062 1.2891-0.21094 2-0.5 2-1.2695 2.1992-2.1602 2.2305h-0.12109c-0.51172 0.019531-1.0117-0.23047-1.4609-0.75-0.82812-0.94922-1.4805-2.8203-1.0898-4.8516 0.32031-1.6406 0.78125-2.5117 1.5195-2.8203 0.76953-0.32812 1.5781 0.10156 2.1211 0.44922 0.17188 0.10938 0.44141 0.42969 0.76172 0.89844 0.058594 0.050782 0.10938 0.10938 0.14062 0.19141 0 0.011719 0 0.019532 0.019532 0.039063 1.8984 2.8281 5.4492 9.9297 4.9883 11.512-0.14844 0.5-0.48828 0.66016-0.67969 0.71094-0.078125 0.019531-0.17188 0.03125-0.26172 0.03125zm-6.5078-13c-0.078124 0-0.14844 0.011718-0.21094 0.039062-0.26953 0.12109-0.66016 0.57812-0.94922 2.1211-0.32812 1.7109 0.21875 3.2891 0.87891 4.0391 0.23828 0.28125 0.5 0.44141 0.69141 0.42969h0.12891c0.57031-0.03125 0.91016-0.039063 1.2812-1.5117 0.53125-2.1211-0.21875-3.9805-0.25-4.0586 0-0.011719-0.011719-0.03125-0.019531-0.039062-0.21875-0.30859-0.39844-0.51953-0.53125-0.60156-0.42188-0.26953-0.76172-0.41016-1.0117-0.41016z"/>
                    <path fill="white" d="m76.211 60.719c-0.17969 0-0.33984-0.10156-0.42969-0.26953-0.12109-0.23828-0.019531-0.51953 0.21875-0.64062l7.7109-3.8203-0.82813-0.14844c-0.26172-0.050782-0.42969-0.30078-0.39062-0.55859 0.050781-0.26172 0.30078-0.42969 0.55859-0.39062l2.25 0.41016c0.19922 0.039063 0.35938 0.19922 0.39062 0.39844s-0.078125 0.39844-0.26172 0.5l-9.0117 4.4609c-0.070313 0.03125-0.14062 0.050782-0.21094 0.050782z"/>
                    <path fill="white" d="m78.859 68.77c-0.089844 0-0.17969 0-0.26953-0.019531-1.2305-0.14844-2.2891-1.2305-2.4688-2.5195-0.23828-1.6797 0.55078-4.0586 2.2617-4.9688 0.050782-0.03125 0.21094-0.14062 0.42188-0.28125 3.8086-2.5703 5.6016-3.3203 6.3906-2.6719 0.12109 0.10156 0.28125 0.28906 0.30078 0.62109 0.078125 0.96094-1.0781 2.7109-1.5508 3.2383-0.17969 0.19922-0.48047 0.21094-0.67969 0.039062-0.19922-0.17969-0.21875-0.48047-0.039063-0.67969 0.62891-0.71094 1.3984-2.2109 1.3086-2.5508-0.10938-0.011718-0.87891-0.050781-4.4297 2.2812 0.44922 0.21875 0.78125 0.62109 0.98828 1.1914 0.42188 1.1406 0.67969 2.5117-0.23828 4.8086-0.37891 0.96094-1.1211 1.5-2.0117 1.5zm-0.050781-6.6484c-1.3789 0.75-1.9102 2.8281-1.7383 3.9805 0.14063 0.96094 0.94141 1.6211 1.6406 1.6992 0.57812 0.070313 1.0117-0.23828 1.2695-0.89062 0.83984-2.1016 0.55859-3.2305 0.23047-4.1289-0.12891-0.35156-0.30859-0.57812-0.55078-0.67969-0.35938-0.16016-0.76953-0.011718-0.83984 0.011719z"/>
                    <path fill="white" d="m34.441 80.672c-1.1211 0-2.1914-0.25-2.5-1.0703-0.14844-0.42187-0.078125-0.92969 0.23047-1.4883 0.48828-0.91016 1.6211-1.9609 2.8281-2.2305 1.0195-0.23047 2.9492-0.12109 3.8008 1.1484 0.33984 0.51172 0.42188 1.0898 0.23047 1.6484-0.26172 0.73047-0.94922 1.3008-1.9492 1.6211-0.55859 0.17188-1.6211 0.37891-2.6406 0.37891zm1.4883-3.9336c-0.26953 0-0.51953 0.03125-0.73047 0.070313-0.87891 0.19922-1.8086 1.0508-2.1914 1.75-0.19141 0.35156-0.21094 0.58984-0.17187 0.69922 0.21875 0.60156 2.4883 0.57031 3.9609 0.10938 0.69141-0.21875 1.1797-0.58984 1.3281-1.0195 0.089844-0.26953 0.050781-0.53906-0.12109-0.80078-0.41016-0.60156-1.3086-0.82031-2.0703-0.82031zm-0.82813-0.38672z"/>
                    <path fill="white" d="m24.859 76.238h-0.050781c-0.23828-0.019531-0.42188-0.21875-0.42969-0.46094l-0.26172-7.2812c0-0.26172 0.19922-0.48828 0.46094-0.48828 0.25 0 0.48828 0.19922 0.48828 0.46094l0.16016 4.5586c0.078126-0.03125 0.17188-0.03125 0.26172-0.011719 0.26172 0.058594 0.42188 0.32031 0.35938 0.57031l-0.53125 2.2812c-0.050781 0.21875-0.25 0.37109-0.46094 0.37109z"/>
                    <path fill="white" d="m22.59 72.262c-1.3516 0-1.9102-1.8984-1.9492-3.1094-0.050781-1.4492 0.67969-3.3789 1.1719-4.2812l-3.3398-4.2305c-0.16016-0.21094-0.12891-0.51172 0.078125-0.67188 0.21094-0.16016 0.51172-0.12891 0.67188 0.078125l3.5312 4.4688c0.12891 0.17188 0.14062 0.41016 0 0.57812-0.19141 0.32031-1.2188 2.3984-1.1719 4.0195 0.03125 0.87109 0.44141 2.1797 1 2.1797 0.12891-0.12891 0.21875-1.0117 0.14062-1.8086-0.03125-0.26172 0.16016-0.5 0.42969-0.51953 0.26172-0.03125 0.5 0.16016 0.53125 0.42188 0.050781 0.44141 0.14844 1.9219-0.41016 2.5508-0.17969 0.19922-0.41016 0.30859-0.67188 0.30859h-0.011718z"/>
                    <path fill="white" d="m34.621 81.988c-0.26172 0-0.46875-0.21094-0.48047-0.46875 0-0.26172 0.21094-0.48047 0.46875-0.48828l9.8711-0.17969c0.25-0.019531 0.48047 0.21094 0.48828 0.46875 0 0.26172-0.21094 0.48047-0.46875 0.48828l-9.8711 0.17969z"/>
                    <path fill="white" d="m37.852 82.469h-0.070312l-3.2305-0.48828c-0.26172-0.039063-0.44141-0.28125-0.39844-0.53906 0.039062-0.26172 0.28125-0.44141 0.53906-0.39844l3.2305 0.48828c0.26172 0.039062 0.44141 0.28125 0.39844 0.53906-0.039062 0.23828-0.23828 0.41016-0.46875 0.41016z"/>
                   </svg>
                                  </div>
                <div className={`absolute inset-0 flex items-center justify-center text-7xl font-bold text-white transition-transform duration-350 ${isFinished ? 'animate-number-reveal' : ''}`}>
                    +{displayNumber}
                </div>
            </div>
        </div>
    );
}

// Componente para o ícone de cada atributo
const AttributeIcon: React.FC<{ attribute: Attribute; className?: string }> = ({ attribute, className = '' }) => {
    const icons: Record<Attribute, React.ReactNode> = {
        Romance: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
        Aventura: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/><path d="M14.24 7.53l-2.07-2.07c-.45-.45-1.23-.39-1.63.13l-4.5 6c-.33.44-.22 1.07.22 1.39l2.07 2.07c.45.45 1.23.39 1.63-.13l4.5-6c.33-.44.22-1.07-.22-1.39z"/></svg>,
        Companheirismo: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}><path d="M19.5 10c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm-5 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm-5 0c-1.38 0-2.5-1.12-2.5-2.5S8.12 5 9.5 5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM4.5 10c-1.38 0-2.5-1.12-2.5-2.5S3.12 5 4.5 5 7 6.12 7 7.5 5.88 10 4.5 10zm0 4h15v10H4.5z"/></svg>,
        Sincronia: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${className}`}><path d="M19 8h-1V6h-2v2h-2v2h2v2h2V10h1zM4 11H2V9h2V7h2v2h2v2H6v2H4zM15 4h-2v2h2zm-4 0h-2v2h2zm-4 0H5v2h2zm12 11h2v-2h-2v-2h-2v2h-2v2h2z"/></svg>
    };
    return icons[attribute];
};

// Componente para a "Ficha de Aventura" do casal
const CoupleStats: React.FC<{ memories: Memory[] }> = ({ memories }) => {
    const stats = memories.reduce((acc, memory) => {
        acc[memory.attribute] = (acc[memory.attribute] || 0) + 1;
        return acc;
    }, {} as Record<Attribute, number>);

    return (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30 container mx-auto mb-12 animate-fade-in-slow">
            <h3 className="text-2xl font-cursive text-white text-center mb-4 drop-shadow-lg">Ficha de Aventura</h3>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
                <div className="text-center">
                    <span className="text-4xl font-bold text-white drop-shadow-md">{memories.length}</span>
                    <p className="text-sm text-white/80 uppercase tracking-wider">Nível do Casal</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
                    { (['Romance', 'Aventura', 'Companheirismo', 'Sincronia'] as Attribute[]).map(attr => (
                        <div key={attr} className="flex items-center gap-2">
                             <AttributeIcon attribute={attr} className="text-white drop-shadow-lg"/>
                             <div>
                                <span className="font-bold text-lg text-white drop-shadow-md">{stats[attr] || 0}</span>
                                <p className="text-xs text-white/80">{attr}</p>
                             </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}

// Componente genérico para os ícones flutuantes
const FloatingIcon: React.FC<{ type: 'd20' | 'd6' | 'cat' | 'fridge' | 'octopus'; top?: string; left?: string; right?: string; bottom?: string; rotation: string; size: string; animationDelay?: string }> = ({ type, top, left, right, bottom, rotation, size, animationDelay = '0s' }) => {
    const iconSvg: Record<typeof type, React.ReactNode> = {
        d20: (
            <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-lg" style={{ opacity: "0.4" }}>
                <g stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M50 10 L93.3 35 L93.3 75 L50 90 L6.7 75 L6.7 35 Z" />
                    <path d="M50 10 L50 50" /><path d="M6.7 35 L50 50" /><path d="M93.3 35 L50 50" />
                </g>
            </svg>
        ),
        d6: (
            <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-lg" style={{ opacity: "0.3" }}>
                <g fill="currentColor"><rect x="10" y="10" width="80" height="80" rx="15" stroke="currentColor" strokeWidth="4" fill="none"/><circle cx="30" cy="30" r="8"/><circle cx="70" cy="30" r="8"/><circle cx="30" cy="70" r="8"/><circle cx="70" cy="70" r="8"/><circle cx="50" cy="50" r="8"/></g>
            </svg>
        ),
        cat: (
            <svg viewBox="0 0 24 24" className="w-full h-full text-white drop-shadow-lg" fill="currentColor" style={{ opacity: "0.35" }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" clipRule="evenodd" fillRule="evenodd"/>
                <path d="M15.5 4.5c-1 0-1.9.4-2.6.9l-1 1-1-1c-.7-.5-1.6-.9-2.6-.9-1.9 0-3.5 1.6-3.5 3.5 0 .9.3 1.7.9 2.4l1.1 1.1 6.1 6.1 6.1-6.1 1.1-1.1c.6-.7.9-1.5.9-2.4 0-1.9-1.6-3.5-3.5-3.5zM4 13.5V22h16v-8.5l-8 8-8-8z"/>
            </svg>
        ),
        fridge: (
            <svg viewBox="0 0 24 24" className="w-full h-full text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: "0.4" }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h14M8 6h1M8 14h1"/>
            </svg>
        ),
        octopus: (
             <svg viewBox="0 0 24 24" className="w-full h-full text-white drop-shadow-lg" fill="currentColor" style={{ opacity: "0.35" }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8 11h8v2H8zm-3.5-1c.83 0 1.5.67 1.5 1.5S5.33 13 4.5 13 3 12.33 3 11.5 3.67 10 4.5 10zm15 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM12 16c-2.67 0-5.18-1.04-7.07-2.93l-1.41 1.41C5.68 16.66 8.61 18 12 18s6.32-1.34 8.48-3.52l-1.41-1.41C17.18 14.96 14.67 16 12 16z"/>
            </svg>
        ),
    };

    return (
        <div className="absolute z-10 animate-float pointer-events-none" style={{ top, left, right, bottom, width: size, height: size, animationDelay }}>
            <div className="w-full h-full" style={{ transform: `rotate(${rotation})` }}>
                {iconSvg[type]}
            </div>
        </div>
    );
};


// Componente para o Cartão de Memória
const MemoryCard: React.FC<{ memory: Memory; rotationClass: string; animationIndex: number; isFlipped: boolean; onFlip: () => void; }> = ({ memory, rotationClass, animationIndex, isFlipped, onFlip }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prevIsFlipped = useRef(isFlipped);

  useEffect(() => {
    // Animação de confete e estrelas ao virar
    if (isFlipped && !prevIsFlipped.current) {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, shapes: ['heart', 'star'], colors: ['#E0BBE4', '#D291BC', '#957DAD', '#FEC8D8', '#FFFFFF'] });
            confetti({ particleCount: 50, spread: 120, startVelocity: 40, origin: { y: 0.5 }, shapes: ['heart', 'star'], colors: ['#FFD700', '#FFC300', '#FFDA77', '#FFFFFF'] });
        }
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    prevIsFlipped.current = isFlipped;
  }, [isFlipped]);


  return (
    <div ref={cardRef} className={`w-full h-[520px] rounded-2xl cursor-pointer perspective-1000 group ${rotationClass} animate-card-entry transition-transform duration-500 ease-out hover:scale-105 hover:z-30 hover:!rotate-0`} style={{ maxWidth: '350px', animationDelay: `${animationIndex * 150}ms` }} onClick={onFlip}>
      <div className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:shadow-black/30 transition-shadow duration-300 ease-in-out bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center p-4 border-20 border-white/50">
            <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/70 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                <p className="text-white font-semibold mt-4 text-lg font-cursive">Vire-me</p>
            </div>
             <div className="absolute top-0 left-0 w-full h-full bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
        </div>
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 overflow-hidden rounded-2xl bg-purple-50 flex flex-col border-[10px] border-purple-200 ${isFlipped ? 'shadow-2xl shadow-purple-300/50' : 'shadow-lg' } transition-shadow duration-300`}>
            <div className="relative w-full h-2.5/5">
                <img src={memory.imageUrl} alt={memory.title} className="w-full" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=Imagem+Inválida'; }} />
                {memory.emoji && (
                     <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm p-2 rounded-lg text-2xl">
                        {memory.emoji}
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between items-center text-center overflow-hidden">
                <h3 className="text-2xl font-bold text-purple-800 mb-2 font-cursive">{memory.title.replace(memory.emoji || '', '')}</h3>
                <p className="text-gray-700 leading-relaxed text-sm mb-2">{memory.description}</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-200 text-purple-800`}>
                   <AttributeIcon attribute={memory.attribute} className="w-4 h-4" />
                   +1 {memory.attribute}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// Componente para o Contador de Tempo
const TimeCounter: React.FC = () => {
    const [time, setTime] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [title, setTitle] = useState('');
    const targetDate = new Date('2024-12-14T18:30:00');
    const unitLabels: { [key: string]: string } = { months: 'Meses', days: 'Dias', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' };
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const isFuture = targetDate.getTime() > now.getTime();
            const d1 = isFuture ? now : targetDate;
            const d2 = isFuture ? targetDate : now;
            setTitle(isFuture ? "Contagem Regressiva Para o Nosso Dia" : "Nosso Infinito Particular");
            let years = d2.getFullYear() - d1.getFullYear();
            let months = d2.getMonth() - d1.getMonth();
            let days = d2.getDate() - d1.getDate();
            let hours = d2.getHours() - d1.getHours();
            let minutes = d2.getMinutes() - d1.getMinutes();
            let seconds = d2.getSeconds() - d1.getSeconds();
            if (seconds < 0) { seconds += 60; minutes--; }
            if (minutes < 0) { minutes += 60; hours--; }
            if (hours < 0) { hours += 24; days--; }
            if (days < 0) { months--; days += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
            if (months < 0) { months += 12; years--; }
            setTime({ months: years * 12 + months, days, hours, minutes, seconds });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl md:text-3xl font-cursive mb-4 drop-shadow-lg">{title}</h2>
        <div className="flex justify-center items-center space-x-2 md:space-x-2 flex-wrap">
          {Object.entries(time).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center bg-white/30 backdrop-blur-sm p-2 rounded-lg shadow-md min-w-[50px] md:min-w-[70px]">
              <span className="text-2xl md:text-4xl font-bold">{String(value).padStart(2, '0')}</span>
              <span className="text-xs uppercase tracking-wider">{unitLabels[unit as keyof typeof unitLabels]}</span>
            </div>
          ))}
        </div>
      </div>
    );
};


// --- PÁGINA PRINCIPAL ---
const MemoriesPage: NextPage = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const rotations = ['-rotate-2', 'rotate-1', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3'];

  useEffect(() => {
    const shuffled = [...initialMemories].sort(() => Math.random() - 0.5);
    setMemories(shuffled);
  }, []);

  const handleCloseModal = () => {
      setIsWelcomeModalOpen(false);
      setShowContent(true);
  };

  const handleCardFlip = (cardId: number) => {
    setFlippedCards(prev =>
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  const handleCloseAllCards = () => {
      setFlippedCards([]);
  };

  const handleRollDice = () => {
    const closedCards = memories.filter(m => !flippedCards.includes(m.id));
    if (closedCards.length === 0) {
        alert('Todas as memórias já foram reveladas! Feche algumas para rolar o dado novamente.');
        return;
    }
    if (isRolling) return;
    setIsRolling(true);
  };

  const handleRollFinish = (resultIndex: number) => {
    const closedCards = memories.filter(m => !flippedCards.includes(m.id));
    const selectedCard = closedCards[resultIndex];
    if (selectedCard) {
      handleCardFlip(selectedCard.id);
    }
    setIsRolling(false);
  };

  const allCardsFlipped = memories.length > 0 && flippedCards.length === memories.length;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Inter:wght@400;600;700&display=swap');
        .font-cursive { font-family: 'Pacifico', cursive; }
        body { font-family: 'Inter', sans-serif; ${isWelcomeModalOpen || isRolling ? 'overflow: hidden;' : ''} }
        .wood-background { background-image: url('https://cdn.pixabay.com/photo/2017/02/07/09/02/wood-2045379_640.jpg'); background-size: cover; background-color: #6B4F3A; background-attachment: fixed; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes cardEntry {
            from { opacity: 0; transform: translateY(-120%) rotate(var(--tw-rotate)); }
            to { opacity: 1; transform: translateY(0) rotate(var(--tw-rotate)); }
        }
        .animate-card-entry { opacity: 0; animation: cardEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-slow { animation: fadeIn 1.5s ease-in-out; }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes dice-roll-container-anim {
            0% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
        }
        .animate-dice-roll-container {
            animation: dice-roll-container-anim 0.3s ease-out forwards;
        }

        @keyframes dice-spin {
            0% { transform: scale(1.4);}
            50% { transform: rotate(180deg) scale(1.8); }
            100% { transform: rotate(360deg) scale(1); }
        }
        .animate-dice-spin {
            animation: dice-spin 1s linear infinite both;
        }

        @keyframes number-reveal {
            0% { transform: scale(1); }
            50% { transform: scale(1.8); text-shadow: 0 0 25px #fff, 0 0 40px #FFD700; }
            100% { transform: scale(1); }
        }
        .animate-number-reveal {
            animation: number-reveal 0.5s ease-out;
        }
        @keyframes tumbling-dice {
          0% {
            opacity: 0;
            transform: translateY(-200%) rotate(-720deg);
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(200%) rotate(720deg);
          }
        }
        .animate-tumbling-dice {
            animation: tumbling-dice ease-in-out infinite;
        }
      `}</style>

      {isWelcomeModalOpen && <WelcomeModal onClose={handleCloseModal} />}
      {isRolling && <DiceRollModal onFinish={handleRollFinish} maxNumber={memories.filter(m => !flippedCards.includes(m.id)).length} />}

      <main className="relative min-h-screen p-4 sm:p-8 wood-background overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
            {showContent && (
                <>
                    <FloatingIcon type="d20" top="10%" left="5%" rotation="15deg" size="80px" animationDelay="0s" />
                    <FloatingIcon type="d6" top="75%" left="8%" rotation="-25deg" size="50px" animationDelay="0.5s"/>
                    <FloatingIcon type="d20" top="15%" right="3%" rotation="-10deg" size="65px" animationDelay="0.2s"/>
                    <FloatingIcon type="d6" bottom="5%" right="8%" rotation="20deg" size="90px" animationDelay="0.8s"/>
                    <FloatingIcon type="d20" bottom="25%" right="45%" rotation="5deg" size="40px" animationDelay="1s"/>
                    <FloatingIcon type="cat" top="30%" left="15%" rotation="-5deg" size="70px" animationDelay="0.4s"/>
                    <FloatingIcon type="fridge" top="60%" right="12%" rotation="10deg" size="60px" animationDelay="0.6s"/>
                    <FloatingIcon type="cat" bottom="15%" left="40%" rotation="8deg" size="55px" animationDelay="1.2s"/>
                    <FloatingIcon type="octopus" top="40%" right="20%" rotation="-15deg" size="75px" animationDelay="0.3s"/>
                </>
            )}
        </div>

        <div className="relative z-20">
            <header className="py-8 text-center">
              <TimeCounter />
            </header>

            {showContent && (
              <>
                <div className="container mx-auto">
                    <CoupleStats memories={memories} />
                    <div className="flex justify-center items-center gap-4 mb-10">
                        <button onClick={handleRollDice} disabled={isRolling || allCardsFlipped} className="bg-white/90 text-purple-800 font-bold py-3 px-8 rounded-full hover:bg-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                             🎲 Rolar o Dado da Sorte
                        </button>
                        <button onClick={handleCloseAllCards} disabled={isRolling || flippedCards.length === 0} className="bg-white/90 text-purple-800 font-bold py-3 px-8 rounded-full hover:bg-white transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                             🔄 Fechar Todos
                        </button>
                    </div>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                  {memories.map((memory, index) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      rotationClass={rotations[index % rotations.length]}
                      animationIndex={index}
                      isFlipped={flippedCards.includes(memory.id)}
                      onFlip={() => handleCardFlip(memory.id)}
                    />
                  ))}
                </section>
              </>
            )}

            <footer className="text-center py-10 mt-10 text-white/90 drop-shadow-md">
               <p>Feito com amor, para o amor.</p>
               <p className="font-cursive text-2xl mt-2">❤️</p>
            </footer>
        </div>
      </main>
    </>
  );
};

export default MemoriesPage;
