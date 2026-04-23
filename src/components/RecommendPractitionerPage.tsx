import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Users, Gift, CheckCircle, ArrowRight, QrCode } from 'lucide-react';

interface RecommendPractitionerPageProps {
  onBack: () => void;
}

export default function RecommendPractitionerPage({ onBack }: RecommendPractitionerPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-bold text-[17px] text-gray-900">推荐从业者</span>
          <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 pt-8 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 mb-4">
            <span className="text-white text-[11px] font-medium tracking-wide">良造家合伙人计划</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight drop-shadow-sm">
            邀请好友入驻<br />赚取丰厚现金
          </h1>
          <p className="text-orange-100 text-[13px] font-medium mb-6">
            推荐项目发起人入驻，共享项目收益 <span className="text-yellow-300 font-bold text-lg">最高 3%</span>
          </p>
        </motion.div>
      </div>

      {/* Reward Details */}
      <div className="px-4 -mt-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
            <h2 className="text-[16px] font-bold text-gray-900">奖励规则</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100/50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-orange-900 text-[15px]">推荐 项目发起人</span>
                <span className="text-orange-600 font-bold text-[14px]">长期收益奖励</span>
              </div>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-orange-100 flex items-center justify-between">
                  <div className="text-[12px] text-gray-700">设计师合同收益奖励 (限前3个项目)</div>
                  <div className="text-[16px] font-black text-orange-600">3%</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm border border-orange-100 flex items-center justify-between">
                  <div className="text-[12px] text-gray-700">工长合同收益奖励 (限前5个项目)</div>
                  <div className="text-[16px] font-black text-orange-600">3%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
            <h2 className="text-[16px] font-bold text-gray-900">如何邀请</h2>
          </div>

          <div className="relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-orange-100" />
            
            <div className="flex gap-4 mb-6 relative">
              <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 z-10">
                <Share2 className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-1">分享专属链接/海报</h3>
                <p className="text-[12px] text-gray-500">点击下方按钮，将您的专属邀请链接或海报发送给好友</p>
              </div>
            </div>

            <div className="flex gap-4 mb-6 relative">
              <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 z-10">
                <Users className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-1">好友注册并认证</h3>
                <p className="text-[12px] text-gray-500">好友通过您的链接注册良造家，并完成从业者实名认证</p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 z-10">
                <Gift className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-1">奖励自动到账</h3>
                <p className="text-[12px] text-gray-500">好友完成认证或首单交易后，现金奖励将自动发放至您的钱包</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* My Invites */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
              <h2 className="text-[16px] font-bold text-gray-900">我的邀请记录</h2>
            </div>
            <button className="text-[12px] text-gray-500 flex items-center gap-0.5 hover:text-orange-600 transition-colors">
              查看全部 <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-[13px] text-gray-400">暂无邀请记录，快去邀请好友吧</p>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
        <div className="flex gap-3 max-w-md mx-auto">
          <button className="flex-1 h-12 rounded-xl bg-orange-50 text-orange-600 font-bold text-[15px] flex items-center justify-center gap-2 active:bg-orange-100 transition-colors border border-orange-200/50">
            <QrCode className="w-5 h-5" />
            生成海报
          </button>
          <button className="flex-[2] h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all">
            <Share2 className="w-5 h-5" />
            立即分享链接
          </button>
        </div>
      </div>
    </div>
  );
}
