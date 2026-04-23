import React from 'react';
import { ChevronLeft, Sparkles, UserPlus, CreditCard, ClipboardCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ModeIntroPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[200] bg-white flex flex-col overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">什么是良知工程</h1>
      </div>

      <div className="p-6 space-y-10">
        <section className="space-y-6 text-center pt-4">
          <div className="inline-flex w-16 h-16 bg-emerald-50 rounded-[24px] items-center justify-center shadow-inner">
            <Sparkles className="w-8 h-8 text-[#07c160]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">良知工程</h2>
            <p className="text-[#07c160] font-bold text-sm tracking-widest uppercase">Transparency & Quality</p>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            匠心工艺、透明施工、每一分钱花的明明白白
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6">
          {[
            { title: '直接连接', desc: '直接与金牌工匠沟通，省去装修公司中间环节，成本降低30%。', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50' },
            { title: '透明报价', desc: '所有材料、人工费用明码标价，拒绝隐形增项，每一分钱都花在刀刃上。', icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50' },
            { title: '全程监管', desc: '数字化档案记录装修全过程，节点验收更放心，质量问题先行赔付。', icon: ClipboardCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          ].map((item, i) => (
            <div key={i} className="group relative bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.bg)}>
                <item.icon className={cn("w-6 h-6", item.color)} />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <section className="relative overflow-hidden bg-gray-900 p-10 rounded-[48px] text-white text-center space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#07c160]/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
          
          <div className="relative space-y-2">
            <h3 className="text-2xl font-bold">让装修像搭积木一样简单</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              已有超过 10,000+ 家庭通过良知工程完成了理想家的建设
            </p>
          </div>
          <button onClick={onBack} className="relative bg-[#07c160] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#07c160]/30 active:scale-95 transition-transform">
            立即开启体验
          </button>
        </section>
      </div>
    </motion.div>
  );
};

export default ModeIntroPage;
