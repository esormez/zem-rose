'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamedText]);

  // Focus input on click anywhere in the card
  const handleCardClick = useCallback(() => {
    if (!streaming) inputRef.current?.focus();
  }, [streaming]);

  const streamResponse = useCallback(async (text: string, allMessages: Message[]) => {
    setStreaming(true);
    setStreamedText('');

    for (let i = 0; i < text.length; i++) {
      await new Promise(r => setTimeout(r, 16));
      setStreamedText(text.slice(0, i + 1));
    }

    setStreaming(false);
    setStreamedText('');
    setMessages([...allMessages, { role: 'assistant', content: text }]);
  }, []);

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || streaming) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setStreaming(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      await streamResponse(data.content, updated);
    } catch {
      await streamResponse('Something went wrong. Try again.', updated);
    }
  }, [input, streaming, messages, streamResponse]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const isEmpty = messages.length === 0 && !streaming;

  return (
    <div
      className="h-full flex flex-col"
      onClick={handleCardClick}
      style={{ cursor: 'text' }}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between" style={{ marginBottom: '12px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--muted-text)',
          }}
        >
          Ask
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.06em',
            color: 'var(--mid-gray)',
            opacity: 0.6,
          }}
        >
          scoped to portfolio · no external knowledge
        </span>
      </div>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Empty state: just the blinking cursor */}
        {isEmpty && (
          <div className="h-full flex items-center">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                color: 'var(--burgundy)',
                opacity: cursorVisible ? 1 : 0,
                transition: 'opacity 100ms',
              }}
            >
              _
            </span>
          </div>
        )}

        {/* Conversation */}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: '24px',
              textAlign: msg.role === 'user' ? 'right' : 'left',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--mid-gray)',
                marginBottom: '6px',
                opacity: 0.5,
              }}
            >
              {msg.role === 'user' ? 'You' : 'Zemrose'}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                lineHeight: 1.65,
                color: msg.role === 'user' ? 'var(--mid-gray)' : 'var(--light-text)',
                letterSpacing: '-0.01em',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Streaming response */}
        {streaming && (
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--mid-gray)',
                marginBottom: '6px',
                opacity: 0.5,
              }}
            >
              Zemrose
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'var(--light-text)',
                letterSpacing: '-0.01em',
              }}
            >
              {streamedText}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--burgundy)',
                  opacity: cursorVisible ? 1 : 0,
                  transition: 'opacity 100ms',
                  marginLeft: '1px',
                }}
              >
                _
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(232, 228, 221, 0.08)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--burgundy)',
            flexShrink: 0,
          }}
        >
          &gt;
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={streaming}
          placeholder=""
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--light-text)',
            caretColor: 'var(--burgundy)',
            letterSpacing: '0.01em',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--mid-gray)',
            opacity: input.length > 0 ? 0.4 : 0,
            transition: 'opacity 150ms',
            flexShrink: 0,
          }}
        >
          ↵
        </span>
      </div>
    </div>
  );
}
