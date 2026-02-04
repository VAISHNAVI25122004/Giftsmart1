import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function AIConcierge() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi! I\'m your standard AI Gift Concierge. Tell me who you are shopping for, the occasion, and your budget!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
            if (!apiKey) {
                throw new Error('API Key missing');
            }

            // Create a context string from products
            const productContext = MOCK_PRODUCTS.map(p =>
                `- ${p.title} (ID: ${p.id}): ₹${p.price}. ${p.description}`
            ).join('\n');

            const systemPrompt = `You are a helpful Gift Concierge for 'Giftshopsmart'. 
      Your goal is to recommend products from the following catalog based on user needs.
      
      CATALOG:
      ${productContext}
      
      RULES:
      1. Only recommend products from the catalog.
      2. Be enthusiastic and helpful.
      3. If the user asks for something not in the catalog, politely suggest a close alternative or say we don't carry it.
      4. Format product names in bold.
      5. Keep responses concise.
      .`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.href, // OpenRouter best practice
                    "X-Title": "Giftshopsmart"
                },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-exp:free",
                    "messages": [
                        { "role": "system", "content": systemPrompt },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { "role": "user", "content": input }
                    ]
                })
            });

            const data = await response.json();

            if (data.choices && data.choices[0]) {
                const aiMsg = { role: 'assistant' as const, content: data.choices[0].message.content };
                setMessages(prev => [...prev, aiMsg]);
            } else if (data.error) {
                console.error("OpenRouter Error:", data.error);
                setMessages(prev => [...prev, { role: 'assistant', content: `AI Connection Error: ${data.error.message || 'Please check API Key'}` }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, the AI is momentarily unavailable. Please try again.' }]);
            }

        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to the brain. Please check your internet or API key.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-100 flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Header */}
                    <div className="bg-primary p-4 flex justify-between items-center text-white">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="h-5 w-5" />
                            <h3 className="font-bold">Gift Concierge</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded transition">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === 'user'
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}>
                                    {msg.content.split('\n').map((line, i) => (
                                        <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 shadow-sm flex items-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                    <span className="text-xs text-gray-500">Thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask for a gift idea..."
                                className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className={`p-1 rounded-full transition ${input.trim() ? 'text-primary hover:bg-green-100' : 'text-gray-300'}`}
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-gray-400">Powered by Google Gemini</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Launcher */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-green-700 transition transform hover:-translate-y-1"
                >
                    <MessageSquare className="h-6 w-6" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-medium opacity-0 group-hover:opacity-100">
                        Need Help?
                    </span>
                </button>
            )}
        </div>
    );
}
