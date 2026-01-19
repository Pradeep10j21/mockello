import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TranscriptMessage } from '@/types/gd';
import { formatDistanceToNow } from 'date-fns';

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
}

export function TranscriptPanel({ messages }: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="h-full flex flex-col bg-card rounded-2xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <h3 className="font-display font-semibold text-foreground">Discussion Transcript</h3>
        <p className="text-xs text-[#0F2C1F] dark:text-[#2d5a3d] mt-0.5 font-medium">{messages.length} messages</p>
      </div>

      {/* Messages - Scrollable */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin"
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted text-sm">
              No messages yet. Start the discussion!
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`transcript-message ${message.isYou ? 'is-you' : ''}`}
              >
                <div className="flex items-start gap-2">
                  <div className={`avatar-initial w-8 h-8 text-xs flex-shrink-0 ${message.isYou ? 'bg-primary' : 'bg-secondary'}`}>
                    {getInitial(message.participantName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-[#0F2C1F] dark:text-[#2d5a3d]">
                        {message.participantName}
                      </span>
                      <span className="text-xs text-[#0F2C1F]/70 dark:text-[#2d5a3d]/70">
                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-[#0F2C1F] dark:text-[#2d5a3d] mt-1 leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}




