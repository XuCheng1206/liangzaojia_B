import React, { useState } from 'react';
import { ChevronLeft, Share2, MoreHorizontal, Plus, Heart, Bookmark, MessageCircle, UserPlus, Send, X, MessageSquare, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const VideoPlayerPage = (props: { item: any; onBack: () => void; key?: React.Key }) => {
  const { item, onBack } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const shareOptions = [
    { id: 'wechat', label: '微信好友', icon: MessageCircle, color: 'bg-[#07c160]' },
    { id: 'message', label: '私信好友', icon: MessageSquare, color: 'bg-blue-500' },
    { id: 'link', label: '复制链接', icon: Link, color: 'bg-gray-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onBack} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowShare(true)}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Content */}
      <div className="flex-1 relative flex items-center justify-center">
        {item.contentType === 'video' ? (
          <video 
            src={item.videoUrl} 
            className="w-full h-full object-contain"
            autoPlay 
            loop 
            playsInline
          />
        ) : (
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Interaction Sidebar */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <img src={item.avatar} alt={item.author} className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-0.5">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center gap-1"
        >
          <div className={cn("p-2 rounded-full backdrop-blur-md transition-colors", isLiked ? "bg-red-500/20" : "bg-white/10")}>
            <Heart className={cn("w-7 h-7", isLiked ? "text-red-500 fill-current" : "text-white")} />
          </div>
          <span className="text-white text-xs font-medium">{item.likes}</span>
        </button>

        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="flex flex-col items-center gap-1"
        >
          <div className={cn("p-2 rounded-full backdrop-blur-md transition-colors", isFavorited ? "bg-yellow-500/20" : "bg-white/10")}>
            <Bookmark className={cn("w-7 h-7", isFavorited ? "text-yellow-500 fill-current" : "text-white")} />
          </div>
          <span className="text-white text-xs font-medium">{item.favorites}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{item.comments}</span>
        </button>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-4 pb-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-base">@{item.author}</span>
            <button className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <UserPlus className="w-3 h-3" />
              关注
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <Send className="w-3 h-3" />
              私聊
            </button>
          </div>
        </div>

        <div className="max-w-[85%]">
          <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
          
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag: string) => (
                <span key={tag} className="text-white/80 text-[10px] bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="relative">
            <p className={cn(
              "text-white/90 text-sm leading-relaxed transition-all duration-300",
              !isExpanded && "line-clamp-2"
            )}>
              {item.description}
            </p>
            {item.description.length > 50 && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white font-bold text-sm mt-1"
              >
                {isExpanded ? '收起' : '...展开'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Share Sheet */}
      <AnimatePresence>
        {showShare && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShare(false)}
              className="absolute inset-0 bg-black/60 z-[110]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl z-[120] px-6 pt-8 pb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">分享到</h3>
                <button onClick={() => setShowShare(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                {shareOptions.map((option) => (
                  <button 
                    key={option.id}
                    onClick={() => setShowShare(false)}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", option.color)}>
                      <option.icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setShowShare(false)}
                className="w-full mt-10 py-4 bg-gray-50 rounded-2xl text-gray-900 font-bold text-sm"
              >
                取消
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoPlayerPage;
