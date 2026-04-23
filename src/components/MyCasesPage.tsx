import React, { useState } from 'react';
import { ChevronLeft, FileText, LayoutGrid, Video, MoreHorizontal, Trash2, Edit3, EyeOff, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MyCasesPage = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('published');
  const [myCases, setMyCases] = useState([
    {
      id: 1,
      title: '现代简约风格别墅装修',
      desc: '全屋采用极简线条，大面积留白，营造通透感。',
      time: '2024-02-25 14:30',
      type: 'graphic',
      status: 'published', // published, reviewing, failed, offline
      cover: 'https://picsum.photos/seed/case1/400/300'
    },
    {
      id: 2,
      title: '老房翻新：50平米小户型大变身',
      desc: '巧妙利用空间，将原本拥挤的老房改造成温馨的北欧风。',
      time: '2024-02-26 09:15',
      type: 'video',
      status: 'reviewing',
      cover: 'https://picsum.photos/seed/case2/400/300'
    },
    {
      id: 3,
      title: '中式禅意茶室设计',
      desc: '以木质元素为主，结合水墨画，打造静谧的品茗空间。',
      time: '2024-02-24 18:00',
      type: 'graphic',
      status: 'failed',
      failReason: '图片质量不清晰，请重新上传。',
      cover: 'https://picsum.photos/seed/case3/400/300'
    },
    {
      id: 4,
      title: '北欧原木风公寓',
      desc: '大量使用原木材质，配合米白色调，温馨自然。',
      time: '2024-02-20 11:00',
      type: 'graphic',
      status: 'offline',
      cover: 'https://picsum.photos/seed/case4/400/300'
    }
  ]);

  const toggleStatus = (id: number, newStatus: string) => {
    setMyCases(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filteredCases = myCases.filter(c => c.status === activeTab);

  const tabs = [
    { id: 'reviewing', label: '审核中' },
    { id: 'published', label: '已发布' },
    { id: 'failed', label: '未通过' },
    { id: 'offline', label: '已下线' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">我发布的笔记</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center justify-around px-2 pt-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 text-sm font-medium relative transition-colors",
                activeTab === tab.id ? "text-gray-900 font-bold" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-900 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {filteredCases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-sm">暂无{tabs.find(t => t.id === activeTab)?.label}的内容</p>
          </div>
        ) : (
          filteredCases.map((item) => (
            <div key={item.id} className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
              <div className="flex p-4 gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative">
                   <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                   <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/40 backdrop-blur-md rounded-lg flex items-center justify-center text-white">
                      {item.type === 'video' ? <Video className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                   </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                    <div className="flex items-center gap-1.5">
                       {item.status === 'published' && (
                          <button onClick={() => toggleStatus(item.id, 'offline')} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600" title="下线">
                             <EyeOff className="w-3.5 h-3.5" />
                          </button>
                       )}
                       {item.status === 'offline' && (
                          <button onClick={() => toggleStatus(item.id, 'published')} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-blue-500" title="上线">
                             <Eye className="w-3.5 h-3.5" />
                          </button>
                       )}
                       <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                          <Edit3 className="w-3.5 h-3.5" />
                       </button>
                       <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-red-500">
                          <Trash2 className="w-3.5 h-3.5" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
              {item.status === 'failed' && (
                <div className="px-4 py-2.5 bg-red-50 border-t border-red-100 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                   <span className="text-[11px] text-red-600 font-medium">未通过原因：{item.failReason}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Floating Action Button */}
      <motion.button 
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center z-[60]"
      >
        <Edit3 className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default MyCasesPage;
