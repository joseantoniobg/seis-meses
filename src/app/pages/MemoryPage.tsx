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
                setDisplayNumber(Math.floor(Math.random() * 1000));
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
                setDisplayNumber(Math.floor(Math.random() * 10000) + 1);
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
                <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full text-white drop-shadow-xl transition-transform duration-300 ${isFinished ? 'animate-dice-land' : 'animate-dice-spin'}`}>
                    <polygon points="50,5 95,35 95,75 50,95 5,75 5,35" stroke="currentColor" strokeWidth="3" fill="rgba(255, 255, 255, 0.1)" />
                </svg>
                <div className={`absolute inset-0 flex items-center justify-center text-7xl font-bold text-white transition-transform duration-300 ${isFinished ? 'animate-number-reveal' : ''}`}>
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
            from { transform: rotate(0deg); }
            to { transform: rotate(1080deg); }
        }
        .animate-dice-spin {
            animation: dice-spin 2s linear;
        }

        @keyframes number-reveal {
            0% { transform: scale(1); }
            50% { transform: scale(1.5); text-shadow: 0 0 25px #fff, 0 0 40px #FFD700; }
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
