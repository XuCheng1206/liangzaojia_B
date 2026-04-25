/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Bell, LayoutGrid, Users, FileText, FileX, Box, MapPin, Flame, Plus, Home, User, ChevronLeft, Heart, Play, Layers, MessageCircle, Bookmark, Share2, X, UserPlus, Send, MoreHorizontal, Link, MessageSquare, Image, Video, Camera, ArrowRight, Pencil, Phone, PhoneCall, BookOpen, ClipboardCheck, LogOut, ChevronRight, ChevronDown, Award, Eye, Clock, AlertCircle, CheckCircle2, Power, ArrowUpCircle, Building2, Map, Upload, Sparkles, Wand2, Maximize2, Minimize2, CreditCard, PieChart, BarChart3, Zap, Star, Fingerprint, Shield, Copy, Wallet, Briefcase, Activity, GraduationCap, Medal, ThumbsUp, Target, CalendarCheck, Smile, QrCode, IdCard, Crown, PenTool, HardHat, Globe, History, Handshake, Check, Monitor, ShieldCheck, Lock, Ban, XCircle, AlertTriangle, TrendingDown, TrendingUp, Hammer, Construction, ShieldAlert, UserCheck, Database, Quote, Cpu, Coins, Gift, Palette, Settings, HelpCircle, LayoutDashboard, Edit3, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import BrowsingHistoryPage from './components/BrowsingHistoryPage';
import RecommendPractitionerPage from './components/RecommendPractitionerPage';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const GRID_ITEMS = [
  { id: 'combined_projects', label: '发布线索', sub: '线索招募 | 实时更新', icon: Briefcase },
  { id: 'certification', label: '从业者认证', sub: '官方背书 | 优先派单', icon: ShieldCheck },
];

const LIST_ITEMS = [
  {
    id: 1,
    title: '现代简约：光影交织的诗意栖居',
    category: '全屋定制',
    location: '浙江 · 杭州',
    likes: 1205,
    author: '陈设计师',
    avatar: 'https://i.pravatar.cc/150?u=chen',
    tags: ['极简', '智能家居', '大平层'],
    image: 'https://picsum.photos/seed/list1/400/300',
    type: '项目'
  },
  {
    id: 2,
    title: '法式浪漫：复古石膏线与现代家具',
    category: '软装设计',
    location: '上海 · 徐汇',
    likes: 890,
    author: '林小雅',
    avatar: 'https://i.pravatar.cc/150?u=lin',
    tags: ['法式', '精致', '老房改造'],
    image: 'https://picsum.photos/seed/list2/400/300',
    type: '案例'
  },
  {
    id: 3,
    title: '日式侘寂：回归本真的宁静空间',
    category: '硬装施工',
    location: '江苏 · 苏州',
    likes: 2340,
    author: '王工',
    avatar: 'https://i.pravatar.cc/150?u=wang',
    tags: ['侘寂', '原木', '禅意'],
    image: 'https://picsum.photos/seed/list3/400/300',
    type: '案例'
  },
  {
    id: 4,
    title: '新中式：传统元素与现代生活的碰撞',
    category: '空间规划',
    location: '广东 · 深圳',
    likes: 1560,
    author: '欧阳老师',
    avatar: 'https://i.pravatar.cc/150?u=ouyang',
    tags: ['中式', '大气', '别墅'],
    image: 'https://picsum.photos/seed/list4/400/300',
    type: '招募'
  }
];

const PROJECT_LEADS_DATA = [
  {
    id: 'l1',
    title: '120㎡现代简约全屋装修项目',
    cover: 'https://picsum.photos/seed/lead1/400/300',
    community: '万科翡翠公园',
    tags: ['现代简约', '全屋定制', '急需开工'],
    houseType: '平层',
    type: '毛坯房',
    area: '120',
    budget: '15-20万',
    houseStructure: '三室两厅一卫',
    houseStatus: '毛坯',
    publishTime: '2024-03-09 10:30',
    detailedRequirement: '业主希望整体风格简约大方，全屋定制柜体，对环保要求极高。目前已收房，希望尽快开工。',
    visuals: [
      'https://picsum.photos/seed/v1/800/600',
      'https://picsum.photos/seed/v2/800/600'
    ],
    floorPlan: 'https://picsum.photos/seed/plan1/800/600'
  },
  {
    id: 'l2',
    title: '89㎡北欧风旧房翻新',
    cover: 'https://picsum.photos/seed/lead2/400/300',
    community: '保利心语',
    tags: ['北欧风', '局部改造', '预算有限'],
    houseType: '平层',
    type: '旧房',
    area: '89',
    budget: '8-10万',
    houseStructure: '两室两厅一卫',
    houseStatus: '旧房',
    publishTime: '2024-03-09 09:15',
    detailedRequirement: '主要是厨房和卫生间的翻新，客厅墙面重新刷漆，希望在有限的预算内达到清爽的效果。',
    visuals: [
      'https://picsum.photos/seed/v3/800/600'
    ],
    floorPlan: 'https://picsum.photos/seed/plan2/800/600'
  },
  {
    id: 'l3',
    title: '260㎡新中式别墅装修大单',
    cover: 'https://picsum.photos/seed/lead3/400/300',
    community: '绿城桃花源',
    tags: ['新中式', '高端定制', '园林设计'],
    houseType: '别墅',
    type: '毛坯房',
    area: '260',
    budget: '100万以上',
    houseStructure: '五室三厅四卫',
    houseStatus: '毛坯',
    publishTime: '2024-03-08 18:00',
    detailedRequirement: '高端别墅项目，需要专业的设计团队进行全案设计，包括室内装修和室外园林。业主偏爱新中式风格，注重品质和细节。',
    visuals: [
      'https://picsum.photos/seed/v4/800/600',
      'https://picsum.photos/seed/v5/800/600',
      'https://picsum.photos/seed/v6/800/600'
    ],
    floorPlan: 'https://picsum.photos/seed/plan3/800/600'
  },
  {
    id: 'l4',
    title: '140㎡法式轻奢精装微改',
    cover: 'https://picsum.photos/seed/lead4/400/300',
    community: '华润悦府',
    tags: ['法式轻奢', '软装搭配', '灯光改造'],
    houseType: '平层',
    type: '旧房',
    area: '140',
    budget: '20-30万',
    houseStructure: '四室两厅两卫',
    houseStatus: '精装',
    publishTime: '2024-03-08 14:20',
    detailedRequirement: '精装房交付，不满意原有的灯光和软装，需要进行法式轻奢风格的改造。重点在于背景墙、灯光系统和全屋家具搭配。',
    visuals: [
      'https://picsum.photos/seed/v7/800/600'
    ],
    floorPlan: 'https://picsum.photos/seed/plan4/800/600'
  }
];

const PROJECT_RECRUITMENT_DATA = [
  {
    id: 'r1',
    projectName: '西溪诚园180㎡全屋精装修',
    area: '180',
    houseStructure: '平层',
    houseStatus: '毛坯',
    role: '项目总',
    tags: ['高端住宅', '经验丰富', '急招'],
    publishTime: '2024-03-11 09:00'
  },
  {
    id: 'r2',
    projectName: '阳光海岸220㎡大平层改造',
    area: '220',
    houseStructure: '平层',
    houseStatus: '旧房',
    role: '设计师',
    tags: ['现代风格', '创意设计', '名企背景'],
    publishTime: '2024-03-11 08:30'
  },
  {
    id: 'r3',
    projectName: '九溪玫瑰园350㎡别墅翻新',
    area: '350',
    houseStructure: '别墅',
    houseStatus: '旧房',
    role: '工长',
    tags: ['别墅专家', '工艺精湛', '长期合作'],
    publishTime: '2024-03-10 18:00'
  },
  {
    id: 'r4',
    projectName: '滨江金茂府140㎡精装微改',
    area: '140',
    houseStructure: '平层',
    houseStatus: '旧房',
    role: '水电工',
    tags: ['持证上岗', '效率高', '本地优先'],
    publishTime: '2024-03-10 14:20'
  },
  {
    id: 'r5',
    projectName: '万科翡翠公园120㎡现代简约',
    area: '120',
    houseStructure: '平层',
    houseStatus: '毛坯',
    role: '木工',
    tags: ['全屋定制', '手艺好'],
    publishTime: '2024-03-10 10:00'
  },
  {
    id: 'r6',
    projectName: '华润悦府140㎡法式轻奢',
    area: '140',
    houseStructure: '平层',
    houseStatus: '旧房',
    role: '泥瓦工',
    tags: ['精细施工', '经验丰富'],
    publishTime: '2024-03-09 16:00'
  }
];

const CASE_DATA = [
  {
    id: 1,
    title: '140㎡现代简约，全屋无主灯设计',
    hookTitle: '去客厅化不是智商税是解放',
    description: '在这个140平的空间里，我们大胆尝试了去客厅化设计。取消了传统的电视墙和沙发对冲布局，取而代之的是一个超大的多功能长桌和满墙书架。全屋采用无主灯设计，通过线性灯带和射灯营造出极具层次感的光影氛围。这种设计不仅让空间看起来更开阔，更重要的是它解放了家人的互动方式，让客厅真正成为了交流和学习的中心。',
    image: 'https://picsum.photos/seed/case1/400/600',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-living-room-4437-large.mp4',
    author: '设计狮阿强',
    avatar: 'https://i.pravatar.cc/150?u=aqiang',
    likes: '2.1w',
    favorites: '1.2w',
    comments: '856',
    height: 'h-[210px]',
    contentType: 'video',
    tags: ['现代简约', '无主灯设计', '去客厅化']
  },
  {
    id: 2,
    title: '小户型扩容术',
    hookTitle: '大开脑洞的宝藏餐边柜',
    description: '40平米的小户型如何拥有豪宅感？答案就在细节里。我们设计了一款多功能餐边柜，集成了收纳、展示和临时办公功能。通过镜面材质的运用和色彩的巧妙搭配，视觉上将空间扩大了一倍。\n\n这里不仅是餐厅，更是家里的社交中心。每一寸空间都被极致利用，甚至在柜门背后都藏着玄机。',
    image: 'https://picsum.photos/seed/case2/400/400',
    images: [
      'https://picsum.photos/seed/case2-1/800/800',
      'https://picsum.photos/seed/case2-2/800/800',
      'https://picsum.photos/seed/case2-3/800/800'
    ],
    author: '装修避坑指南',
    avatar: 'https://i.pravatar.cc/150?u=guide',
    likes: '8902',
    favorites: '4500',
    comments: '320',
    height: 'h-[160px]',
    contentType: 'text',
    tags: ['小户型', '收纳神器', '餐边柜']
  },
  {
    id: 3,
    title: '法式复古风，这就是我梦中的家',
    hookTitle: '法式复古，梦中情屋',
    description: '法式复古风的精髓在于那种慵懒而优雅的氛围。石膏线条、鱼骨拼地板、还有精心挑选的中古家具，每一个角落都散发着艺术气息。在这个案例中，我们特别注重了色彩的饱和度，营造出一种电影质感。',
    image: 'https://picsum.photos/seed/case3/400/700',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-a-fireplace-and-a-large-window-4436-large.mp4',
    author: '温柔半两',
    avatar: 'https://i.pravatar.cc/150?u=wenrou',
    likes: '1.5w',
    favorites: '9800',
    comments: '1200',
    height: 'h-[220px]',
    contentType: 'video'
  },
  {
    id: 4,
    title: '奶油风配色全攻略',
    hookTitle: '奶油风配色全攻略',
    description: '奶油风不是简单的白色，而是各种低饱和度色彩的完美融合。我们整理了这套全屋配色方案，从墙面到软装，教你如何打造一个治愈系的家。\n\n核心配色建议：\n1. 墙面选择可可蛋奶或杏子灰\n2. 地面选择原木色地板或柔光砖\n3. 软装点缀一些焦糖色或橄榄绿',
    image: 'https://picsum.photos/seed/case4/400/500',
    images: [
      'https://picsum.photos/seed/case4-1/800/1000',
      'https://picsum.photos/seed/case4-2/800/1000',
      'https://picsum.photos/seed/case4-3/800/1000'
    ],
    author: '家居博主Momo',
    avatar: 'https://i.pravatar.cc/150?u=momo',
    likes: '3.4w',
    favorites: '2.5w',
    comments: '2100',
    height: 'h-[170px]',
    contentType: 'text'
  },
  {
    id: 5,
    title: '精装房改造，不砸墙也能变高级',
    hookTitle: '精装房不拆也能变高级',
    description: '很多朋友问精装房怎么改？其实不一定要大拆大改。通过局部背景墙的调整、灯光的二次布局以及软装的重新搭配，就能让原本平庸的精装房焕发新生。',
    image: 'https://picsum.photos/seed/case5/400/450',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-kitchen-interior-with-white-cabinets-4435-large.mp4',
    author: '改造达人小王',
    avatar: 'https://i.pravatar.cc/150?u=xiaowang',
    likes: '1.2w',
    favorites: '6700',
    comments: '540',
    height: 'h-[190px]',
    contentType: 'video'
  },
  {
    id: 6,
    title: '原木风餐厅',
    hookTitle: '89平米小三室+洄游+横厅',
    description: '89平米的空间，我们通过洄游动线的设计，让小户型也拥有了大横厅的开阔感。原木材质的大量使用，让整个空间充满了自然的气息。\n\n餐厅区域采用了大板桌，既可以作为餐桌，也可以作为工作台。窗外的阳光洒进来，每一顿饭都充满了仪式感。',
    image: 'https://picsum.photos/seed/case6/400/650',
    images: [
      'https://picsum.photos/seed/case6-1/800/1200',
      'https://picsum.photos/seed/case6-2/800/1200'
    ],
    author: '木木家',
    avatar: 'https://i.pravatar.cc/150?u=mumu',
    likes: '9821',
    favorites: '3400',
    comments: '280',
    height: 'h-[200px]',
    contentType: 'text'
  }
];

const CRAFTSMAN_DATA = [
  {
    id: 'c1',
    name: '张师傅',
    title: '金牌水电工',
    experience: '15年经验',
    rating: '4.9',
    tags: ['水电改造', '精工细作', '从业者认证'],
    avatar: 'https://i.pravatar.cc/150?u=zhang',
    image: 'https://picsum.photos/seed/worker1/400/300',
    description: '专注水电隐蔽工程15年，零差评口碑。',
    type: 'craftsman'
  },
  {
    id: 'c2',
    name: '李工',
    title: '资深瓦工',
    experience: '12年经验',
    rating: '4.8',
    tags: ['瓷砖铺贴', '大板施工', '工艺严谨'],
    avatar: 'https://i.pravatar.cc/150?u=li',
    image: 'https://picsum.photos/seed/worker2/400/300',
    description: '擅长各种异形铺贴，细节控，追求极致平整。',
    type: 'craftsman'
  }
];

const CASE_LIST_DATA = [...CASE_DATA]; // Original cases for CaseListPage

const SANDBOX_SCHEME_DATA = [
  {
    id: 's1',
    title: '89㎡三室两厅推演方案',
    author: '用户1289',
    avatar: 'https://i.pravatar.cc/150?u=u1289',
    image: 'https://picsum.photos/seed/sandbox1/400/500',
    likes: '1.2k',
    tags: ['动线优化', '空间极致利用'],
    type: 'sandbox'
  },
  {
    id: 's2',
    title: '现代简约风全屋推演',
    author: '装修小白进阶',
    avatar: 'https://i.pravatar.cc/150?u=u556',
    image: 'https://picsum.photos/seed/sandbox2/400/400',
    likes: '856',
    tags: ['全屋模拟', '预算控制'],
    type: 'sandbox'
  }
];

const REAL_RENOVATION_DATA = [
  {
    id: 'r1',
    title: '毕业啦！120㎡原木风，这就是我想要的家',
    author: '业主小李',
    avatar: 'https://i.pravatar.cc/150?u=u120',
    image: 'https://picsum.photos/seed/real1/400/600',
    likes: '3.5k',
    tags: ['真实人家', '原木风', '毕业照'],
    type: 'real'
  },
  {
    id: 'r2',
    title: '精装房微改，入住后的真实样子',
    author: '爱生活的喵',
    avatar: 'https://i.pravatar.cc/150?u=u88',
    image: 'https://picsum.photos/seed/real2/400/400',
    likes: '2.1k',
    tags: ['精装改造', '真实生活'],
    type: 'real'
  }
];

const FOLLOWING_DATA = [
  {
    ...PROJECT_LEADS_DATA[0],
    id: 'f1',
    type: 'lead' as const,
    collectedTime: '2024-03-12 10:00'
  },
  {
    ...PROJECT_RECRUITMENT_DATA[0],
    id: 'f2',
    type: 'recruitment' as const,
    collectedTime: '2024-03-11 15:30'
  },
  {
    ...PROJECT_LEADS_DATA[1],
    id: 'f3',
    type: 'lead' as const,
    collectedTime: '2024-03-10 09:20'
  },
  {
    ...PROJECT_RECRUITMENT_DATA[1],
    id: 'f4',
    type: 'recruitment' as const,
    collectedTime: '2024-03-09 14:00'
  }
];

// --- Components ---

const HomeCarousel = ({ onClick }: { onClick: (index: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: "https://picsum.photos/seed/b-side-1/1200/600",
      title: "赋能优秀匠人 开启事业新篇",
      desc: "海量真实线索精准推送，让您的专业价值得到最大化体现",
      tag: "事业加速"
    },
    {
      image: "https://picsum.photos/seed/b-side-2/1200/600",
      title: "透明交付体系 0抽佣金",
      desc: "平台不收提成，辛苦所得全归自己，直接联系业主更高效",
      tag: "模式领先"
    },
    {
      image: "https://picsum.photos/seed/b-side-3/1200/600",
      title: "数字诚信档案 职业资产",
      desc: "每一项工程数据永久记录，打造属于您的金牌职业口碑",
      tag: "数字赋能"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="px-4 py-3">
      <div 
        onClick={() => onClick(currentIndex)}
        className="relative h-30 rounded-[24px] overflow-hidden shadow-xl group cursor-pointer"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentIndex].image} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {slides[currentIndex].tag}
                </span>
              </div>
              <h4 className="text-white font-black text-lg mb-1 tracking-tight">{slides[currentIndex].title}</h4>
              <p className="text-white/70 text-[10px] font-medium leading-tight max-w-[90%]">{slides[currentIndex].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Indicators */}
        <div className="absolute bottom-4 right-5 flex gap-1.5 z-10">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i === currentIndex ? "bg-amber-500 w-5" : "bg-white/30 w-1.5"
              )} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TrustStatsBar = () => (
  <div className="px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-start">
        <span className="text-xl font-black text-slate-900 leading-none">5,800+</span>
        <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">本月新增线索</span>
      </div>
      <div className="w-px h-8 bg-slate-200" />
      <div className="flex flex-col items-start">
        <span className="text-xl font-black text-slate-900 leading-none">¥2.4亿</span>
        <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">累计结算金额</span>
      </div>
      <div className="w-px h-8 bg-slate-200" />
      <div className="flex flex-col items-start">
        <span className="text-xl font-black text-slate-900 leading-none">100%</span>
        <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">资金安全保障</span>
      </div>
    </div>
  </div>
);

const CoreModeSection = ({ onModeClick }: { onModeClick: () => void }) => (
  <div className="px-4 py-2">
    <div className="flex items-center justify-between mb-2.5 px-1">
      <h2 className="text-base font-black text-slate-900 tracking-tight">您选择我们的理由</h2>
      <button onClick={onModeClick} className="text-[10px] font-bold text-amber-600 flex items-center gap-0.5">
        模式详情 <ChevronRight className="w-2.5 h-2.5" />
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {[
        { title: '活好干', desc: '标准流程 拒绝扯皮', icon: Wand2, color: 'text-blue-600', bg: 'bg-blue-50/50' },
        { title: '钱好拿', desc: '备付金保障 即刻到账', icon: Wallet, color: 'text-orange-600', bg: 'bg-orange-50/50' },
        { title: '项目多', desc: '海量线索 精准推送', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
        { title: '0抽佣', desc: '辛苦所得 全归自己', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50/50' },
      ].map((item, i) => (
        <div 
          key={i}
          className="flex flex-col gap-2.5 p-1"
        >
          <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", item.bg)}>
            <item.icon className={cn("w-5 h-5", item.color)} />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-[13px] font-bold text-slate-900">{item.title}</h4>
            <p className="text-[10px] text-slate-500 font-medium leading-tight">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SearchHeader = ({ 
  city, 
  onCityClick, 
  onModeClick,
  onPublishClick
}: { 
  city: string; 
  onCityClick: () => void; 
  onModeClick: () => void;
  onPublishClick: () => void;
}) => (
  <div className="sticky top-0 z-[60] bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50">
    <div className="px-4 h-[54px] flex items-center">
      <div className="flex items-center justify-between w-full relative">
        <button 
          onClick={onCityClick}
          className="flex items-center gap-1.5 text-gray-900 text-sm font-bold bg-white/80 border border-gray-200/50 px-3 py-1.5 rounded-full active:scale-95 transition-transform shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span>{city}</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
        <h1 className="text-gray-900 font-black text-xl tracking-tighter absolute left-1/2 -translate-x-1/2">
          良造<span className="text-amber-500">家</span>
        </h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={onPublishClick}
            className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/40 active:scale-90 transition-transform"
          >
            <Plus className="w-5 h-5 stroke-[4px]" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const HighEndRecruitment = ({ onSelectRecruitment }: { onSelectRecruitment: (item: any) => void }) => {
  const highEndData = [
    {
      id: 'hr1',
      projectName: '顶层复式豪宅设计工作室招募',
      area: '450',
      houseStructure: '复式',
      houseStatus: '毛坯',
      role: '设计工作室',
      tags: ['高端工作室', '大宅经验', '国际视野'],
      publishTime: '2024-03-12 10:00',
      isHighEnd: true
    },
    {
      id: 'hr2',
      projectName: '独栋别墅高端设计师招募',
      area: '600',
      houseStructure: '别墅',
      houseStatus: '毛坯',
      role: '高端设计师',
      tags: ['别墅专家', '资深主案', '名企背景'],
      publishTime: '2024-03-12 09:30',
      isHighEnd: true
    },
    {
      id: 'hr3',
      projectName: '精装大平层金牌工长招募',
      area: '280',
      houseStructure: '平层',
      houseStatus: '毛坯',
      role: '高端工长',
      tags: ['金牌施工', '精工管家', '口碑极佳'],
      publishTime: '2024-03-12 08:00',
      isHighEnd: true
    }
  ];

  return (
    <div className="px-4 py-5 bg-gradient-to-b from-[#121212] to-[#1A1A1A] my-4 rounded-[32px] mx-4 border border-amber-500/20 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full" />
      
      <div className="relative z-10 flex items-center justify-between mb-6 px-1">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-500" />
            大宅·豪宅 专属招募
          </h2>
          <p className="text-amber-500/60 text-[10px] font-bold uppercase tracking-[0.2em]">Premium Recruitment Program</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[9px] px-2 py-1 rounded-full font-black">
          严选 0.1%
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {/* 高端设计师招募 */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectRecruitment(highEndData[1])}
          className="relative overflow-hidden rounded-2xl bg-white/5 p-4 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all"
        >
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <PenTool className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-[15px] font-black text-white mb-1">高端设计师</h3>
            <p className="text-[10px] text-white/40 tracking-wide">大宅主案 / 资深设计</p>
          </div>
        </motion.div>

        {/* 高端工长招募 */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectRecruitment(highEndData[2])}
          className="relative overflow-hidden rounded-2xl bg-white/5 p-4 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all"
        >
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <HardHat className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-[15px] font-black text-white mb-1">高端工长</h3>
            <p className="text-[10px] text-white/40 tracking-wide">金牌施工 / 精工管家</p>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-6 pt-5 border-t border-white/5 relative z-10">
        <div className="flex items-center justify-between text-white/40 text-[10px] font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            官方实名认证
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            匠心工艺背书
          </div>
        </div>
      </div>
    </div>
  );
};

const DigitalWorldModule = ({ onClick }: { onClick: () => void }) => (
  <div className="px-4 py-2">
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl p-4 bg-slate-900 border border-slate-800 group cursor-pointer shadow-lg"
    >
      {/* Tech Background Elements */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" 
      />
      <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] flex-shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="w-5 h-5 text-blue-400" />
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[8px] font-bold text-blue-400 tracking-[0.2em] uppercase">Professional Digital Assets</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
          </div>
          <h3 className="text-[12px] font-black text-white leading-tight tracking-tight">
            打造您的<span className="text-blue-400">数字诚信档案</span>，沉淀职业资产
          </h3>
        </div>
        <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all flex-shrink-0">
          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
        </div>
      </div>
      
      {/* Scanning Line Effect */}
      <motion.div 
        animate={{ top: ["0%", "100%"], opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent z-20 pointer-events-none"
      />
    </motion.div>
  </div>
);

const SecondaryGrid = ({ onInitiatorClick }: { onInitiatorClick: () => void }) => (
  <div className="px-4 py-2">
    {/* Project Initiator - Moved here */}
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onInitiatorClick}
      className="relative overflow-hidden rounded-2xl p-6 py-7 bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg border border-white/10 group cursor-pointer border-indigo-100"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-black text-white">项目发起人</h4>
            <p className="text-xs text-white/80 font-medium mt-0.5">提供线索 享高额佣金</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white bg-white/20 px-4 py-2.5 rounded-full text-sm font-bold shadow-sm">
          立即变现 <ArrowRight className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </motion.div>
  </div>
);

const GridMenu = ({ onItemClick }: { onItemClick: (id: string) => void }) => (
  <div className="px-4 py-2 grid grid-cols-2 gap-2.5 bg-white">
    {GRID_ITEMS.map((item) => (
      <motion.div
        key={item.id}
        whileTap={{ scale: 0.98 }}
        onClick={() => onItemClick(item.id)}
        className="relative overflow-hidden p-2.5 rounded-2xl shadow-sm flex items-center gap-2 border cursor-pointer group hover:shadow-md transition-all bg-gradient-to-b from-white to-slate-50/80 border-slate-200/60 hover:border-slate-300"
      >
        <div className="p-2 rounded-xl flex-shrink-0 shadow-sm border transition-colors relative z-10 bg-white border-slate-100 group-hover:bg-slate-50">
          <item.icon className="w-4 h-4 transition-colors text-slate-700 group-hover:text-slate-900" />
        </div>
        <div className="min-w-0 flex-1 relative z-10">
          <div className="text-[13px] font-bold transition-colors leading-tight text-slate-800 group-hover:text-slate-900">{item.label}</div>
          <div className="text-[9px] mt-0.5 leading-tight whitespace-nowrap tracking-tight text-slate-500">{item.sub}</div>
        </div>
      </motion.div>
    ))}
  </div>
);

const ProjectLeadDetailPage = (props: { item: typeof PROJECT_LEADS_DATA[0]; onBack: () => void; key?: React.Key }) => {
  const { item, onBack } = props;
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">线索详情</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* 1. 基础信息 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#07c160] rounded-full" />
            基础信息
          </h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div>
              <p className="text-[10px] text-gray-400 mb-1">小区名称</p>
              <p className="text-xs font-bold text-gray-800">{item.community}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-1">房屋面积</p>
              <p className="text-xs font-bold text-gray-800">{item.area}m²</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-1">装修预算</p>
              <p className="text-xs font-bold text-gray-800">{item.budget}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-1">户型结构</p>
              <p className="text-xs font-bold text-gray-800">{item.houseStructure}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-1">房屋状态</p>
              <p className="text-xs font-bold text-gray-800">{item.houseStatus}</p>
            </div>
          </div>
        </div>

        {/* 2. 视觉参考 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#07c160] rounded-full" />
            视觉参考
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-gray-400 mb-2">现场照片/视频</p>
              <div className="grid grid-cols-3 gap-2">
                {item.visuals.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-2">户型图</p>
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                <img src={item.floorPlan} className="w-full h-auto" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. 需求详情 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-4 bg-[#07c160] rounded-full" />
            需求详情
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-gray-400 mb-1">需求标题</p>
              <p className="text-xs font-bold text-gray-800">{item.title}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-1">详细需求</p>
              <p className="text-xs text-gray-600 leading-relaxed">{item.detailedRequirement}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-2">标签</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] rounded-full border border-emerald-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 flex gap-3">
        <button className="flex-1 py-3 bg-gray-100 text-gray-900 text-sm font-bold rounded-2xl">收藏线索</button>
        <button className="flex-[2] py-3 bg-[#07c160] text-white text-sm font-bold rounded-2xl shadow-lg shadow-emerald-200">立即沟通</button>
      </div>
    </motion.div>
  );
};

const ProjectLeadCard = (props: { item: typeof PROJECT_LEADS_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer"
    >
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900 truncate mb-1">{item.title}</h3>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
            <MapPin className="w-3 h-3" />
            <span>{item.community}</span>
            <span className="text-gray-200">|</span>
            <span>{item.area}m²</span>
            <span className="text-gray-200">|</span>
            <span>{item.houseType}</span>
            <span className="text-gray-200">|</span>
            <span>{item.type}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] rounded-md border border-emerald-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-gray-400">{item.publishTime}</span>
          <button className="px-3 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-full">查看线索</button>
        </div>
      </div>
    </motion.div>
  );
};

const CombinedProjectPage = ({ onBack, onSelectLead, onSelectRecruitment }: { onBack: () => void; onSelectLead: (item: any) => void; onSelectRecruitment: (item: any) => void }) => {
  const combinedData = [
    ...PROJECT_LEADS_DATA.map(item => ({ ...item, combinedType: 'lead' })),
    ...PROJECT_RECRUITMENT_DATA.map(item => ({ ...item, combinedType: 'recruitment' }))
  ].sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-gray-50 flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">发布线索</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {combinedData.map((item: any) => (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => item.combinedType === 'lead' ? onSelectLead(item) : onSelectRecruitment(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
          >
            {item.combinedType === 'lead' ? (
              <>
                <div className="h-40 relative">
                  <img src={item.cover} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
                    项目线索
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div className="flex items-center gap-1.5 text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold">
                      <MapPin className="w-3 h-3" />
                      {item.community}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 uppercase tracking-wider">面积</span>
                        <span className="text-xs font-bold text-gray-700">{item.area}m²</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 uppercase tracking-wider">预算</span>
                        <span className="text-xs font-bold text-emerald-600">{item.budget}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{item.publishTime}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="px-2 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
                    大宅招募
                  </div>
                  <span className="text-[10px] text-gray-400">{item.publishTime}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.projectName}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400">招募岗位</span>
                      <span className="text-xs font-bold text-gray-700">{item.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400">项目面积</span>
                      <span className="text-xs font-bold text-gray-700">{item.area}m²</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-gray-400" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-500">{item.houseStructure} · {item.houseStatus}</span>
                  </div>
                  <button className="text-xs font-bold text-blue-600 flex items-center gap-1">
                    立即沟通 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectLeadsPage = (props: { onBack: () => void; onSelectLead: (item: typeof PROJECT_LEADS_DATA[0]) => void; key?: React.Key }) => {
  const { onBack, onSelectLead } = props;
  // Sort by time (newest first)
  const sortedLeads = [...PROJECT_LEADS_DATA].sort((a, b) => 
    new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">项目线索</h2>
      </div>

      <div className="p-4 space-y-3">
        {sortedLeads.map(item => (
          <ProjectLeadCard key={item.id} item={item} onClick={() => onSelectLead(item)} />
        ))}
      </div>
    </motion.div>
  );
};

const ProjectRecruitmentCard = ({ item, onClick }: { item: typeof PROJECT_RECRUITMENT_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-bold text-gray-900 flex-1 truncate mr-2">{item.projectName}</h3>
        <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-md border border-purple-100 whitespace-nowrap">
          招募：{item.role}
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-3">
        <Box className="w-3 h-3" />
        <span>{item.area}m²</span>
        <span className="text-gray-200">|</span>
        <span>{item.houseStructure}</span>
        <span className="text-gray-200">|</span>
        <span>{item.houseStatus}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] rounded-md border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[9px] text-gray-400">{item.publishTime}</span>
      </div>
    </motion.div>
  );
};

const ProjectRecruitmentPage = ({ onBack, onSelectRecruitment }: { onBack: () => void; onSelectRecruitment: (item: typeof PROJECT_RECRUITMENT_DATA[0]) => void; key?: React.Key }) => {
  // Sort by time (newest first)
  const sortedRecruitments = [...PROJECT_RECRUITMENT_DATA].sort((a, b) => 
    new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">项目招募</h2>
      </div>

      <div className="p-4 space-y-3">
        {sortedRecruitments.map(item => (
          <ProjectRecruitmentCard key={item.id} item={item} onClick={() => onSelectRecruitment(item)} />
        ))}
      </div>
    </motion.div>
  );
};

const HighEndDesignerDetailPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">设计师招募</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/designer-hero/1200/800" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Premium Designer Program</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
              严选高端设计师共建计划<br />
              <span className="text-[#D4AF37] text-lg">让设计真正对结果负责</span>
            </h2>
            <p className="text-white/70 text-sm font-medium italic">
              “设计不是效果图，是空间的长期价值。”
            </p>
          </div>
        </div>

        <div className="p-6 space-y-10 pb-24">
          {/* Section 1: 反对什么 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-rose-500 rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">一、我们反对什么</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: '只做效果图不落地', icon: Ban },
                { title: '为签单过度承诺', icon: XCircle },
                { title: '为审美牺牲实用', icon: AlertTriangle }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-rose-50/30 rounded-2xl border border-rose-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-rose-500" />
                  </div>
                  <span className="text-sm font-bold text-rose-700">{item.title}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center font-medium mt-2">
              我们希望设计回归专业。
            </p>
          </section>

          {/* Section 2: 邀请怎样的设计师 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#D4AF37] rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">二、我们邀请怎样的设计师</h3>
            </div>
            <div className="space-y-3">
              {[
                '5年以上独立主案经验',
                '能输出完整施工图体系',
                '熟悉材料与预算结构',
                '能参与现场落地管理',
                '对空间长期使用负责'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <span className="text-sm text-gray-700 font-bold">{text}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20 text-center">
              <p className="text-sm text-gray-700 font-medium">
                我们寻找的是<span className="text-[#D4AF37] font-bold">“空间顾问”</span>，<br />
                不是“签单设计师”。
              </p>
            </div>
          </section>

          {/* Image Break */}
          <div className="rounded-3xl overflow-hidden h-48 shadow-lg">
            <img 
              src="https://picsum.photos/seed/designer-work/1200/800" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Section 3: 你将获得 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-emerald-500 rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">三、你将获得</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: '高净值客户匹配', icon: Target },
                { title: '全过程协作体系', icon: Handshake },
                { title: '工艺材料支持', icon: Box },
                { title: '作品长期沉淀', icon: History },
                { title: '专业价值溢价', icon: TrendingUp }
              ].map((item, i) => (
                <div key={i} className={cn(
                  "p-4 rounded-2xl border flex flex-col items-center gap-2 text-center",
                  i === 4 ? "col-span-2 flex-row justify-center py-3" : ""
                )}>
                  <item.icon className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold text-gray-800">{item.title}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center font-medium">
              我们帮助优秀设计师<br />
              <span className="text-emerald-600 font-bold">摆脱低价竞争。</span>
            </p>
          </section>

          {/* Section 4: 严选机制 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">四、严选机制</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: '案例真实性审核', icon: ShieldCheck },
                { title: '图纸深度评估', icon: FileText },
                { title: '现场落地评估', icon: HardHat },
                { title: '客户复盘访谈', icon: MessageSquare }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-purple-50/30 rounded-2xl border border-purple-100 flex flex-col items-center gap-2 text-center">
                  <item.icon className="w-5 h-5 text-purple-500" />
                  <span className="text-[11px] font-bold text-purple-700">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full border border-rose-100">
                通过率低于 15%
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 pb-safe">
        <button className="w-full py-4 bg-gradient-to-r from-[#2C2C2C] to-[#1A1A1A] text-[#D4AF37] font-bold rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all border border-[#D4AF37]/30">
          申请加入严选设计师
        </button>
      </div>
    </motion.div>
  );
};

const InitiatorRecruitmentPage = ({ onBack }: { onBack: () => void }) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">项目发起人计划</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600880212340-02d956eba3ad?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-2xl font-black text-white leading-tight mb-2">
              成为项目发起人<br />
              <span className="text-amber-400">共享装修红利</span>
            </h2>
            <p className="text-white/80 text-sm font-medium">只要您有装修线索，我们负责落地转化。</p>
          </div>
        </div>

        <div className="p-6 space-y-10 pb-32">
          {/* How to become */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
              <h3 className="text-xl font-black text-slate-900">如何成为项目发起人？</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: '1. 点击申请', desc: '阅读并同意协议后，点击下方申请按钮。', icon: UserPlus },
                { title: '2. 提交线索', desc: '在平台提交真实的装修项目需求（如小区名、联系方式等）。', icon: FileText },
                { title: '3. 专业跟进', desc: '良造家专业服务团队介入，进行需求分析与装修公司匹配。', icon: PhoneCall },
                { title: '4. 成功签约', desc: '客户成功与平台推荐的设计师或工长签订合同时，您即获得收益。', icon: CheckCircle2 }
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Earnings Rules */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 bg-blue-500 rounded-full" />
              <h3 className="text-xl font-black text-slate-900">项目发起人收益规则</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <p className="text-blue-100 text-xs font-bold mb-1">设计师合同佣金</p>
                    <h4 className="text-2xl font-black">合同总计 8%</h4>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Palette className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <p className="text-indigo-100 text-xs font-bold mb-1">工长合同佣金</p>
                    <h4 className="text-2xl font-black">合同总计 5%</h4>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Hammer className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 px-2">
                * 佣金结算在项目签约并按节点支付后，发放至您的钱包。
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] space-y-3 pb-safe">
        <div className="flex items-center gap-2 px-2 cursor-pointer" onClick={() => setIsAgreed(!isAgreed)}>
          <input 
            type="checkbox" 
            id="initiator-agreement" 
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 pointer-events-none"
          />
          <label className="text-[11px] text-slate-500 flex items-center">
            点击申请即代表您同意 <button onClick={(e) => { e.stopPropagation(); setShowAgreement(true); }} className="text-amber-600 font-bold ml-1">《项目发起人协议》</button>
          </label>
        </div>
        <button 
          disabled={!isAgreed}
          onClick={() => setShowSuccess(true)}
          className={cn(
            "w-full py-4 text-lg font-black rounded-2xl transition-all shadow-xl",
            isAgreed 
              ? "bg-slate-900 text-white active:scale-95" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          申请成为项目发起人
        </button>
      </div>

      {/* Agreement Modal */}
      <AnimatePresence>
        {showAgreement && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">项目发起人协议</h3>
                <button onClick={() => setShowAgreement(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-600 space-y-4 leading-relaxed">
                <p className="font-bold text-slate-900">1. 发起人身份确认</p>
                <p>项目发起人是自愿在良造家平台提供装修需求线索的个人或单位。所提供线索必须真实有效。</p>
                <p className="font-bold text-slate-900">2. 收益分配</p>
                <p>当线索成功转化为平台签约合同时，平台将按设计师合同8%、工长合同5%的比例向发起人支付佣金。</p>
                <p className="font-bold text-slate-900">3. 隐私保护</p>
                <p>平台承诺对发起人提供的客户信息严格加密，仅用于合法的商业跟进。</p>
                <p className="font-bold text-slate-900">4. 协议中止</p>
                <p>若发现恶意及虚假线索，平台有权立即冻结发起人账号并中止合作。</p>
              </div>
              <div className="p-6 bg-slate-50">
                <button 
                  onClick={() => {
                    setIsAgreed(true);
                    setShowAgreement(false);
                  }}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl"
                >
                  我已阅读并同意
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-sm p-8 flex flex-col items-center text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">申请提交成功</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                提交成功24小时内会有工作人员和你联系，请耐心等待。
              </p>
              <button 
                onClick={() => {
                  setShowSuccess(false);
                  onBack();
                }}
                className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                我知道了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HighEndForemanDetailPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">工长招募</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/foreman-hero/1200/800" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Premium Foreman Program</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
              严选高端工长招募计划<br />
              <span className="text-[#D4AF37] text-lg">为工艺建立真正的尊严</span>
            </h2>
            <p className="text-white/70 text-sm font-medium italic">
              “交付不是拼价格，是拼标准。”
            </p>
          </div>
        </div>

        <div className="p-6 space-y-10 pb-24">
          {/* Section 1: 我们相信 */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-1.5 h-6 bg-[#D4AF37] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              <h3 className="text-xl font-black text-gray-900 tracking-tight">一、我们相信</h3>
            </div>
            
            <div className="relative p-8 bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl group">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4AF37]/5 blur-[60px] rounded-full -ml-24 -mb-24" />
              
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-4">Core Philosophy / 核心理念</p>
                  <div className="h-px w-12 bg-[#D4AF37]/30 mx-auto mb-6" />
                  <div className="text-2xl md:text-3xl font-bold text-white leading-[1.4] tracking-tight">
                    决定房子寿命的<br />
                    <span className="text-gray-400 font-medium text-xl block mt-2 mb-2">不是品牌材料</span>
                    <span className="relative inline-block">
                      而是<span className="text-[#D4AF37] text-3xl md:text-4xl ml-1">施工细节</span>
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#D4AF37]/30 rounded-full" />
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-gray-500 text-[10px] font-mono">
                  <div className="w-8 h-[1px] bg-gray-800" />
                  <span>CRAFTSMANSHIP MATTERS</span>
                  <div className="w-8 h-[1px] bg-gray-800" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 邀请怎样的工长 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#D4AF37] rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">二、我们寻找的工长</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { text: '8年以上项目管理经验', icon: Clock },
                { text: '无重大质量投诉记录', icon: ShieldCheck },
                { text: '稳定施工团队', icon: Users },
                { text: '熟悉高端私宅项目管理', icon: Building2 },
                { text: '愿意接受标准化工艺体系', icon: ClipboardCheck }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center">
              <p className="text-sm text-rose-700 font-bold flex items-center justify-center gap-2">
                <Ban className="w-4 h-4" /> 我们拒绝游击式管理。
              </p>
            </div>
          </section>

          {/* Image Break */}
          <div className="rounded-3xl overflow-hidden h-48 shadow-lg">
            <img 
              src="https://picsum.photos/seed/construction-site/1200/800" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Section 3: 加入后你将获得 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-emerald-500 rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">三、加入后你将获得</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: '稳定高端项目来源', desc: '精准匹配高净值客户需求', icon: Target },
                { title: '标准化工艺体系支持', desc: '全套工艺标准与技术指导', icon: Construction },
                { title: '数字化工地记录系统', desc: '高效管理，过程透明可追溯', icon: Monitor },
                { title: '客户信任背书', desc: '平台严选身份，降低沟通成本', icon: UserCheck },
                { title: '合理利润保障', desc: '拒绝恶意压价，尊重专业价值', icon: Wallet }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">{item.title}</h4>
                    <p className="text-[11px] text-emerald-600/70 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center font-medium mt-2">
              好工长不应该被压价。
            </p>
          </section>

          {/* Section 4: 筛选流程 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">四、筛选流程</h3>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-purple-100" />
              <div className="space-y-6">
                {[
                  { title: '工地现场抽检', desc: '实地考察在施项目质量', icon: Eye },
                  { title: '工艺实操考核', desc: '核心工序现场演示', icon: Hammer },
                  { title: '团队稳定性评估', desc: '核心班组合作年限审核', icon: Users },
                  { title: '客户回访', desc: '真实交付口碑调查', icon: MessageSquare }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center gap-6 pl-2">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-white border-2 border-purple-500 flex items-center justify-center text-[10px] font-bold text-purple-500 shadow-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 p-4 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-purple-900">{item.title}</h4>
                        <p className="text-[10px] text-purple-600/60">{item.desc}</p>
                      </div>
                      <item.icon className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="px-4 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-full border border-rose-100 shadow-sm">
                通过率低于 10%
              </div>
            </div>
          </section>

          {/* Section 5: 我们的底线 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-rose-500 rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">五、我们的底线</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: '不偷工减料', icon: ShieldAlert },
                { title: '不隐蔽违规', icon: Lock },
                { title: '不恶意增项', icon: TrendingDown },
                { title: '不逃避责任', icon: Heart }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-rose-50/30 rounded-2xl border border-rose-100 flex flex-col items-center gap-2 text-center">
                  <item.icon className="w-5 h-5 text-rose-500" />
                  <span className="text-xs font-bold text-rose-700">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="py-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 w-full">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-200" />
                <Award className="w-5 h-5 text-[#D4AF37] opacity-50" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-200" />
              </div>
              <div className="text-center">
                <p className="text-[#D4AF37] font-bold tracking-[0.6em] text-base uppercase ml-[0.6em]">
                  工艺是尊严
                </p>
                <p className="text-[10px] text-gray-400 mt-1 tracking-widest">CRAFTSMANSHIP IS DIGNITY</p>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-30" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-200" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 pb-safe">
        <button className="w-full py-4 bg-gradient-to-r from-[#2C2C2C] to-[#1A1A1A] text-[#D4AF37] font-bold rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all border border-[#D4AF37]/30">
          申请加入严选工长
        </button>
      </div>
    </motion.div>
  );
};

const HighEndStudioDetailPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">招募计划</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/studio-hero/1200/800" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Premium Recruitment</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
              严选高端工作室招募计划<br />
              <span className="text-white/80 text-lg">共建高端私宅交付新标准</span>
            </h2>
            <p className="text-[#D4AF37] text-sm font-medium italic">
              “不是流量合作，是长期交付联盟。”
            </p>
          </div>
        </div>

        <div className="p-6 space-y-10 pb-20">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#D4AF37] rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">一、我们在做什么</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              良知工程致力于构建一个：
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: '可验证', desc: '交付标准体系', icon: CheckCircle2 },
                { title: '可追溯', desc: '施工档案系统', icon: History },
                { title: '可持续', desc: '高端客户来源', icon: Users },
                { title: '可长期', desc: '合作组织平台', icon: Handshake }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <item.icon className="w-5 h-5 text-[#D4AF37] mb-2" />
                  <p className="text-[10px] text-gray-400">{item.title}</p>
                  <p className="text-xs font-bold text-gray-800">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
              <p className="text-sm text-gray-700 font-medium">
                我们不做流量分发平台。<br />
                <span className="text-[#D4AF37] font-bold">我们致力于通过数字化技术重塑家装行业，为每一个从业者和企业提供全方位的数字赋能。</span>
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#D4AF37] rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">二、我们寻找怎样的工作室</h3>
            </div>
            <p className="text-gray-600 text-sm">我们只邀请具备以下能力的团队：</p>
            <div className="space-y-3">
              {[
                '独立设计体系',
                '稳定施工管理结构',
                '自有或深度绑定工人',
                '完整预算与成本控制能力',
                '对交付结果承担长期责任'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{text}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs py-2 italic">
              “我们不追求规模。我们只选择长期主义者。”
            </p>
          </section>

          {/* Image Break */}
          <div className="rounded-3xl overflow-hidden h-48 shadow-lg">
            <img 
              src="https://picsum.photos/seed/studio-design/1200/800" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#D4AF37] rounded-full" />
              <h3 className="text-xl font-bold text-gray-900">三、加入后你将获得</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: '稳定高端客户匹配', icon: Target },
                { title: '数字化项目管理支持', icon: Monitor },
                { title: '品牌背书与标准认证', icon: ShieldCheck },
                { title: '交付标准体系共建权', icon: PenTool },
                { title: '长期合作机制保障', icon: Lock }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">{item.title}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center font-medium">
              你不是入驻平台，<br />
              <span className="text-gray-900">你是成为体系成员。</span>
            </p>
          </section>

          {/* Section 4 & 5 */}
          <div className="grid grid-cols-1 gap-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[#D4AF37] rounded-full" />
                <h3 className="text-xl font-bold text-gray-900">四、筛选机制</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '过往项目实地抽检',
                  '客户回访核验',
                  '交付能力评估',
                  '财务与履约能力审核'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="inline-block px-4 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg border border-rose-100">
                通过率预计低于 20%
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-rose-500 rounded-full" />
                <h3 className="text-xl font-bold text-gray-900">五、我们的底线</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { text: '不恶意增项', icon: Ban },
                  { text: '不转包失控', icon: XCircle },
                  { text: '不虚假宣传', icon: AlertTriangle },
                  { text: '不牺牲质量', icon: TrendingDown }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-rose-50/30 rounded-xl border border-rose-100 flex flex-col items-center gap-2">
                    <item.icon className="w-5 h-5 text-rose-500" />
                    <span className="text-[11px] font-bold text-rose-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-rose-500 text-xs font-bold">
                这是一个对“良知”有要求的组织。
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 pb-safe">
        <button className="w-full py-4 bg-gradient-to-r from-[#2C2C2C] to-[#1A1A1A] text-[#D4AF37] font-bold rounded-2xl shadow-xl shadow-black/10 active:scale-[0.98] transition-all border border-[#D4AF37]/30">
          申请加入严选设计工作室
        </button>
      </div>
    </motion.div>
  );
};

const ProjectRecruitmentDetailPage = ({ item, onBack }: { item: typeof PROJECT_RECRUITMENT_DATA[0]; onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">招募详情</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-[10px] font-bold rounded">
                招募：{item.role}
              </span>
              <span className="text-[10px] text-gray-400">{item.publishTime}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {item.projectName}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 mb-1">建筑面积</p>
              <p className="text-sm font-bold text-gray-900">{item.area}m²</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-[10px] text-gray-400 mb-1">房屋结构</p>
              <p className="text-sm font-bold text-gray-900">{item.houseStructure}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 mb-1">房屋状态</p>
              <p className="text-sm font-bold text-gray-900">{item.houseStatus}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">招募要求</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full border border-purple-100">
                  {tag}
                </span>
              ))}
            </div>
            <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50">
              <p className="text-sm text-gray-600 leading-relaxed">
                该项目位于核心地段，业主对品质要求极高。现诚邀优秀的<span className="font-bold text-purple-600">{item.role}</span>加入团队。
                要求具备相关领域3年以上工作经验，有大型项目成功案例者优先。
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">项目概况</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              项目目前处于{item.houseStatus === '毛坯' ? '方案设计' : '深化设计'}阶段，预计下月正式进场施工。
              我们提供具有竞争力的薪酬体系和广阔的职业发展空间，期待与您共同打造家装精品。
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-50 bg-white">
        <button className="w-full py-4 bg-[#07c160] text-white font-bold rounded-2xl shadow-lg shadow-[#07c160]/20 active:scale-[0.98] transition-all">
          立即申请加入
        </button>
      </div>
    </motion.div>
  );
};

const ProjectLeadGridCard = (props: { item: typeof PROJECT_LEADS_DATA[0]; key?: React.Key }) => {
  const { item } = props;
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-3"
    >
      <div className="relative h-32 overflow-hidden">
        <img src={item.cover} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-2 left-2">
          <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            项目线索
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-[11px] font-bold text-gray-800 line-clamp-2 mb-2">{item.title}</h3>
        <div className="flex items-center gap-1.5 text-[9px] text-gray-400 mb-2">
          <MapPin className="w-2.5 h-2.5" />
          <span className="truncate">{item.community}</span>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <span className="text-[9px] text-gray-400">{item.publishTime.split(' ')[0]}</span>
          <span className="text-[10px] font-bold text-emerald-600">{item.area}m²</span>
        </div>
      </div>
    </motion.div>
  );
};

const CaseListPage = (props: { onBack: () => void; onSelectCase: (item: typeof CASE_DATA[0]) => void; key?: React.Key }) => {
  const { onBack, onSelectCase } = props;
  // Split data into two columns for waterfall effect
  const leftCol = CASE_DATA.filter((_, i) => i % 2 === 0);
  const rightCol = CASE_DATA.filter((_, i) => i % 2 !== 0);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">项目线索</h2>
      </div>

      <div className="px-3 py-4 grid grid-cols-2 gap-3 items-start">
        <div className="flex flex-col gap-3">
          {leftCol.map((item) => (
            <CaseCard key={item.id} item={item} onClick={() => onSelectCase(item)} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {rightCol.map((item) => (
            <CaseCard key={item.id} item={item} onClick={() => onSelectCase(item)} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CaseCard = (props: { item: typeof CASE_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
  <motion.div 
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
  >
    <div className={cn("relative w-full overflow-hidden", item.height)}>
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      {/* Content Type Indicator */}
      <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm p-1 rounded-md">
        {item.contentType === 'video' ? (
          <Play className="w-3 h-3 text-white fill-current" />
        ) : (
          <Layers className="w-3 h-3 text-white" />
        )}
      </div>
      {/* Hook Title Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
        <p className="text-white text-[11px] font-medium leading-tight drop-shadow-sm">
          {item.hookTitle}
        </p>
      </div>
    </div>
    <div className="p-2.5">
      <h3 className="text-[11px] font-normal text-gray-600 line-clamp-2 mb-2 leading-snug">
        {item.title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full flex-shrink-0" />
          <span className="text-[9px] text-gray-400 truncate">{item.author}</span>
        </div>
        <div className="flex items-center gap-0.5 text-gray-400">
          <Heart className="w-2.5 h-2.5" />
          <span className="text-[9px]">{item.likes}</span>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const CraftsmanCard = (props: { item: typeof CRAFTSMAN_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-3"
    >
      <div className="relative h-32 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-[#07c160] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            从业者认证
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full border border-gray-100" />
          <div>
            <h3 className="text-xs font-bold text-gray-900">{item.name}</h3>
            <p className="text-[9px] text-gray-400">{item.title} · {item.experience}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="text-[8px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded-md border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-orange-400" />
            <span className="text-[10px] font-bold text-orange-400">{item.rating}</span>
          </div>
          <button className="text-[9px] font-bold text-[#07c160] hover:underline">查看详情</button>
        </div>
      </div>
    </motion.div>
  );
};

const SandboxSchemeCard = (props: { item: typeof SANDBOX_SCHEME_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-3"
    >
      <div className="relative h-[182px] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-purple-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            项目招募
          </span>
        </div>
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
            <Box className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-[11px] font-bold text-gray-800 line-clamp-2 mb-2">{item.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full flex-shrink-0" />
            <span className="text-[9px] text-gray-400 truncate">{item.author}</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-400">
            <Heart className="w-2.5 h-2.5" />
            <span className="text-[9px]">{item.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RealRenovationCard = (props: { item: typeof REAL_RENOVATION_DATA[0]; onClick?: () => void; key?: React.Key }) => {
  const { item, onClick } = props;
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-3"
    >
      <div className="relative h-[182px] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            从业者圈子
          </span>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
          <span className="text-white text-[8px]">业主直发</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-[11px] font-bold text-gray-800 line-clamp-2 mb-2 leading-tight">{item.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full flex-shrink-0" />
            <span className="text-[9px] text-gray-400 truncate">{item.author}</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-400">
            <Heart className="w-2.5 h-2.5" />
            <span className="text-[9px]">{item.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ListSection = (props: { 
  onSelectCase: (item: any) => void; 
  onSearchClick: () => void;
}) => {
  const { onSelectCase, onSearchClick } = props;
  
  // Interleave leads and recruitment for Business Opportunities (Discovery) section
  const sortedLeads = [...PROJECT_LEADS_DATA].map(l => ({ ...l, type: 'lead' as const })).sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
  const sortedRecruitments = [...PROJECT_RECRUITMENT_DATA].map(r => ({ ...r, type: 'recruitment' as const })).sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
  
  const discoveryData = [];
  const maxLength = Math.max(sortedLeads.length, sortedRecruitments.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < sortedLeads.length) discoveryData.push(sortedLeads[i]);
    if (i < sortedRecruitments.length) discoveryData.push(sortedRecruitments[i]);
  }

  const currentData = discoveryData;

  return (
    <div className="px-3 mt-4">
      {/* Tabs Bar - Sticky below Title Bar when scrolling */}
      <div className="sticky top-[54px] z-[50] bg-gray-50 flex items-center justify-between border-b border-gray-200/50 -mx-3 px-4 h-[48px] mb-2">
        <div className="flex items-center gap-8 h-full">
          <button 
            className="h-full flex items-center text-[15px] font-bold transition-all relative px-1 text-gray-900"
          >
            线索
            <motion.div 
              layoutId="activeTab" 
              className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#07c160] rounded-t-full" 
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-6">
        {currentData.map((item) => {
          if (item.type === 'lead') {
            return <ProjectLeadCard key={item.id} item={item as any} onClick={() => onSelectCase(item)} />;
          }
          if (item.type === 'recruitment') {
            return <ProjectRecruitmentCard key={item.id} item={item as any} onClick={() => onSelectCase(item)} />;
          }
          return null;
        })}
      </div>
      
      <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-2">
        <div className="w-5 h-5 border-2 border-gray-200 border-t-[#07c160] rounded-full animate-spin" />
        <span className="text-xs">努力加载中</span>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'projects', label: '项目', icon: Building2 },
    { id: 'messages', label: '消息', icon: MessageSquare },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-gray-100/50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]" />
      
      <div className="relative px-2 h-16 pb-safe flex items-center justify-between gap-0.5">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center h-full relative group transition-all duration-300"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "transition-all duration-300 flex items-center justify-center relative",
                  cn(
                    "p-1.5 rounded-xl",
                    isActive ? "text-amber-500" : "text-gray-400 group-hover:text-gray-600"
                  )
                )}
              >
                <tab.icon className={cn(
                  "w-6 h-6", 
                  isActive ? "stroke-[2.5px]" : "stroke-[2px]"
                )} />
              </motion.div>
              <span className={cn(
                "text-[10px] font-bold transition-all duration-300 whitespace-nowrap mt-0.5",
                isActive ? "text-amber-500" : "text-gray-400"
              )}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-1 w-1 h-1 bg-amber-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface OrgNode {
  id: string;
  name: string;
  role: string;
  responsibility: string;
  power: string;
  interest: string;
  metrics: { label: string; value: string }[];
  parentId?: string;
  children?: OrgNode[];
}

const CITY_ORGS: Record<string, OrgNode> = {
  '平台': {
    id: 'hq-brain',
    name: '良造家运营组织',
    role: '平台总部与战略决策中心',
    responsibility: '负责全国区域运营统筹、平台系统架构搭建、数字化赋能及整体平台战略盈利。',
    power: '最高级决策权、核心资源分配与合伙人网域准入权',
    interest: '平台整体经营利润及估值溢价',
    metrics: [
      { label: '授权城市', value: '18城' },
      { label: '平台满意度', value: '99.5%' }
    ],
    children: [
      {
        id: 'hq-large-flat',
        name: '大平层赋能中心',
        role: '大平层业务运营主体',
        responsibility: '负责全国大平层业务的标准化输出、服务体系建设及大平层专项产值达成。',
        power: '大平层业务标准发布权、人事任免权与分配权',
        interest: '大平层业务线全盘营收分润',
        metrics: [
          { label: '覆盖城市', value: '12城' },
          { label: '转化提升', value: '32%' }
        ]
      },
      {
        id: 'hq-eco-villa',
        name: '经济型别墅赋能中心',
        role: '经济型别墅业务运营主体',
        responsibility: '负责经济型别墅的供应链整合、施工标准沉淀及专项利润中心经营。',
        power: '经济型别墅产品线定价权、相关建管网域准入权',
        interest: '经济型别墅线整体利润分成',
        metrics: [
          { label: '项目体量', value: '350套+' },
          { label: '利润增比', value: '18%' }
        ]
      },
      {
        id: 'hq-luxury-house',
        name: '大宅豪宅赋能中心',
        role: '高端大宅业务运营主体',
        responsibility: '提供大宅豪宅的高端定制化服务标准，把控顶级交付质检，对高端单值的盈利负责。',
        power: '顶级交付标准的驳回权、高端工长考评权',
        interest: '豪宅单列业务线高溢价分红',
        metrics: [
          { label: '均单价', value: '350w+' },
          { label: '高净值客群', value: '45%' }
        ]
      },
      {
        id: 'hq-small-commerce',
        name: '小商装赋能中心',
        role: '商装业务运营主体',
        responsibility: '专注拓展轻量级商业空间（咖啡店、买手店等）的快速交付模板，统一小商装规范与增长。',
        power: '商装公装模块审核权、快消类合作商户优选权',
        interest: '商装项目整体收益跨度阶梯式抽成',
        metrics: [
          { label: '月交付', value: '85套' },
          { label: '工期缩短', value: '25%' }
        ]
      },
      {
        id: 'hq-city-empower',
        name: '城市运营赋能中心',
        role: '地方合作与系统赋能',
        responsibility: '全面赋能各下沉城市运营中心，包括流量分发规则制定、系统化工具研发提供与品牌管理。',
        power: '城市入驻考核权、中心支持资源调配限制权',
        interest: '各城市运营组织缴纳的运营费提取与分成',
        metrics: [
          { label: '赋能建联', value: '45座' },
          { label: '工具日活', value: '1.2w' }
        ]
      }
    ]
  },
  '北京': {
    id: 'bj-brain',
    name: '北京城市运营大脑',
    role: '决策与指挥中心',
    responsibility: '负责北京全市的市场占有率、品质交付及城市盈亏平衡。',
    power: '决策权、资源分配权、结算审计权',
    interest: '获得城市总利润的分成及官方年度荣誉金牌团队',
    metrics: [
      { label: '市场占有率', value: '18.5%' },
      { label: '满意度', value: '98.2%' }
    ],
    children: [
      {
        id: 'bj-design',
        name: '北京全案设计中心',
        role: '方案研发与转化',
        responsibility: '负责高品质方案研发与线索的高效转化。',
        power: '方案定价建议权、设计师考评权',
        interest: '转化佣金收益 + 溢价奖励',
        metrics: [{ label: '转化率', value: '32%' }],
        children: [
          {
            id: 'bj-design-t1',
            name: '高端私宅组',
            role: '执行终端',
            responsibility: '完成大宅全案设计任务。',
            power: '选材建议权',
            interest: '设计项目费提成',
            metrics: [{ label: '均价', value: '¥2500/㎡' }]
          }
        ]
      },
      {
        id: 'bj-delivery',
        name: '北京卓越交付组织',
        role: '品质落地与监控',
        responsibility: '负责所有项目的工程质量、工期及工人关怀。',
        power: '工艺标准制定权、施工暂停预警权',
        interest: '交付激励金 + 工效提升奖励',
        metrics: [{ label: '工期延误', value: '0.5%' }]
      }
    ]
  },
  '上海': {
    id: 'sh-brain',
    name: '上海城市运营大脑',
    role: '指挥枢纽',
    responsibility: '负责上海区域数字化运营及标准落地。',
    power: '区域资源调配权',
    interest: '分成奖励',
    metrics: [{ label: '项目数', value: '245' }],
    children: []
  }
};

const INTER_ORG_CONTRACTS = [
  {
    id: 'c000',
    from: '良造家运营组织',
    to: '北京城市运营大脑',
    subject: '城市合伙人授权与特许经营协议',
    tasks: ['完成年度北京区域5000万GMV目标', '落实“良造家”数字化工地标准100%覆盖', '建立不少于10个核心服务商生态'],
    status: '已生效',
    assignedTo: ['北京城市经理', '合伙人委员会']
  },
  {
    id: 'c-sh-000',
    from: '良造家运营组织',
    to: '上海城市运营大脑',
    subject: '长三角核心城市合伙人先锋发展协议',
    tasks: ['首年达成上海市8000万产值突围', '构建华东区Top5级别供应链前置仓网络', '建立覆盖浦东浦西的双核心展厅布局'],
    status: '已生效',
    assignedTo: ['上海主理人', '华东区拓展委员会']
  },
  {
    id: 'c001',
    from: '北京城市运营大脑',
    to: '北京全案设计中心',
    subject: '2024年Q2 转化效能提升计划',
    tasks: ['完成50个大宅项目转化', '提升全案材料包签约率至45%'],
    status: '进行中',
    assignedTo: ['王设计师', '李总监']
  },
  {
    id: 'c002',
    from: '北京城市运营大脑',
    to: '北京卓越交付组织',
    subject: '匠心工程标准化落地',
    tasks: ['实现100%项目节点在线验收', '开展3场老师傅带徒弟实训营'],
    status: '已签署',
    assignedTo: ['张工长']
  },
  {
    id: 'c003',
    from: '良造家运营组织',
    to: '大平层赋能中心',
    subject: '大平层业务线独立运营与产值对赌协议',
    tasks: ['完成12个核心城市的大平层标准体系落地', '年度大平层转化率提升32%', '输出3套顶级大平层服务SOP'],
    status: '已生效',
    assignedTo: ['大平层业务总裁']
  },
  {
    id: 'c004',
    from: '良造家运营组织',
    to: '经济型别墅赋能中心',
    subject: '经济型别墅供应链整合与利润增长协议',
    tasks: ['整合全国Top20经墅特供供应链材料', '实现350套经墅标准化极速交付', '业务线整体利润率提升18%'],
    status: '已生效',
    assignedTo: ['经墅事业部总经理']
  },
  {
    id: 'c005',
    from: '良造家运营组织',
    to: '大宅豪宅赋能中心',
    subject: '高端净值客群攻坚与高溢价单项合约',
    tasks: ['组建50人顶级大师设计团队', '攻克均单价350w+的超级别墅订单', '打造年度10大全国标杆豪宅项目'],
    status: '已生效',
    assignedTo: ['大宅事业部合伙人']
  },
  {
    id: 'c006',
    from: '良造家运营组织',
    to: '小商装赋能中心',
    subject: '轻量商装极速交付与规模化拓店协议',
    tasks: ['研发并发布咖啡/美业类快装模板', '达成月均交付85套轻量级商铺目标', '建立针对商装的公装快速核价模型'],
    status: '已生效',
    assignedTo: ['公装业务线主理人']
  },
  {
    id: 'c007',
    from: '良造家运营组织',
    to: '城市运营赋能中心',
    subject: '全国城市节点数字化运营赋能军令状',
    tasks: ['完成45座加盟城市的系统上线与人员培训', '保障核心管理工具日均活跃人数超1.2w', '制定并下发全国客资统一流转路由规则'],
    status: '已生效',
    assignedTo: ['赋能中心执行官']
  }
];

const OperationsCenterPage = ({ city, onCityChange, onWorkspaceToggle }: { city: string, onCityChange?: (city: string) => void, onWorkspaceToggle?: (active: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState<'workbench' | 'architecture' | 'contracts'>('workbench');
  const [viewingOrgId, setViewingOrgId] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<OrgNode | null>(null);
  
  useEffect(() => {
    onWorkspaceToggle?.(!!viewingOrgId);
    return () => onWorkspaceToggle?.(false);
  }, [viewingOrgId, onWorkspaceToggle]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isEditingContract, setIsEditingContract] = useState<any>(null);
  
  const [showExecutorPhone, setShowExecutorPhone] = useState(false);
  const [showVerifierPhone, setShowVerifierPhone] = useState(false);
  const [homeTaskFilter, setHomeTaskFilter] = useState<'all' | 'executor' | 'verifier' | 'creator'>('all');
  const [newTaskLevel, setNewTaskLevel] = useState('重要紧急');
  const [isTaskDetailsLevelOpen, setIsTaskDetailsLevelOpen] = useState(false);

  const TASK_LEVEL_OPTIONS = [
    { id: '重要紧急', icon: AlertCircle, iconColor: 'text-rose-500', activeBg: 'bg-rose-50', activeBorder: 'border-rose-200' },
    { id: '不重要紧急', icon: Zap, iconColor: 'text-amber-500', activeBg: 'bg-amber-50', activeBorder: 'border-amber-200' },
    { id: '重要不紧急', icon: Target, iconColor: 'text-blue-500', activeBg: 'bg-blue-50', activeBorder: 'border-blue-200' },
    { id: '不重要不紧急', icon: CheckCircle2, iconColor: 'text-gray-500', activeBg: 'bg-gray-50', activeBorder: 'border-gray-200' }
  ];

  // New Workspace Management States
  const [activeModal, setActiveModal] = useState<'task' | 'contract' | 'org' | 'invite' | null>(null);
  const [activeSubPage, setActiveSubPage] = useState<'main' | 'org_settings' | 'member_management'>('main');
  const [isDraftingContractPage, setIsDraftingContractPage] = useState(false);
  const [selectedContractTargetOrg, setSelectedContractTargetOrg] = useState<OrgNode | null>(null);
  const [contractStep, setContractStep] = useState(1);
  const [workspaceTab, setWorkspaceTab] = useState<'tools' | 'todo' | 'org'>('tools');
  const [activeTool, setActiveTool] = useState<'tasks' | 'contracts'>('tasks');
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const [showOnlyJoined, setShowOnlyJoined] = useState(true);
  const [showOnlyUnsigned, setShowOnlyUnsigned] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, name: '我', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me', joinTime: '2023-10-01', role: 'owner' },
    { id: 2, name: 'Tony', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tony', joinTime: '2023-10-01', role: 'admin' },
    { id: 3, name: '李丽', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LiLi', joinTime: '2023-11-15', role: 'admin' },
    { id: 4, name: '张明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZhangMing', joinTime: '2024-01-20', role: 'member' },
    { id: 5, name: '王强', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WangQiang', joinTime: '2024-02-10', role: 'member' }
  ]);
  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, name: '北京城市运营大脑-性能优化', content: '优化实时调度算法响应速度', deadline: '2024-05-20', executor: '张明', executorOrg: '软件研发中心', verifier: '王强', verifierOrg: '总部技术办', status: 'executing', org: '北京城市运营大脑', creator: '我', level: '重要紧急' },
    { id: 2, name: '全案设计中心-方案初审', content: '审核万科翡翠项目首稿', deadline: '2024-04-25', executor: '我', executorOrg: '-', verifier: '李丽', verifierOrg: '全案设计中心', status: 'verifying', org: '北京全案设计中心', creator: '李阳', level: '重要不紧急' },
  ]);

  const MOCK_ORCHESTRATORS = [
    { name: '张明', phone: '13811112222', orgs: ['软件研发中心', '北京城市运营大脑'] },
    { name: '王强', phone: '13933334444', orgs: ['北京城市运营大脑', '总部技术办'] },
    { name: '李丽', phone: '13755556666', orgs: ['全案设计中心', '空间研究实验室'] },
    { name: '赵武', phone: '13677778888', orgs: ['上海区域运营', '供应链中心'] },
  ];

  // Mock: User belongs to this organization
  const MY_ORG_IDS = ['bj-brain', 'bj-design', 'hq-brain'];

  const cityOrg = CITY_ORGS[city] || CITY_ORGS['北京'];

  const findOrgById = (node: OrgNode, id: string): OrgNode | null => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findOrgById(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const currentViewingOrg = viewingOrgId ? findOrgById(cityOrg, viewingOrgId) : null;

  const getAllOrgsInTree = (node: OrgNode): OrgNode[] => {
    let orgs = [node];
    if (node.children) {
      node.children.forEach(child => {
        orgs = [...orgs, ...getAllOrgsInTree(child)];
      });
    }
    return orgs;
  };

  const getUnsignedOrgs = () => {
    const allOrgs = getAllOrgsInTree(cityOrg);
    // An org is signed if it is a 'to' in any contract
    const signedOrgNames = new Set(INTER_ORG_CONTRACTS.map(c => c.to));
    return allOrgs.filter(org => !signedOrgNames.has(org.name));
  };

  const unsignedOrgs = getUnsignedOrgs();

  const findParentOrg = (root: OrgNode, targetId: string): OrgNode | null => {
    if (root.children) {
      for (const child of root.children) {
        if (child.id === targetId) return root;
        const found = findParentOrg(child, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const getOrgNamesInTree = (node: OrgNode): string[] => {
    let names = [node.name];
    if (node.children) {
      node.children.forEach(child => {
        names = names.concat(getOrgNamesInTree(child));
      });
    }
    return names;
  };

  const currentSystemOrgNames = new Set(getOrgNamesInTree(cityOrg));

  const getVisibleOrgs = () => {
    const allOrgs = getAllOrgsInTree(cityOrg);
    const signedOrgNames = new Set(INTER_ORG_CONTRACTS.map(c => c.to));
    
    // If no filters are active, we return null to signal tree view should be used
    if (!showOnlyJoined && !showOnlyUnsigned) return null;

    return allOrgs.filter(node => {
      const joinedMatch = !showOnlyJoined || MY_ORG_IDS.includes(node.id);
      const unsignedMatch = !showOnlyUnsigned || !signedOrgNames.has(node.name);
      return joinedMatch && unsignedMatch;
    });
  };

  const filteredOrgs = getVisibleOrgs();

  const OrgCard = ({ node, depth = 0, isFlat = false }: { node: OrgNode; depth?: number; isFlat?: boolean; key?: string }) => {
    const isJoined = MY_ORG_IDS.includes(node.id);
    const hasContracts = INTER_ORG_CONTRACTS.some(c => c.to === node.name || c.from === node.name);
    
    // Calculate standard metrics
    const memberCount = MOCK_ORCHESTRATORS.filter(orchestrator => 
      orchestrator.orgs.some(org => node.name.includes(org) || org.includes(node.name))
    ).length + (node.name === '良造家运营组织' ? 120 : (node.children?.length ? 15 : 5));
    
    const taskCount = pendingTasks.filter(task => 
      task.org === node.name && (task.status === 'executing' || task.status === 'verifying')
    ).length;

    return (
      <div className="space-y-4">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedOrg(node)}
          className={cn(
            "p-5 rounded-[32px] border transition-all cursor-pointer relative overflow-hidden",
            selectedOrg?.id === node.id 
              ? "border-amber-500 bg-amber-50 shadow-lg shadow-amber-500/10" 
              : "border-gray-100 bg-white"
          )}
          style={{ marginLeft: isFlat ? 0 : depth * 12 }}
        >
          {isJoined && (
            <div className="absolute top-0 right-0">
              <div className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-2xl shadow-sm uppercase tracking-tighter">
                已加入
              </div>
            </div>
          )}
          
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
                depth === 0 && !isFlat ? "bg-amber-600 text-white" : (!hasContracts ? "bg-amber-50 text-amber-500" : "bg-gray-100 text-gray-400")
              )}>
                {depth === 0 && !isFlat ? <Cpu className="w-5 h-5" /> : (!hasContracts ? <FileX className="w-5 h-5" /> : <Users className="w-5 h-5" />)}
              </div>
              <div>
                <h4 className={cn("font-black text-sm", isJoined ? "text-emerald-700" : "text-gray-900")}>{node.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{node.role}</p>
              </div>
            </div>
            <div className="flex gap-1.5">
               {[
                 { label: '成员', value: `${memberCount}人` },
                 { label: '任务', value: `${taskCount}项` }
               ].map((m, i) => (
                <div key={i} className="px-3 py-1 bg-gray-50 rounded-xl border border-gray-100/50 flex flex-col items-center min-w-[48px]">
                  <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">{m.label}</p>
                  <p className="text-[11px] font-black text-gray-800 tabular-nums">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        {!isFlat && node.children?.map(child => (
          <OrgCard key={child.id} node={child} depth={depth + 1} />
        ))}
      </div>
    );
  };

  const OrgDetailPage = ({ node }: { node: OrgNode }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full space-y-6"
    >
      <div className="flex items-center gap-4">
        <button onClick={() => setViewingOrgId(null)} className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-black text-gray-900">{node.name}</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{node.role}</p>
        </div>
      </div>

      {/* Internal Dashboard Mock */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-black text-sm text-gray-900">组织运行健康度</h5>
            <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg">运行良好</div>
          </div>
          <div className="h-32 flex items-end gap-2 px-2 pb-2">
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-100 rounded-lg relative overflow-hidden group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className="absolute bottom-0 left-0 right-0 bg-amber-400 group-hover:bg-amber-500 transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1 text-[9px] text-gray-400 font-bold uppercase">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">活跃成员</p>
          <p className="text-xl font-black text-gray-900">24 / 32</p>
          <div className="flex -space-x-1.5 mt-3">
             {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white" />)}
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">待办指令</p>
          <p className="text-xl font-black text-gray-900">08</p>
          <div className="flex items-center gap-1 text-[9px] text-rose-500 font-bold mt-3">
            <AlertCircle className="w-3 h-3" /> 3项已逾期
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-[32px] p-6 text-white space-y-4 shadow-2xl">
         <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-sm uppercase tracking-widest">我的职权卡</h3>
         </div>
         <p className="text-[11px] text-white/60 leading-relaxed font-medium">
            作为成员，您在此组织中被授予 <span className="text-amber-400">方案定价权</span> 与 <span className="text-amber-400">资源调配优先受取权</span>。请遵循组织间合约执行您的职责。
         </p>
         <button className="w-full py-3.5 bg-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all">
            下载组织身份证明 (NFT)
         </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col h-screen overflow-hidden pb-safe">
      {isDraftingContractPage ? (
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDraftingContractPage(false)} 
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg font-black text-gray-900 leading-tight">组织合约拟定中心</h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-[10px] font-black text-emerald-600/70 uppercase tracking-widest">城市节点: {city}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {unsignedOrgs.length > 0 ? (
              <div className="max-w-2xl mx-auto space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">待签约组织列表 ({unsignedOrgs.length})</h3>
                  </div>
                  <p className="text-xs text-gray-400 font-bold leading-relaxed px-4">
                    以下是在当前运营中心体系下已创建但尚未签署核心责权利合约的组织，请点击进入拟定流程。
                  </p>
                </div>

                <div className="grid gap-4">
                  {unsignedOrgs.map(org => (
                    <motion.div
                      key={org.id}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedContractTargetOrg(org);
                        setActiveModal('contract');
                        setContractStep(1);
                      }}
                      className="group p-6 bg-white border border-gray-100 rounded-[32px] hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/5 transition-all cursor-pointer flex items-center justify-between relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5 -mr-4 -mt-4 transform rotate-12 group-hover:rotate-0 transition-transform">
                        <FileText className="w-20 h-20" />
                      </div>
                      <div className="flex items-start gap-5 relative z-10">
                        <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-sm">
                          <Users className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <h4 className="text-base font-black text-gray-900 group-hover:text-amber-600 transition-colors">{org.name}</h4>
                             <span className="text-[9px] font-black bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">待签约</span>
                          </div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{org.role}</p>
                          <div className="flex items-center gap-4 mt-3">
                            {org.metrics.slice(0, 2).map((m, i) => (
                              <div key={i} className="flex flex-col">
                                <span className="text-[9px] text-gray-300 font-black uppercase tracking-tight">{m.label}</span>
                                <span className="text-[11px] font-black text-gray-600">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all">
                        <Plus className="w-6 h-6" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-500 animate-pulse">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg border border-emerald-100 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">合约体系已全量对赌</h3>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-wide">
                    恭喜！当前 {city} 运营中心体系下的所有组织已全部起草并生效了核心责权利合约。
                  </p>
                </div>
                <button 
                  onClick={() => setIsDraftingContractPage(false)}
                  className="w-full py-4 bg-gray-900 text-white rounded-[24px] text-xs font-black uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95 transition-all"
                >
                  返回工作台
                </button>
              </div>
            )}
          </div>
        </div>
      ) : viewingOrgId && currentViewingOrg ? (
        <div className="flex-1 overflow-hidden flex flex-col bg-[#fdfdfd]">
          {/* Workspace Header */}
          <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewingOrgId(null)} 
                className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-lg font-black text-gray-900 leading-tight">{currentViewingOrg.name}·工作台</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-[10px] font-black text-amber-600/70 uppercase tracking-widest">{currentViewingOrg.role}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSettingsDrawerOpen(true)}
                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all active:scale-95 group"
                title="管理设置"
              >
                <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
              </button>
            </div>
          </div>

          {/* Workspace Tabs */}
          <div className="px-6 py-3 bg-white border-b border-gray-100 shrink-0 overflow-x-auto custom-scrollbar no-scrollbar">
            <div className="flex gap-1 min-w-max">
              {[
                { id: 'tools', label: '我的工具', icon: Briefcase },
                { id: 'todo', label: '待办中心', icon: Bell },
                { id: 'org', label: '下级架构', icon: Share2 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setWorkspaceTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                    workspaceTab === tab.id 
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" 
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#fafafa]">
            <AnimatePresence mode="wait">
              <motion.div
                key={workspaceTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 pb-20"
              >
                {workspaceTab === 'tools' && (
                  <div className="space-y-6">
                    <div className="flex bg-white/50 p-1 rounded-2xl border border-gray-100">
                      {[
                        { id: 'tasks', label: '任务管理', icon: CheckCircle2 },
                        { id: 'contracts', label: '合约中心', icon: Handshake }
                      ].map(tool => (
                        <button
                          key={tool.id}
                          onClick={() => setActiveTool(tool.id as any)}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            activeTool === tool.id 
                              ? "bg-white text-gray-900 shadow-sm border border-gray-100" 
                              : "text-gray-400 hover:text-gray-600"
                          )}
                        >
                          <tool.icon className="w-3.5 h-3.5" />
                          {tool.label}
                        </button>
                      ))}
                    </div>

                    {activeTool === 'tasks' ? (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">组织任务</h3>
                          </div>
                          <button 
                            onClick={() => setActiveModal('task')}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            发起任务
                          </button>
                        </div>

                        <div className="space-y-3">
                          {pendingTasks.filter(t => t.org === currentViewingOrg.name).length > 0 ? (
                            pendingTasks.filter(t => t.org === currentViewingOrg.name).map(task => (
                              <div key={task.id} className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="flex items-start justify-between mb-3">
                                  <h4 className="font-black text-sm text-gray-900 group-hover:text-amber-600 transition-colors">{task.name}</h4>
                                  <div className={cn(
                                    "px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                    task.status === 'executing' ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"
                                  )}>
                                    {task.status === 'executing' ? '进行中' : '待验收'}
                                  </div>
                                </div>
                                <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{task.content}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                  <div className="flex items-center gap-4">
                                    <div className="space-y-0.5">
                                      <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">执行人</p>
                                      <p className="text-[10px] font-bold text-gray-700">{task.executor}</p>
                                    </div>
                                    <div className="space-y-0.5">
                                      <p className="text-[8px] text-gray-400 font-black uppercase tracking-widest">验收人</p>
                                      <p className="text-[10px] font-bold text-gray-700">{task.verifier}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-[10px] font-black">{task.deadline}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                              <div className="w-16 h-16 bg-white rounded-[28px] border border-gray-100 flex items-center justify-center text-gray-200">
                                <CheckCircle2 className="w-8 h-8" />
                              </div>
                              <div>
                                <p className="text-sm font-black text-gray-900 uppercase tracking-tight">暂无任务指令</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">点击右上角发起首个组织任务</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-indigo-500 rounded-full" />
                          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">组织协作合约</h3>
                        </div>

                        {INTER_ORG_CONTRACTS.filter(c => c.to === currentViewingOrg.name || c.from === currentViewingOrg.name).length > 0 ? (
                          <div className="space-y-4">
                            {INTER_ORG_CONTRACTS.filter(c => c.to === currentViewingOrg.name || c.from === currentViewingOrg.name).map(contract => (
                              <div key={contract.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1">
                                    <h4 className="font-black text-sm text-gray-900">{contract.subject}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                      主体: {contract.from} → {contract.to}
                                    </p>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      setIsEditingContract(contract);
                                      setActiveModal('contract');
                                    }}
                                    className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="space-y-2">
                                  {contract.tasks.map((task, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-2xl">
                                      <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                      </div>
                                      <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{task}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="pt-2 flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    {contract.status}
                                  </div>
                                  <div className="text-[9px] text-gray-400 font-bold">最后更新: 2024-04-15</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-white rounded-[28px] border border-gray-100 flex items-center justify-center text-gray-200">
                              <Handshake className="w-8 h-8" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-gray-900 uppercase tracking-tight">尚未签署任何合约</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 px-10 leading-relaxed">
                                该组织目前处于孤立运行状态，请联系上级组织或平台进行责权利合约对标，以获取运营授权。
                              </p>
                              <button 
                                onClick={() => setIsDraftingContractPage(true)}
                                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                              >
                                前往合约拟定中心
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {workspaceTab === 'org' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-rose-500 rounded-full" />
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">下级架构</h3>
                      </div>
                      <button 
                        onClick={() => setActiveModal('org')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/10"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        创建下级组织
                      </button>
                    </div>

                    <div className="space-y-4">
                      {currentViewingOrg.children && currentViewingOrg.children.length > 0 ? (
                        currentViewingOrg.children.map(child => (
                          <OrgCard key={child.id} node={child} depth={0} />
                        ))
                      ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-16 h-16 bg-white rounded-[28px] border border-gray-100 flex items-center justify-center text-gray-200">
                            <Share2 className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">暂无下级架构</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">该组织为目前的叶子节点</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {workspaceTab === 'todo' && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">待办任务处理</h3>
                    </div>

                    <div className="space-y-10">
                      {/* Section 1: Execution */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-2 text-indigo-600">
                            <Activity className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest text-indigo-900/40">需要我执行</span>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {pendingTasks.filter(t => t.executor === '我' && t.org === currentViewingOrg.name).length} 项
                          </span>
                        </div>
                        <div className="space-y-3">
                          {pendingTasks.filter(t => t.executor === '我' && t.org === currentViewingOrg.name).length > 0 ? (
                            pendingTasks.filter(t => t.executor === '我' && t.org === currentViewingOrg.name).map(task => (
                              <div 
                                key={task.id} 
                                onClick={() => setSelectedTask(task)}
                                className="bg-white p-5 rounded-[28px] border border-indigo-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                              >
                                <div className="flex items-center justify-between mb-3 text-left">
                                  <div className="text-[10px] font-black text-gray-400">{task.deadline} 截止</div>
                                  <div className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase">执行</div>
                                </div>
                                <h4 className="font-black text-sm text-gray-900 mb-1 text-left">{task.name}</h4>
                                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed text-left">{task.content}</p>
                                <button className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]">
                                  提交任务成果
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 bg-white/40 rounded-[28px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest tracking-widest">暂无执行任务</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section 2: Verification */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                          <div className="flex items-center gap-2 text-purple-600">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest text-purple-900/40">需要我验收</span>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {pendingTasks.filter(t => t.verifier === '我' && t.org === currentViewingOrg.name).length} 项
                          </span>
                        </div>
                        <div className="space-y-3">
                          {pendingTasks.filter(t => t.verifier === '我' && t.org === currentViewingOrg.name).length > 0 ? (
                            pendingTasks.filter(t => t.verifier === '我' && t.org === currentViewingOrg.name).map(task => (
                              <div 
                                key={task.id} 
                                onClick={() => setSelectedTask(task)}
                                className="bg-white p-5 rounded-[28px] border border-purple-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                              >
                                <div className="flex items-center justify-between mb-3 text-left">
                                  <div className="text-[10px] font-black text-gray-400">来自: {task.executor}</div>
                                  <div className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-lg text-[9px] font-black uppercase">验收</div>
                                </div>
                                <h4 className="font-black text-sm text-gray-900 mb-1 text-left">{task.name}</h4>
                                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed text-left">{task.content}</p>
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                  <button className="py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-[0.98]">
                                    验收通过
                                  </button>
                                  <button className="py-2.5 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all active:scale-[0.98]">
                                    驳回重做
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 bg-white/40 rounded-[28px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest tracking-widest">暂无验收申请</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Node Detail Bottom Sheet (Synced with Operations Architecture) */}
            <AnimatePresence>
              {selectedOrg && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedOrg(null)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
                  />
                  
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-[40px] px-6 pt-2 pb-12 text-white z-[111] shadow-[0_-8px_40px_rgba(0,0,0,0.4)] max-h-[85vh] overflow-y-auto"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-1 bg-white/20 rounded-full" />
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full -mr-16 -mt-16 pointer-events-none z-0" />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                          <h5 className="font-black text-xl text-amber-400">组织概况</h5>
                          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{selectedOrg.name}</p>
                        </div>
                        <button onClick={() => setSelectedOrg(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer relative z-20">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {MY_ORG_IDS.includes(selectedOrg.id) && selectedOrg.id !== viewingOrgId && (
                        <div className="space-y-3 relative z-10">
                          <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                              setViewingOrgId(selectedOrg.id);
                              setSelectedOrg(null);
                            }}
                            className="w-full py-5 bg-amber-500 rounded-[24px] text-sm font-black uppercase tracking-widest shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group transition-all"
                          >
                            <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>进入组织工作台</span>
                            <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-1 transition-all" />
                          </motion.button>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { label: '组织责任 (责)', content: selectedOrg.responsibility, icon: Target, color: 'text-rose-400' },
                          { label: '执行权限 (权)', content: selectedOrg.power, icon: Shield, color: 'text-blue-400' },
                          { label: '利益机制 (利)', content: selectedOrg.interest, icon: Coins, color: 'text-amber-400' },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-[24px] border border-white/5">
                            <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-white/5", item.color)}>
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1.5">
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">{item.label}</p>
                              <p className="text-xs leading-relaxed text-white/80 font-medium">{item.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                          <Handshake className="w-4 h-4 text-indigo-400" />
                          <h6 className="text-xs font-black uppercase tracking-widest text-white/60">组织合约状态</h6>
                        </div>
                        
                        {(() => {
                          const contracts = INTER_ORG_CONTRACTS.filter(c => c.to === selectedOrg.name || c.from === selectedOrg.name);
                          if (contracts.length > 0) {
                            const cityConts = contracts.filter(c => (c.from === '良造家运营组织' && c.to.includes('大脑')) || (c.to === '良造家运营组织' && c.from.includes('大脑')));
                            const subConts = contracts.filter(c => !((c.from === '良造家运营组织' && c.to.includes('大脑')) || (c.to === '良造家运营组织' && c.from.includes('大脑'))));

                            let groups = [];
                            if (cityConts.length > 0) {
                              groups.push({ title: '城市合约', items: cityConts, color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' });
                            }
                            if (subConts.length > 0) {
                              groups.push({ title: '组织合约', items: subConts, color: 'text-indigo-400', border: 'border-indigo-500/20', bg: 'bg-indigo-500/10' });
                            }

                            return (
                              <div className="space-y-6">
                                {groups.map((group, gIdx) => (
                                  <div key={gIdx} className="space-y-3">
                                    {group.title && (
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className={cn("w-1.5 h-1.5 rounded-full", group.title === '城市合约' ? 'bg-emerald-400' : 'bg-indigo-400')} />
                                        <span className="text-[11px] font-bold text-white/50">{group.title}</span>
                                      </div>
                                    )}
                                    {group.items.map(contract => (
                                      <div key={contract.id} className={cn("border rounded-[24px] p-5 space-y-4", group.bg, group.border)}>
                                        <div className="flex items-start justify-between">
                                          <div className="space-y-1">
                                            <div className={cn("flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter", group.color)}>
                                              <span className="opacity-60">{contract.from}</span>
                                              <ArrowRight className="w-2.5 h-2.5 opacity-40" />
                                              <span className="opacity-80">{contract.to}</span>
                                            </div>
                                            <p className="text-xs font-bold text-white/90">{contract.subject}</p>
                                          </div>
                                          <span className={cn(
                                            "px-2 py-0.5 text-[9px] font-black rounded-full border shrink-0",
                                            contract.status === '已生效' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/20 text-amber-400 border-amber-500/20'
                                          )}>
                                            {contract.status}
                                          </span>
                                        </div>
                                        <div className="space-y-2">
                                          {contract.tasks.map((task, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-[11px] text-white/70">
                                              <div className={cn("w-1 h-1 rounded-full", group.title === '城市合约' ? 'bg-emerald-400' : 'bg-indigo-400')} />
                                              {task}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return (
                            <div className="py-8 bg-white/5 rounded-[24px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">暂无合约记录</p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : activeSubPage === 'org_settings' ? (
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveSubPage('main')} 
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg font-black text-gray-900 leading-tight">组织设置</h2>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-8 max-w-2xl mx-auto w-full space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">组织名称</label>
                <input 
                  type="text" 
                  defaultValue={cityOrg.name}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">更换组织管理员</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-500/5 transition-all">
                  {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="w-full py-4 bg-gray-900 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95 transition-all">
              保存更改
            </button>
          </div>
        </div>
      ) : activeSubPage === 'member_management' ? (
        <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveSubPage('main')} 
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all active:scale-90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-lg font-black text-gray-900 leading-tight">成员管理</h2>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">共 {members.length} 名成员</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 max-w-3xl mx-auto w-full">
            {members.map(member => (
              <div key={member.id} className="flex items-center justify-between p-5 border border-gray-100 rounded-[24px] bg-white shadow-sm hover:border-blue-100 transition-colors">
                <div className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                  <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full bg-gray-50 border-2 border-white shadow-sm" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-black text-gray-900 text-[15px]">{member.name}</span>
                      {member.role === 'owner' && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[10px] font-black uppercase tracking-widest border border-amber-100/50">
                          <Crown className="w-3 h-3" />
                          <span>创建人</span>
                        </div>
                      )}
                      {member.role === 'admin' && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                          <ShieldCheck className="w-3 h-3" />
                          <span>管理员</span>
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">加入时间: {member.joinTime}</div>
                  </div>
                </div>
                {member.role !== 'owner' && (
                  <button 
                    onClick={() => setMembers(prev => prev.filter(m => m.id !== member.id))}
                    className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all shadow-sm active:scale-90"
                    title="移除成员"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Non-sticky Header: City Name */}
          <div className="bg-white px-6 pt-12 pb-1 space-y-4">
            <div className="flex items-center justify-between relative z-60">
              <div className="space-y-1.5 flex-1 relative">
                <button 
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-1.5 active:opacity-70 transition-opacity"
                >
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight">{city}运营中心</h1>
                  <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", isCityDropdownOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isCityDropdownOpen && (
                    <>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60 bg-black/5"
                        onClick={() => setIsCityDropdownOpen(false)}
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[70] flex flex-col p-1"
                      >
                        {Object.keys(CITY_ORGS).map(c => (
                          <button
                            key={c}
                            onClick={() => {
                              onCityChange?.(c);
                              setIsCityDropdownOpen(false);
                            }}
                            className={cn(
                              "text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors",
                              city === c ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            {c}运营中心
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
                
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500 font-bold tracking-wide">
                    {city === '平台' ? '良造家科技(总部)' : `亿大造科技(${city})有限公司`}
                  </p>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black tracking-widest leading-none pt-[1px]">运营中</span>
                  </div>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSettingsDrawerOpen(true)}
                className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:shadow-sm transition-all cursor-pointer"
              >
                <Settings className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Sticky Tab Bar */}
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl px-6 py-4 border-b border-gray-100 transition-all duration-300">
            <div className="flex p-1 bg-gray-100 rounded-2xl gap-1">
              {[
                { id: 'workbench', label: '工作台', icon: Briefcase },
                { id: 'architecture', label: '运营架构', icon: LayoutGrid },
                { id: 'contracts', label: '组织合约', icon: FileText }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all",
                    activeTab === tab.id 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 space-y-5">
            <AnimatePresence mode="wait">
              {activeTab === 'workbench' ? (
                <motion.div
                  key="workbench"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 pb-40"
                >
                  {/* Module 1 & 2: Action Center (Create & Invite) */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Create Task Card */}
                      <motion.button
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setActiveModal('task')}
                        className="relative group overflow-hidden bg-gray-900 rounded-2xl p-4 text-left shadow-lg shadow-gray-900/10 transition-all flex items-center gap-4"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                          <Plus className="w-4 h-4" />
                        </div>
                        <div className="relative z-10 leading-tight">
                          <h4 className="text-white font-black text-sm tracking-tight">发布任务</h4>
                          <p className="text-white/40 text-[9px] font-bold uppercase tracking-wider mt-0.5">指令分发</p>
                        </div>
                      </motion.button>

                      {/* Invite Card */}
                      <motion.button
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setActiveModal('invite')}
                        className="relative group overflow-hidden bg-white border border-gray-100 rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition-all flex items-center gap-4"
                      >
                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                          <UserPlus className="w-4 h-4" />
                        </div>
                        <div className="relative z-10 leading-tight">
                          <h4 className="text-gray-900 font-black text-sm tracking-tight">邀请人员</h4>
                          <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mt-0.5">扩充生态</p>
                        </div>
                      </motion.button>
                    </div>
                  </div>

                  {/* Module 3: Task List Module */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-3.5 bg-amber-500 rounded-full" />
                          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">任务</h3>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
                           {[
                             { id: 'all', label: '全部' },
                             { id: 'executor', label: '我是执行人' },
                             { id: 'verifier', label: '我是验收人' },
                             { id: 'creator', label: '我是创建人' }
                           ].map(filter => (
                             <button
                               key={filter.id}
                               onClick={() => setHomeTaskFilter(filter.id as any)}
                               className={cn(
                                 "px-3 py-1.5 rounded-lg text-[10px] font-black transition-colors",
                                 homeTaskFilter === filter.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                               )}
                             >
                               {filter.label}
                             </button>
                           ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                      {(() => {
                        const filteredTasks = pendingTasks.filter(t => currentSystemOrgNames.has(t.org)).filter(t => {
                          if (homeTaskFilter === 'all') return true;
                          if (homeTaskFilter === 'executor') return t.executor === '我';
                          if (homeTaskFilter === 'verifier') return t.verifier === '我';
                          if (homeTaskFilter === 'creator') return t.creator === '我';
                          return true;
                        });
                        return filteredTasks.length > 0 ? (
                          <div className="space-y-4">
                             {filteredTasks.map((task, idx) => (
                               <motion.div 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: idx * 0.05 }}
                                 key={task.id} 
                                 onClick={() => setSelectedTask(task)}
                                 className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-100 transition-all group relative overflow-hidden cursor-pointer active:scale-[0.98]"
                               >
                                 <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                                 
                                 <div className="relative z-10">
                                   <div className="flex items-center justify-between mb-2.5">
                                     <div className="flex items-center gap-2">
                                        <div className={cn(
                                          "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                                          task.status === 'not_started' ? "bg-gray-100 text-gray-600" :
                                          task.status === 'executing' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                                        )}>
                                          {task.status === 'not_started' ? '未开始' : task.status === 'executing' ? '执行中' : '待验收'}
                                        </div>
                                        {(() => {
                                          const lvlObj = TASK_LEVEL_OPTIONS.find(l => l.id === (task.level || '重要紧急')) || TASK_LEVEL_OPTIONS[0];
                                          return (
                                            <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black", lvlObj.activeBg, lvlObj.iconColor)}>
                                              <lvlObj.icon className="w-2.5 h-2.5 shrink-0" />
                                              <span>{lvlObj.id}</span>
                                            </div>
                                          )
                                        })()}
                                     </div>
                                     <div className="flex items-center gap-1 text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                                        <Clock className="w-2.5 h-2.5 shrink-0" />
                                        <p className="text-[9px] font-black tabular-nums">{task.deadline}</p>
                                     </div>
                                   </div>
                                   <h4 className="font-black text-sm text-gray-900 group-hover:text-amber-600 transition-colors mb-1.5 line-clamp-1">{task.name}</h4>
  
                                   <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 font-medium">
                                     {task.content}
                                   </p>
  
                                   <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                     <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-1.5">
                                          <p className="text-[9px] text-gray-400 font-bold uppercase">执行负责人:</p>
                                          <span className="text-[10px] font-black text-gray-700">{task.executor}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <p className="text-[9px] text-gray-400 font-bold uppercase">验收负责人:</p>
                                          <span className="text-[10px] font-black text-gray-700">{task.verifier}</span>
                                        </div>
                                     </div>
                                     <button 
                                       onClick={(e) => {
                                         e.stopPropagation();
                                         setViewingOrgId(getAllOrgsInTree(cityOrg).find(o => o.name === task.org)?.id || null);
                                       }}
                                       className="w-8 h-8 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all shadow-inner"
                                     >
                                       <ArrowRight className="w-4 h-4" />
                                     </button>
                                   </div>
                                 </div>
                               </motion.div>
                             ))}
                          </div>
                        ) : (
                          <div className="py-24 bg-white rounded-[40px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-200">
                              <ClipboardCheck className="w-10 h-10" />
                            </div>
                            <div>
                              <p className="text-base font-black text-gray-900 tracking-tight">暂无任务</p>
                            </div>
                            <button 
                              onClick={() => setActiveModal('task')}
                              className="px-8 py-4 bg-amber-500 text-white rounded-[24px] text-xs font-black uppercase tracking-widest shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
                            >
                              立即发布首个任务
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              ) : activeTab === 'architecture' ? (
                <motion.div 
                  key="arch"
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6 pb-40"
                >
                  <div className="flex items-center gap-6 px-2">
                    <button 
                      onClick={() => setShowOnlyJoined(!showOnlyJoined)}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
                        showOnlyJoined ? "bg-amber-500 border-amber-500 text-white" : "border-gray-200 bg-white"
                      )}>
                        {showOnlyJoined && <Check className="w-3 h-3 stroke-[4]" />}
                      </div>
                      <span className={cn(
                        "text-[11px] font-black uppercase tracking-widest transition-colors",
                        showOnlyJoined ? "text-gray-900" : "text-gray-400"
                      )}>只看我加入的</span>
                    </button>

                    <button 
                      onClick={() => setShowOnlyUnsigned(!showOnlyUnsigned)}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all",
                        showOnlyUnsigned ? "bg-amber-500 border-amber-500 text-white" : "border-gray-200 bg-white"
                      )}>
                        {showOnlyUnsigned && <Check className="w-3 h-3 stroke-[4]" />}
                      </div>
                      <span className={cn(
                        "text-[11px] font-black uppercase tracking-widest transition-colors",
                        showOnlyUnsigned ? "text-gray-900" : "text-gray-400"
                      )}>只看未签约的</span>
                    </button>
                  </div>

                  {filteredOrgs ? (
                    filteredOrgs.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg uppercase tracking-widest">
                            筛选结果: {filteredOrgs.length}
                          </span>
                        </div>
                        {filteredOrgs.map(org => (
                          <OrgCard key={org.id} node={org} isFlat={true} />
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-[28px] flex items-center justify-center text-gray-200">
                          <Search className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 uppercase tracking-tight">未找到符合条件的组织</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">请尝试调整筛选条件</p>
                        </div>
                      </div>
                    )
                  ) : (
                    <OrgCard node={cityOrg} />
                  )}

                  {/* Node Detail Bottom Sheet */}
                  <AnimatePresence>
                    {selectedOrg && (
                      <>
                        {/* Backdrop */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setSelectedOrg(null)}
                          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        
                        {/* Slide-up Panel */}
                        <motion.div 
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "100%" }}
                          transition={{ type: "spring", damping: 25, stiffness: 200 }}
                          className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-[40px] px-6 pt-2 pb-12 text-white z-[70] shadow-[0_-8px_40px_rgba(0,0,0,0.4)] max-h-[85vh] overflow-y-auto"
                        >
                          {/* Handle bar */}
                          <div className="flex justify-center mb-4">
                            <div className="w-12 h-1 bg-white/20 rounded-full" />
                          </div>

                          <div className="relative z-10 space-y-6">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full -mr-16 -mt-16 pointer-events-none z-0" />
                            <div className="flex items-center justify-between relative z-10">
                              <div className="space-y-1">
                                <h5 className="font-black text-xl text-amber-400">组织概况</h5>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{selectedOrg.name}</p>
                              </div>
                              <button onClick={() => setSelectedOrg(null)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer relative z-20">
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            
                            {MY_ORG_IDS.includes(selectedOrg.id) && (
                              <div className="space-y-3 relative z-10">
                                <motion.button 
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  onClick={() => {
                                    setViewingOrgId(selectedOrg.id);
                                    setSelectedOrg(null);
                                  }}
                                  className="w-full py-5 bg-amber-500 rounded-[24px] text-sm font-black uppercase tracking-widest shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group transition-all"
                                >
                                  <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                  <span>进入组织工作台</span>
                                  <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-1 transition-all" />
                                </motion.button>
                                
                                <div className="flex items-center justify-center pt-1">
                                  <button 
                                    onClick={() => {
                                      setActiveModal('org');
                                      setSelectedOrg(null);
                                    }}
                                    className="flex items-center gap-1.5 py-2 px-4 rounded-full text-[11px] font-bold text-white/40 hover:text-white/80 hover:bg-white/5 transition-all uppercase tracking-widest"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>创建下级组织单元</span>
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-1 gap-4">
                              {[
                                { label: '组织责任 (责)', content: selectedOrg.responsibility, icon: Target, color: 'text-rose-400' },
                                { label: '执行权限 (权)', content: selectedOrg.power, icon: Shield, color: 'text-blue-400' },
                                { label: '利益机制 (利)', content: selectedOrg.interest, icon: Coins, color: 'text-amber-400' },
                              ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-[24px] border border-white/5">
                                  <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 bg-white/5", item.color)}>
                                    <item.icon className="w-5 h-5" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">{item.label}</p>
                                    <p className="text-xs leading-relaxed text-white/80 font-medium">{item.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Organization Contract Section */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 px-1">
                                <Handshake className="w-4 h-4 text-indigo-400" />
                                <h6 className="text-xs font-black uppercase tracking-widest text-white/60">组织合约状态</h6>
                              </div>
                              
                              {(() => {
                                const contracts = INTER_ORG_CONTRACTS.filter(c => c.to === selectedOrg.name || c.from === selectedOrg.name);
                                if (contracts.length > 0) {
                                  const cityConts = contracts.filter(c => (c.from === '良造家运营组织' && c.to.includes('大脑')) || (c.to === '良造家运营组织' && c.from.includes('大脑')));
                                  const subConts = contracts.filter(c => !((c.from === '良造家运营组织' && c.to.includes('大脑')) || (c.to === '良造家运营组织' && c.from.includes('大脑'))));

                                  let groups = [];
                                  if (cityConts.length > 0) {
                                    groups.push({ title: '城市合约', items: cityConts, color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' });
                                  }
                                  if (subConts.length > 0) {
                                    groups.push({ title: '组织合约', items: subConts, color: 'text-indigo-400', border: 'border-indigo-500/20', bg: 'bg-indigo-500/10' });
                                  }

                                  return (
                                    <div className="space-y-6">
                                      {groups.map((group, gIdx) => (
                                        <div key={gIdx} className="space-y-3">
                                          {group.title && (
                                            <div className="flex items-center gap-2 mb-1">
                                              <div className={cn("w-1.5 h-1.5 rounded-full", group.title === '城市合约' ? 'bg-emerald-400' : 'bg-indigo-400')} />
                                              <span className="text-[11px] font-bold text-white/50">{group.title}</span>
                                            </div>
                                          )}
                                          {group.items.map(contract => (
                                            <div key={contract.id} className={cn("border rounded-[24px] p-5 space-y-4", group.bg, group.border)}>
                                              <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                  <div className={cn("flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter", group.color)}>
                                                    <span className="opacity-60">{contract.from}</span>
                                                    <ArrowRight className="w-2.5 h-2.5 opacity-40" />
                                                    <span className="opacity-80">{contract.to}</span>
                                                  </div>
                                                  <p className="text-xs font-bold text-white/90">{contract.subject}</p>
                                                </div>
                                                <span className={cn(
                                                  "px-2 py-0.5 text-[9px] font-black rounded-full border shrink-0",
                                                  contract.status === '已生效' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/20 text-amber-400 border-amber-500/20'
                                                )}>
                                                  {contract.status}
                                                </span>
                                              </div>
                                              <div className="space-y-2">
                                                {contract.tasks.map((task, idx) => (
                                                  <div key={idx} className="flex items-center gap-2 text-[11px] text-white/70">
                                                    <div className={cn("w-1 h-1 rounded-full", group.title === '城市合约' ? 'bg-emerald-400' : 'bg-indigo-400')} />
                                                    {task}
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                return (
                                  <div className="bg-white/5 border border-white/5 rounded-[24px] p-8 flex flex-col items-center justify-center text-center space-y-3">
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                                      <FileX className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs font-bold text-white/30 uppercase tracking-widest leading-tight">尚未签约组织合约</p>
                                      {(() => {
                                        const parent = findParentOrg(cityOrg, selectedOrg.id);
                                        return parent ? (
                                          <p className="text-[10px] text-white/20 font-medium">
                                            尚未签约由【{parent.name}】下拨的任务指令
                                          </p>
                                        ) : (
                                          <p className="text-[10px] text-white/20 font-medium">
                                            尚未签约由【良造家运营组织】下发的核心授权合约
                                          </p>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  key="contracts"
                  initial={{ opacity: 0, x: 10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6 pb-20"
                >
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <Handshake className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-sm font-black text-gray-900">活跃中的组织合约</h3>
                  </div>
                  
                  {(() => {
                    const systemContracts = INTER_ORG_CONTRACTS.filter(c => 
                      currentSystemOrgNames.has(c.to) || currentSystemOrgNames.has(c.from)
                    );
                    
                    const cityConts = systemContracts.filter(c => (c.from === '良造家运营组织' && c.to.includes('大脑')) || (c.to === '良造家运营组织' && c.from.includes('大脑')));
                    const subConts = systemContracts.filter(c => !((c.from === '良造家运营组织' && c.to.includes('大脑')) || (c.to === '良造家运营组织' && c.from.includes('大脑'))));

                    let groups = [];
                    if (cityConts.length > 0) {
                      groups.push({ title: '城市合约', items: cityConts, badgeText: 'text-emerald-500', badgeBorder: 'border-emerald-100', badgeBg: 'bg-emerald-50' });
                    }
                    if (subConts.length > 0) {
                      groups.push({ title: '组织合约', items: subConts, badgeText: 'text-indigo-500', badgeBorder: 'border-indigo-100', badgeBg: 'bg-indigo-50' });
                    }

                    if (groups.length === 0) {
                      return (
                        <div className="bg-gray-50 border border-gray-100 rounded-[32px] p-12 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm border border-gray-100">
                            <FileX className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-gray-900">暂无相关组织合约</h4>
                            <p className="text-xs text-gray-500">当前运营中心体系下尚未流转任何合约数据</p>
                          </div>
                        </div>
                      );
                    }

                    return groups.map((g, gIdx) => (
                      <div key={gIdx} className="space-y-4">
                        <div className="flex items-center gap-2 pl-2">
                          <div className={cn("w-2 h-2 rounded-full", g.title === '城市合约' ? 'bg-emerald-500' : 'bg-indigo-500')} />
                          <h4 className="text-xs font-black text-gray-500">{g.title}</h4>
                        </div>
                        <div className="space-y-4">
                          {g.items.map(contract => (
                            <div key={contract.id} className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm space-y-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", g.badgeText)}>
                                    <span>{contract.from}</span>
                                    <ArrowRight className="w-3 h-3" />
                                    <span>{contract.to}</span>
                                  </div>
                                  <h4 className="font-bold text-gray-900">{contract.subject}</h4>
                                </div>
                                <span className={cn(
                                  "px-2 py-1 text-[10px] font-black rounded-lg border",
                                  contract.status === '已生效' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                )}>
                                  {contract.status}
                                </span>
                              </div>

                              <div className="space-y-3">
                                <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">合约任务内容</p>
                                    <ul className="space-y-2">
                                    {contract.tasks.map((t, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                        <CheckCircle2 className={cn("w-3.5 h-3.5", g.title === '城市合约' ? 'text-emerald-500' : 'text-indigo-500')} />
                                        {t}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex -space-x-2">
                                    {contract.assignedTo.map((person, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600 ring-2 ring-gray-50">
                                        {person.charAt(0)}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400 ring-2 ring-gray-50">
                                        +
                                    </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-medium">任务已拆分至具体执行人</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      )}

      {/* Workspace Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-lg rounded-t-[40px] sm:rounded-[40px] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                    {activeModal === 'task' ? <Plus className="w-5 h-5" /> : activeModal === 'contract' ? <FileText className="w-5 h-5" /> : activeModal === 'invite' ? <UserPlus className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">
                    {activeModal === 'task' ? '发布新任务' : activeModal === 'contract' ? '起草组织合约' : activeModal === 'invite' ? '邀请合作伙伴' : '创建新组织'}
                  </h3>
                </div>
                <button onClick={() => setActiveModal(null)} className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </button>
              </div>

              <div className="p-8 space-y-6 overflow-y-auto">
                {activeModal === 'task' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">任务名称</label>
                      <input type="text" placeholder="输入任务标题..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-200 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">任务内容</label>
                      <textarea rows={3} placeholder="详细描述任务要求..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-200 transition-all resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">执行人</label>
                        <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 transition-all appearance-none cursor-pointer">
                          <option>选择执行人</option>
                          {[
                            { name: '张明', org: '软件研发中心' },
                            { name: '张明', org: '北京城市运营大脑' },
                            { name: '王强', org: '北京城市运营大脑' },
                            { name: '王强', org: '总部技术办' },
                            { name: '李丽', org: '全案设计中心' },
                            { name: '李丽', org: '空间研究实验室' },
                            { name: '赵武', org: '上海区域运营' },
                            { name: '赵武', org: '供应链中心' },
                            { name: '我', org: '北京全案设计中心' }
                          ].map((p, i) => (
                            <option key={i}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">验收人</label>
                        <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 transition-all appearance-none cursor-pointer">
                          <option>选择验收人</option>
                          {[
                            { name: '张明', org: '软件研发中心' },
                            { name: '张明', org: '北京城市运营大脑' },
                            { name: '王强', org: '北京城市运营大脑' },
                            { name: '王强', org: '总部技术办' },
                            { name: '李丽', org: '全案设计中心' },
                            { name: '李丽', org: '空间研究实验室' },
                            { name: '赵武', org: '上海区域运营' },
                            { name: '赵武', org: '供应链中心' },
                            { name: '我', org: '北京全案设计中心' }
                          ].map((p, i) => (
                            <option key={i}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">任务等级</label>
                      <div className="grid grid-cols-2 gap-2">
                        {TASK_LEVEL_OPTIONS.map(lvl => (
                          <button 
                            key={lvl.id}
                            onClick={() => setNewTaskLevel(lvl.id)}
                            className={cn(
                              "flex items-center gap-2 p-3.5 rounded-2xl border text-xs font-bold transition-all text-left w-full",
                              newTaskLevel === lvl.id ? `${lvl.activeBorder} ${lvl.activeBg}` : "border-gray-100 bg-gray-50 hover:bg-gray-100/50 text-gray-600"
                            )}
                          >
                            <lvl.icon className={cn("w-4 h-4 shrink-0", newTaskLevel === lvl.id ? lvl.iconColor : 'text-gray-400')} />
                            <span className={newTaskLevel === lvl.id ? "text-gray-900" : ""}>{lvl.id}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">截止时间</label>
                      <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 transition-all" />
                    </div>
                  </>
                )}

                {activeModal === 'contract' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">合约主题</label>
                      <input 
                        type="text" 
                        defaultValue={isEditingContract?.subject || ''}
                        placeholder="例如：2024年度经营目标对赌协议" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">核心任务指标 (分行输入)</label>
                      <textarea 
                        rows={5} 
                        defaultValue={isEditingContract?.tasks?.join('\n') || ''}
                        placeholder="每一行代表一个核心任务指标..." 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none resize-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">合约状态</label>
                      <select 
                        defaultValue={isEditingContract?.status || '拟定中'}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold appearance-none cursor-pointer"
                      >
                        <option>拟定中</option>
                        <option>待签署</option>
                        <option>已生效</option>
                        <option>已归档</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeModal === 'org' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">组织名称</label>
                      <input type="text" placeholder="输入新的组织全称..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-amber-200 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">添加组织管理员</label>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none appearance-none cursor-pointer">
                        <option>选择管理员</option>
                        {MOCK_ORCHESTRATORS.map(u => (
                          <option key={u.name}>{u.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[32px] border border-amber-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <FileText className="w-20 h-20" />
                      </div>
                      <div className="relative z-10 space-y-3">
                        <h5 className="text-sm font-black text-amber-900">关联合约 (非必填)</h5>
                        <p className="text-[11px] text-amber-700/70 font-medium leading-relaxed">
                          选择一个已有的合约模版，或在组织创建后立即建立责权利对赌。
                        </p>
                        <select className="w-full bg-white/60 border border-amber-200/50 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:bg-white transition-all">
                          <option>无需立即关联合约</option>
                          <option>标准城市运营授权合约</option>
                          <option>设计中心绩效对赌合约</option>
                          <option>卓越交付质量管控合约</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === 'invite' && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">受邀人手机号</label>
                        <div className="relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+86</div>
                          <input 
                            type="tel" 
                            placeholder="请输入 11 位手机号码..." 
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 transition-all" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 bg-gray-50/50 flex gap-4">
                <button 
                  onClick={() => {
                    setActiveModal(null);
                    setIsEditingContract(null);
                    setContractStep(1);
                  }} 
                  className="flex-1 py-4 bg-white border border-gray-100 rounded-[20px] text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-gray-100 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    // Mock Success
                    setActiveModal(null);
                    setIsEditingContract(null);
                    setContractStep(1);
                  }}
                  className="flex-[2] py-4 bg-gray-900 border border-gray-900 rounded-[20px] text-xs font-black text-white uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95 transition-all"
                >
                  确认提交
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Overlays */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 pt-12 pb-4 flex items-center gap-4 bg-white sticky top-0 z-10 border-b border-gray-50">
              <button 
                onClick={() => {
                  setSelectedTask(null);
                  setShowExecutorPhone(false);
                  setShowVerifierPhone(false);
                }}
                className="p-2 -ml-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-900" />
              </button>
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest flex-1">任务详情</h2>
              {selectedTask.creator === '我' && (
                <button 
                  onClick={() => {
                    setPendingTasks(prev => prev.filter(t => t.id !== selectedTask.id));
                    setSelectedTask(null);
                  }}
                  className="p-2 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors text-rose-500 mr-2 text-xs font-black"
                >
                  删除任务
                </button>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 text-left">
               {/* Status & Org */}
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   {selectedTask.executor === '我' ? (
                     <select
                       value={selectedTask.status}
                       onChange={(e) => {
                         const updated = { ...selectedTask, status: e.target.value };
                         setSelectedTask(updated);
                         setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                       }}
                       className={cn(
                         "px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none outline-none cursor-pointer",
                         selectedTask.status === 'executing' ? "bg-amber-100 text-amber-700" : 
                         selectedTask.status === 'completed' ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                       )}
                     >
                       <option value="not_started">未开始</option>
                       <option value="executing">执行中</option>
                       <option value="completed">已完成</option>
                     </select>
                   ) : (
                     <span className={cn(
                       "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                       selectedTask.status === 'executing' ? "bg-amber-100 text-amber-700" : 
                       selectedTask.status === 'completed' ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                     )}>
                       {selectedTask.status === 'not_started' ? '未开始' : selectedTask.status === 'executing' ? '执行中' : '已完成'}
                     </span>
                   )}
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedTask.org}</span>
                 </div>
               </div>

               {/* Title & Desc */}
               <div className="space-y-4">
                 {selectedTask.creator === '我' ? (
                   <input 
                     value={selectedTask.name}
                     onChange={(e) => {
                       const updated = { ...selectedTask, name: e.target.value };
                       setSelectedTask(updated);
                       setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                     }}
                     className="text-2xl font-black text-gray-900 leading-tight w-full bg-transparent border-b border-gray-200 focus:border-amber-500 focus:outline-none pb-1"
                   />
                 ) : (
                   <h1 className="text-2xl font-black text-gray-900 leading-tight">{selectedTask.name}</h1>
                 )}
                 <div className="p-5 bg-gray-50 rounded-[32px] border border-gray-100">
                   {selectedTask.creator === '我' ? (
                     <textarea
                       value={selectedTask.content}
                       onChange={(e) => {
                         const updated = { ...selectedTask, content: e.target.value };
                         setSelectedTask(updated);
                         setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                       }}
                       className="w-full text-sm text-gray-600 leading-relaxed font-medium bg-transparent border-none focus:outline-none resize-none min-h-[80px]"
                     />
                   ) : (
                     <p className="text-sm text-gray-600 leading-relaxed font-medium">
                       {selectedTask.content}
                     </p>
                   )}
                 </div>
               </div>

               {/* Info Grid */}
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-5 bg-white border border-gray-100 rounded-[28px] shadow-sm space-y-3">
                    <div className="flex items-center gap-2 opacity-40">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest">任务等级</span>
                    </div>
                    {selectedTask.creator === '我' ? (
                      <div className="relative">
                        <button
                          onClick={() => setIsTaskDetailsLevelOpen(!isTaskDetailsLevelOpen)}
                          className="flex items-center gap-2 text-base font-black text-gray-900 group"
                        >
                          {(() => {
                            const lvlObj = TASK_LEVEL_OPTIONS.find(l => l.id === (selectedTask.level || '重要紧急')) || TASK_LEVEL_OPTIONS[0];
                            return <lvlObj.icon className={cn("w-4 h-4", lvlObj.iconColor)} />;
                          })()}
                          <span>{selectedTask.level || '重要紧急'}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        </button>
                        {isTaskDetailsLevelOpen && (
                          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden z-20">
                            {TASK_LEVEL_OPTIONS.map(lvl => (
                              <button
                                key={lvl.id}
                                onClick={() => {
                                  const updated = { ...selectedTask, level: lvl.id };
                                  setSelectedTask(updated);
                                  setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                                  setIsTaskDetailsLevelOpen(false);
                                }}
                                className={cn(
                                  "w-full flex items-center gap-2 px-4 py-3 text-xs font-bold text-left hover:bg-gray-50 transition-colors",
                                  selectedTask.level === lvl.id ? "bg-gray-50 text-gray-900" : "text-gray-600"
                                )}
                              >
                                <lvl.icon className={cn("w-4 h-4 shrink-0", lvl.iconColor)} />
                                {lvl.id}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-base font-black text-gray-900">
                        {(() => {
                          const lvlObj = TASK_LEVEL_OPTIONS.find(l => l.id === (selectedTask.level || '重要紧急')) || TASK_LEVEL_OPTIONS[0];
                          return <lvlObj.icon className={cn("w-4 h-4", lvlObj.iconColor)} />;
                        })()}
                        <span>{selectedTask.level || '重要紧急'}</span>
                      </div>
                    )}
                 </div>
                 <div className="p-5 bg-white border border-gray-100 rounded-[28px] shadow-sm space-y-3">
                    <div className="flex items-center gap-2 opacity-40">
                      <Clock className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-widest">截止日期</span>
                    </div>
                    {selectedTask.creator === '我' ? (
                      <input 
                        type="date"
                        value={selectedTask.deadline}
                        onChange={(e) => {
                          const updated = { ...selectedTask, deadline: e.target.value };
                          setSelectedTask(updated);
                          setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                        }}
                        className="text-lg font-black text-gray-900 tabular-nums bg-transparent border-none focus:outline-none w-full"
                      />
                    ) : (
                      <p className="text-lg font-black text-gray-900 tabular-nums">{selectedTask.deadline}</p>
                    )}
                 </div>
               </div>

               {/* Personnel */}
               <div className="space-y-4 pb-20">
                 <div className="flex items-center gap-2 px-1">
                   <div className="w-1 h-3.5 bg-amber-500 rounded-full" />
                   <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">责任相关人</h3>
                 </div>
                 <div className="space-y-3">
                   <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-black">
                         {selectedTask.executor.charAt(0)}
                       </div>
                       <div>
                         {selectedTask.creator === '我' ? (
                           <select 
                             value={selectedTask.executor}
                             onChange={(e) => {
                               const updated = { ...selectedTask, executor: e.target.value };
                               setSelectedTask(updated);
                               setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                             }}
                             className="text-xs font-black text-gray-900 bg-transparent border-none outline-none"
                           >
                             <option value="我">我</option>
                             {MOCK_ORCHESTRATORS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                           </select>
                         ) : (
                           <p className="text-xs font-black text-gray-900">{selectedTask.executor}</p>
                         )}
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">执行负责人</p>
                       </div>
                     </div>
                     <button 
                       onClick={() => setShowExecutorPhone(!showExecutorPhone)}
                       className="px-3 py-2 bg-gray-50 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors active:scale-95"
                     >
                       <Phone className="w-4 h-4 text-gray-400" />
                       {showExecutorPhone && (
                         <span className="text-[11px] font-bold text-gray-700">
                           {selectedTask.executor === '我' ? '13800000000' : (MOCK_ORCHESTRATORS.find(m => m.name === selectedTask.executor)?.phone || '未绑定')}
                         </span>
                       )}
                     </button>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                         {selectedTask.verifier.charAt(0)}
                       </div>
                       <div>
                         {selectedTask.creator === '我' ? (
                           <select 
                             value={selectedTask.verifier}
                             onChange={(e) => {
                               const updated = { ...selectedTask, verifier: e.target.value };
                               setSelectedTask(updated);
                               setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                             }}
                             className="text-xs font-black text-gray-900 bg-transparent border-none outline-none"
                           >
                             <option value="我">我</option>
                             {MOCK_ORCHESTRATORS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                           </select>
                         ) : (
                           <p className="text-xs font-black text-gray-900">{selectedTask.verifier}</p>
                         )}
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">验收负责人</p>
                       </div>
                     </div>
                     <button 
                       onClick={() => setShowVerifierPhone(!showVerifierPhone)}
                       className="px-3 py-2 bg-gray-50 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors active:scale-95"
                     >
                       <Phone className="w-4 h-4 text-gray-400" />
                       {showVerifierPhone && (
                         <span className="text-[11px] font-bold text-gray-700">
                           {selectedTask.verifier === '我' ? '13800000000' : (MOCK_ORCHESTRATORS.find(m => m.name === selectedTask.verifier)?.phone || '未绑定')}
                         </span>
                       )}
                     </button>
                   </div>
                 </div>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
              {selectedTask.executor === '我' && (
                <button 
                  onClick={() => {
                    const updated = { ...selectedTask, status: 'completed' };
                    setSelectedTask(updated);
                    setPendingTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
                  }}
                  className="flex-1 py-4 bg-gray-900 rounded-2xl text-xs font-black text-white uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>提交验收</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Drawer */}
      <AnimatePresence>
        {isSettingsDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsDrawerOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-[101] flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">管理设置</h3>
                <button onClick={() => setIsSettingsDrawerOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="flex-1 p-4 space-y-2">
                {[
                  { label: '组织设置', id: 'org_settings', icon: Settings, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { label: '成员管理', id: 'member_management', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                ].map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setActiveSubPage(item.id as any);
                      setIsSettingsDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98] group text-left"
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.bg, item.color)}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700 group-hover:text-gray-900">{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-300" />
                  </button>
                ))}
              </div>
              <div className="p-6 border-t border-gray-100">
                <button className="w-full py-4 flex items-center justify-center gap-2 text-rose-500 font-bold hover:bg-rose-50 rounded-2xl transition-all">
                  <LogOut className="w-4 h-4" />
                  <span>解散/退出组织</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MyHomePage = () => {
  const [activeTab, setActiveTab] = useState<'in-progress' | 'completed'>('in-progress');

  const inProgressProjects = [
    {
      id: 1,
      name: '保利天悦法式复古',
      area: '140㎡',
      status: '施工中',
      progress: 65,
      currentPhase: '水电工程',
      contractStatus: '履约中',
      contractAmount: '¥120,000',
      startDate: '2024.03.01',
      endDate: '2024.08.01',
      daysStarted: 45,
      daysRemaining: 108,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: '阳光壹号院现代简约',
      area: '120㎡',
      status: '准备开工',
      progress: 5,
      currentPhase: '设计阶段',
      contractStatus: '履约中',
      contractAmount: '¥85,000',
      startDate: '2024.04.15',
      endDate: '2024.09.15',
      daysStarted: 0,
      daysRemaining: 153,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const completedProjects = [
    {
      id: 3,
      name: '万科翡翠现代简约',
      area: '90㎡',
      status: '已完工',
      progress: 100,
      currentPhase: '交付完成',
      contractStatus: '已完成',
      contractAmount: '¥105,000',
      startDate: '2023.08.01',
      endDate: '2023.09.30',
      daysStarted: 60,
      daysRemaining: 0,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: '金茂府大平层',
      area: '200㎡',
      status: '已完工',
      progress: 100,
      currentPhase: '交付完成',
      contractStatus: '已完成',
      contractAmount: '¥350,000',
      startDate: '2023.03.01',
      endDate: '2023.07.15',
      daysStarted: 136,
      daysRemaining: 0,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const projects = activeTab === 'in-progress' ? inProgressProjects : completedProjects;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-0 sticky top-0 z-40 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">项目</h1>
        
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('in-progress')}
            className={cn(
              "pb-3 text-[15px] font-medium transition-colors relative",
              activeTab === 'in-progress' ? "text-gray-900" : "text-gray-400"
            )}
          >
            进行中
            {activeTab === 'in-progress' && (
              <motion.div layoutId="project-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={cn(
              "pb-3 text-[15px] font-medium transition-colors relative",
              activeTab === 'completed' ? "text-gray-900" : "text-gray-400"
            )}
          >
            已完工
            {activeTab === 'completed' && (
              <motion.div layoutId="project-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Project List */}
      <div className="p-4 space-y-4 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
                <div className="h-40 relative">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <h3 className="text-white font-bold text-lg">{project.name}</h3>
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md",
                      project.status === '已完工' ? "bg-white/20 text-white" : "bg-[#07c160]/90 text-white"
                    )}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.area}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                  </div>
                  
                  { 'progress' in project && 'currentPhase' in project && 'contractStatus' in project && 'contractAmount' in project && 'daysStarted' in project && 'daysRemaining' in project && (
                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">已开工：<span className="font-bold text-gray-900">{project.daysStarted as number}天</span></span>
                        <span className="text-gray-600">剩余：<span className="font-bold text-gray-900">{project.daysRemaining as number}天</span></span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">我的合同：<span className={cn("font-bold", project.contractStatus === '履约中' ? "text-blue-600" : "text-emerald-600")}>{project.contractStatus as string}</span></span>
                        <span className="text-gray-600">合同金额：<span className="font-bold text-gray-900">{project.contractAmount as string}</span></span>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600">当前阶段：<span className="font-bold text-gray-900">{project.currentPhase as string}</span></span>
                        <span className="font-bold text-[#07c160]">{project.progress as number}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#07c160] rounded-full" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const MyFavoritesPage = ({ onBack, onSelectLead }: { onBack: () => void; onSelectLead: (item: any) => void }) => {
  const sortedFavorites = [...FOLLOWING_DATA].sort((a, b) => new Date(b.collectedTime).getTime() - new Date(a.collectedTime).getTime());

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-slate-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">我的收藏</h2>
      </div>

      <div className="p-4 space-y-3">
        {sortedFavorites.map((item) => {
          if (item.type === 'lead') {
            return <ProjectLeadCard key={item.id} item={item as any} onClick={() => onSelectLead(item)} />;
          }
          if (item.type === 'recruitment') {
            return <ProjectRecruitmentCard key={item.id} item={item as any} />;
          }
          return null;
        })}
      </div>
    </motion.div>
  );
};

const MyBusinessCardPage = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-slate-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">我的名片</h2>
      </div>

      <div className="p-5 flex flex-col items-center">
        {/* Business Card */}
        <div className="w-full max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white mb-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md">
                  <img src="https://i.pravatar.cc/150?u=shenziyi" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight flex items-center gap-1.5">
                    沈子怡
                    <Shield className="w-4 h-4 text-blue-400" />
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">资深全案设计师</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-medium text-amber-100">平台认证</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* DID */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm">
                <div className="text-[10px] text-slate-400 mb-1">数字身份标识 (DID)</div>
                <div className="font-mono text-sm tracking-wider text-blue-200 flex items-center justify-between">
                  lzj:0x71C...9A2
                  <QrCode className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* 三度值 & 贡献值 */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/10">
                  <div className="text-sm font-bold text-emerald-400">98%</div>
                  <div className="text-[9px] text-slate-400">信誉度</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/10">
                  <div className="text-sm font-bold text-blue-400">95%</div>
                  <div className="text-[9px] text-slate-400">美誉度</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2 text-center border border-white/10">
                  <div className="text-sm font-bold text-purple-400">88%</div>
                  <div className="text-[9px] text-slate-400">知名度</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-2 text-center border border-amber-500/30">
                  <div className="text-sm font-bold text-amber-400">12.8w</div>
                  <div className="text-[9px] text-amber-200/70">贡献值</div>
                </div>
              </div>

              {/* 项目履约与服务 */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm">
                <div className="text-[10px] text-slate-400 mb-2 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  项目履约与服务
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-sm font-bold text-slate-200">96%</div>
                    <div className="text-[9px] text-slate-400">一次验收</div>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <div className="text-sm font-bold text-slate-200">100%</div>
                    <div className="text-[9px] text-slate-400">工期履约</div>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <div className="text-sm font-bold text-slate-200">4.9</div>
                    <div className="text-[9px] text-slate-400">服务评分</div>
                  </div>
                </div>
              </div>

              {/* 培训考核 */}
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm">
                <div className="text-[10px] text-slate-400 mb-2 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  认证标识
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-[10px] bg-purple-500/20 border border-purple-500/30 px-2 py-1 rounded-md text-purple-200">
                    <Wand2 className="w-3 h-3 text-purple-400" />
                    技能考核 A级
                  </div>
                  <div className="flex items-center gap-1 text-[10px] bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded-md text-emerald-200">
                    <Heart className="w-3 h-3 text-emerald-400" />
                    良知素养 98分
                  </div>
                  <div className="flex items-center gap-1 text-[10px] bg-blue-500/20 border border-blue-500/30 px-2 py-1 rounded-md text-blue-200">
                    <GraduationCap className="w-3 h-3 text-blue-400" />
                    培训 128学时
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 档案入口 */}
        <button 
          onClick={() => onNavigate('my-archive')}
          className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-gray-900">查看完整档案</div>
              <div className="text-[11px] text-gray-500 mt-0.5">包含详细项目履约、荣誉记录等</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </button>
        
        {/* 分享按钮 */}
        <button className="w-full max-w-sm mt-4 bg-blue-600 text-white rounded-xl py-3.5 font-bold text-sm shadow-md shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          分享我的名片
        </button>
      </div>
    </motion.div>
  );
};

const MyArchivePage = ({ onBack }: { onBack: () => void }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-slate-50 pb-20"
    >
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-center border-b border-gray-100 relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">我的档案</h2>
        <button onClick={() => setShowShareModal(true)} className="absolute right-4 p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Share2 className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* 专业名片头部 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-bl-full -z-10 opacity-50" />
          
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                <img src="https://i.pravatar.cc/150?u=shenziyi" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] px-2 py-0.5 rounded-lg border-2 border-white flex items-center gap-0.5 shadow-sm">
                <Shield className="w-3 h-3" />
                <span className="font-bold">平台认证</span>
              </div>
            </div>
            
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-black text-gray-900 tracking-tight">沈子怡</h2>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md border border-amber-100">
                  <Medal className="w-3 h-3" />
                  <span className="text-[10px] font-bold">金牌服务</span>
                </div>
              </div>
              
              <p className="text-sm font-medium text-gray-600 mb-2">资深全案设计师 · 从业8年</p>
              
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded-md border border-blue-100">
                  全案设计专家
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-medium rounded-md border border-emerald-100">
                  零差评口碑
                </span>
                <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-medium rounded-md border border-purple-100">
                  高效履约
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 三度综合评估 (雷达图) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            三度综合评估
          </h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                { subject: '信誉度', value: 98, fullMark: 100 },
                { subject: '美誉度', value: 95, fullMark: 100 },
                { subject: '知名度', value: 88, fullMark: 100 },
              ]}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="综合评估"
                  dataKey="value"
                  stroke="#07c160"
                  fill="#07c160"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="text-center">
              <div className="text-lg font-black text-gray-900">98%</div>
              <div className="text-[10px] text-gray-500">信誉度</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-gray-900">95%</div>
              <div className="text-[10px] text-gray-500">美誉度</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black text-gray-900">88%</div>
              <div className="text-[10px] text-gray-500">知名度</div>
            </div>
          </div>
        </div>

        {/* 贡献值 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 shadow-sm border border-amber-100">
          <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            贡献值 (累计收入)
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-amber-600">¥</span>
            <span className="text-4xl font-black text-amber-600 tracking-tight">128,500</span>
          </div>
          <p className="text-xs text-amber-700/80 mt-2">通过平台项目与合作获得的累计收益</p>
        </div>

        {/* 项目履约与服务 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-500" />
            项目履约与服务
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-rose-50/50 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-rose-100/50">
              <CheckCircle2 className="w-5 h-5 text-rose-500 mb-1" />
              <span className="text-lg font-bold text-rose-600">96%</span>
              <span className="text-[10px] text-gray-500 mt-0.5">一次验收通过</span>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-blue-100/50">
              <CalendarCheck className="w-5 h-5 text-blue-500 mb-1" />
              <span className="text-lg font-bold text-blue-600">100%</span>
              <span className="text-[10px] text-gray-500 mt-0.5">工期履约率</span>
            </div>
            <div className="bg-amber-50/50 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-amber-100/50">
              <Smile className="w-5 h-5 text-amber-500 mb-1" />
              <span className="text-lg font-bold text-amber-600">4.9</span>
              <span className="text-[10px] text-gray-500 mt-0.5">服务态度评分</span>
            </div>
          </div>
        </div>

        {/* 技能培训记录 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-500" />
            技能培训记录
          </h3>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-800">专业技能</span>
                <span className="text-[10px] text-gray-500">累计 128 学时</span>
              </div>
              <ul className="space-y-1.5">
                <li className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                  高级全案设计进阶班 (2023.11)
                </li>
                <li className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-blue-400" />
                  新型环保材料应用培训 (2023.08)
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-800">良知素养</span>
                <span className="text-[10px] text-gray-500">累计 46 学时</span>
              </div>
              <ul className="space-y-1.5">
                <li className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  从业者职业道德与规范 (2023.12)
                </li>
                <li className="text-[11px] text-gray-600 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  客户隐私保护与服务礼仪 (2023.06)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 考核记录 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-purple-500" />
            考核记录
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-purple-50/50 rounded-xl border border-purple-100/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Wand2 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">专业技能定级考核</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">2023年度考核</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-purple-600">A级</div>
                <div className="text-[10px] text-purple-500/80">优秀</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">良知素养综合评定</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">2023年度评定</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-emerald-600">98分</div>
                <div className="text-[10px] text-emerald-500/80">极佳</div>
              </div>
            </div>
          </div>
        </div>

        {/* 评价云词 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            评价云词
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 py-4 px-2">
            {[
              { text: '细节控', size: 'text-2xl', weight: 'font-black', color: 'text-purple-600', transform: '-rotate-2' },
              { text: '审美在线', size: 'text-lg', weight: 'font-bold', color: 'text-emerald-500', transform: 'rotate-1' },
              { text: '专业度高', size: 'text-xl', weight: 'font-extrabold', color: 'text-blue-600', transform: '-rotate-1' },
              { text: '沟通顺畅', size: 'text-sm', weight: 'font-medium', color: 'text-indigo-500', transform: 'rotate-2' },
              { text: '负责任', size: 'text-base', weight: 'font-semibold', color: 'text-orange-500', transform: 'rotate-0' },
              { text: '品味绝佳', size: 'text-lg', weight: 'font-bold', color: 'text-rose-500', transform: '-rotate-2' },
              { text: '响应及时', size: 'text-xs', weight: 'font-medium', color: 'text-teal-600', transform: 'rotate-1' },
              { text: '预算把控好', size: 'text-base', weight: 'font-semibold', color: 'text-amber-600', transform: '-rotate-1' },
              { text: '神仙设计', size: 'text-sm', weight: 'font-medium', color: 'text-pink-500', transform: 'rotate-2' },
              { text: '耐心', size: 'text-xs', weight: 'font-normal', color: 'text-slate-500', transform: '-rotate-1' },
            ].map((tag, i) => (
              <span 
                key={i} 
                className={cn(
                  tag.size,
                  tag.weight,
                  tag.color,
                  tag.transform,
                  "opacity-90 hover:opacity-100 hover:scale-110 transition-all cursor-default"
                )}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DigitalIdentitySettingsPage = ({ onBack, onMenuClick }: { onBack: () => void, onMenuClick?: (label: string) => void }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <div className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">数字身份设置</h1>
        </div>
      </div>
      <div className="px-5 py-6 space-y-6 flex-1 overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-sm font-bold text-gray-900">基本信息</h4>
          </div>
          <div className="bg-white rounded-[24px] p-2 border border-gray-100 shadow-sm">
            {[
              { label: '头像', value: <img src="https://i.pravatar.cc/150?u=shenziyi" className="w-8 h-8 rounded-full" /> },
              { label: '昵称', value: '沈子怡' },
              { label: '姓名', value: '沈*怡' },
              { label: '所在地区', value: '中国区' }
            ].map((item, idx) => (
              <button key={idx} onClick={() => onMenuClick?.(`修改${item.label}`)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-[20px] transition-colors group">
                <span className="text-[14px] font-medium text-gray-700">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-gray-400 flex items-center">{item.value}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between px-1 pt-4">
            <h4 className="text-sm font-bold text-gray-900">当前账号</h4>
          </div>
          <div className="bg-white rounded-[24px] p-2 border border-gray-100 shadow-sm">
            <button onClick={() => onMenuClick?.('修改手机号')} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-[20px] transition-colors group">
              <span className="text-[14px] font-medium text-gray-700">注册手机号</span>
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-gray-400">138****8888</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ onMenuClick }: { onMenuClick: (label: string) => void }) => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      {/* Top Background & Header - Immersive Design */}
      <div className="relative pt-6 pb-8 px-6 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full bg-white z-0" />
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[100px] z-0" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-indigo-400/10 rounded-full blur-[80px] z-0" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Premium User Identity Card */}
          <div className="relative mt-2 w-full bg-white rounded-[28px] p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white">
            <div className="relative w-full rounded-[24px] overflow-hidden bg-gradient-to-br from-[#f8faff] via-white to-[#f0f4ff] pt-4 pb-4 px-4">
              {/* Decorative premium blurs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-[30px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-[30px] pointer-events-none" />
              
              {/* Top Bar: Title & Settings */}
              <div className="flex justify-between items-center w-full mb-2 relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                    <Fingerprint className="w-3.5 h-3.5 text-gray-700" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">数字身份</span>
                </div>
                <button onClick={() => onMenuClick('数字身份设置')} className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100 active:scale-90 transition-transform">
                  <Settings className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>

              <div className="relative flex flex-row items-center gap-4 z-10">
                {/* Avatar Area */}
                <div className="relative group shrink-0">
                  <div className="w-[64px] h-[64px] rounded-[18px] overflow-hidden border-[3px] border-white shadow-xl shadow-blue-900/5 bg-gray-50 flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?u=shenziyi" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-1 rounded-lg border-[2px] border-white shadow-md">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                </div>

                {/* Info Area */}
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <h2 className="text-[18px] font-black text-gray-900 truncate tracking-tight mb-0.5">沈子怡</h2>
                  <p className="text-[12px] text-gray-500 font-medium mb-1.5">高级大宅设计师</p>
                  
                  {/* Digital Identity Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap w-full">
                    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-gray-100 shadow-sm">
                      <User className="w-3 h-3 text-blue-500" />
                      <span className="text-[10px] font-bold text-gray-700">实名：沈*怡</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-gray-100 shadow-sm">
                      <MapPin className="w-3 h-3 text-indigo-500" />
                      <span className="text-[10px] font-bold text-gray-700">中国区</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-[32px] pt-6 pb-12 px-5 mt-2 relative z-20 space-y-6 shadow-[0_-4px_24px_rgb(0,0,0,0.02)] min-h-[50vh]">
        {/* Section: My Tools */}
        <div className="py-2">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 px-1">我的工具</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: BookOpen, label: '我发布的线索', color: 'text-indigo-500', bg: 'bg-indigo-50' },
              { icon: UserPlus, label: '拉新推荐', color: 'text-amber-500', bg: 'bg-amber-50' },
              { icon: IdCard, label: '我的名片', color: 'text-blue-500', bg: 'bg-blue-50' }
            ].map((item, idx) => (
              <button key={idx} onClick={() => onMenuClick(item.label)} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className={cn("w-11 h-11 rounded-[14px] flex items-center justify-center", item.bg)}>
                  <item.icon className={cn("w-5 h-5", item.color)} />
                </div>
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section: Personal Assets */}
        <div className="py-2">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 px-1">个人资产</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: FileText, label: '我的档案', color: 'text-emerald-500', bg: 'bg-emerald-50' }
            ].map((item, idx) => (
              <button key={idx} onClick={() => onMenuClick(item.label)} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <div className={cn("w-11 h-11 rounded-[14px] flex items-center justify-center", item.bg)}>
                  <item.icon className={cn("w-5 h-5", item.color)} />
                </div>
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section: System & Support */}
        <div className="py-2">
          <h3 className="text-[15px] font-bold text-gray-900 mb-4 px-1">系统与支持</h3>
          <div className="space-y-1">
            {[
              { icon: LayoutGrid, label: '其他', color: 'text-gray-500', bg: 'bg-gray-50' },
              { icon: LogOut, label: '退出登录', color: 'text-rose-500', bg: 'bg-rose-50' }
            ].map((item, idx) => (
              <button key={idx} onClick={() => onMenuClick(item.label)} className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 rounded-[20px] transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg)}>
                    <item.icon className={cn("w-4 h-4", item.color)} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                  <img src={item.cover} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/40 backdrop-blur-md rounded-md text-[9px] text-white font-bold flex items-center gap-1">
                    {item.type === 'video' ? <Video className="w-2.5 h-2.5" /> : <Image className="w-2.5 h-2.5" />}
                    {item.type === 'video' ? '视频' : '图文'}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-[15px] font-bold text-gray-900 leading-tight truncate">{item.title}</h3>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-2">{item.desc}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-300 font-medium">{item.time}</span>
                    
                    <div className="flex items-center gap-2">
                      {item.status === 'reviewing' && (
                        <button className="px-4 py-1.5 bg-gray-50 text-gray-400 text-xs font-bold rounded-full flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>查看</span>
                        </button>
                      )}
                      
                      {item.status === 'published' && (
                        <button 
                          onClick={() => toggleStatus(item.id, 'offline')}
                          className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-full flex items-center gap-1.5 active:scale-95 transition-transform"
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>下线</span>
                        </button>
                      )}
                      
                      {item.status === 'failed' && (
                        <button className="px-4 py-1.5 bg-emerald-50 text-[#07c160] text-xs font-bold rounded-full flex items-center gap-1.5 active:scale-95 transition-transform">
                          <Pencil className="w-3.5 h-3.5" />
                          <span>再次编辑</span>
                        </button>
                      )}
                      
                      {item.status === 'offline' && (
                        <button 
                          onClick={() => toggleStatus(item.id, 'published')}
                          className="px-4 py-1.5 bg-[#07c160] text-white text-xs font-bold rounded-full flex items-center gap-1.5 active:scale-95 transition-transform shadow-sm shadow-[#07c160]/20"
                        >
                          <ArrowUpCircle className="w-3.5 h-3.5" />
                          <span>上线</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {item.status === 'failed' && item.failReason && (
                <div className="px-4 py-3 bg-red-50/30 border-t border-red-50/50 flex items-start gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5" />
                  <p className="text-[11px] text-red-400 font-medium leading-relaxed">
                    未通过原因：{item.failReason}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const PublishModal = ({ 
  isOpen, 
  onClose,
  initialStep = 'choice',
  initialType = null
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialStep?: 'choice' | 'form';
  initialType?: 'graphic' | 'video' | 'lead' | 'recruitment' | null;
}) => {
  const [step, setStep] = useState<'choice' | 'form'>(initialStep);
  const [type, setType] = useState<'graphic' | 'video' | 'lead' | 'recruitment' | null>(initialType);
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');
  const [isAIWriting, setIsAIWriting] = useState(false);
  const [isFullScreenDescription, setIsFullScreenDescription] = useState(false);
  const [houseStructure, setHouseStructure] = useState<'flat' | 'villa'>('flat');
  const [houseStatus, setHouseStatus] = useState<'old' | 'raw'>('raw');
  const [recruitmentType, setRecruitmentType] = useState<string[]>([]);
  const [projectOverview, setProjectOverview] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [houseArea, setHouseArea] = useState('');
  const [budget, setBudget] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [functionReq, setFunctionReq] = useState('');
  const [styleReq, setStyleReq] = useState('');
  const [durationReq, setDurationReq] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(initialStep);
      setType(initialType);
      setImages([]);
      setTags([]);
      setTagInput('');
      setDescription('');
      setIsAIWriting(false);
      setIsFullScreenDescription(false);
      setHouseStructure('flat');
      setHouseStatus('raw');
      setRecruitmentType([]); // Reset to empty array
      setProjectOverview('');
      setCommunityName('');
      setHouseArea('');
      setBudget('');
      setPhone('');
      setTitle('');
      setOwnerName('');
      setFunctionReq('');
      setStyleReq('');
      setDurationReq('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialStep, initialType]);

  const handleAIWrite = async () => {
    if (isAIWriting) return;
    setIsAIWriting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "帮我写一段装修需求描述。要求：三室两厅，现代简约风格，预算20万，注重储物空间和环保材料。请用专业且口语化的方式表达。",
        config: {
          systemInstruction: "你是一个专业的装修顾问，帮助用户撰写清晰、专业的装修需求描述。",
        }
      });
      if (response.text) {
        setDescription(response.text);
      }
    } catch (error) {
      console.error("AI Writing failed:", error);
      // Fallback mock if API fails or key is missing
      setDescription("我家是三室两厅的格局，希望能做现代简约风格。装修预算在20万左右，希望能充分利用空间多做一些储物柜，材料一定要环保，尤其是小孩子的房间。");
    } finally {
      setIsAIWriting(false);
    }
  };

  const handleChoice = (t: 'graphic' | 'video' | 'lead' | 'recruitment') => {
    setType(t);
    setStep('form');
  };

  const handleBack = () => {
    if (step === 'form' && initialStep === 'choice') {
      setStep('choice');
    } else {
      onClose();
    }
  };

  const addImage = () => {
    const newImg = `https://picsum.photos/seed/${Math.random()}/800/800`;
    setImages(prev => [...prev, newImg]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleEditTag = (tag: string) => {
    if (tagInput.trim()) {
      addTag(); // Save current input if not empty
    }
    setTagInput(tag);
    removeTag(tag);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative flex-1 flex flex-col min-h-0 bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50 bg-white shrink-0">
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-800" />
              </button>
              <h2 className="text-lg font-bold text-gray-900">
                {step === 'choice' ? '发布' : (
                  type === 'graphic' ? '发布图文' : 
                  type === 'video' ? '发布视频' : 
                  type === 'lead' ? '发布线索' : '发布项目招募'
                )}
              </h2>
              {step === 'form' ? (
                <button 
                  onClick={onClose}
                  className="px-4 py-1.5 bg-[#07c160] text-white text-sm font-bold rounded-full shadow-sm active:scale-95 transition-transform"
                >
                  发布
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              {step === 'choice' ? (
                <div className="space-y-8 pt-4">
                  {/* Category 2: Renovation */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 px-2">
                      <div className="w-1 h-4 bg-orange-500 rounded-full" />
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">发布装修</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleChoice('lead')}
                        className="w-full bg-orange-50/50 p-6 rounded-2xl flex items-center justify-between group border border-orange-100/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-base font-bold text-orange-900">我是项目发起人</h3>
                            <p className="text-orange-600/60 text-xs mt-0.5">提供项目线索，享高额佣金回报</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 pb-10">
                  {type === 'lead' ? (
                    <div className="space-y-8">
                      {/* Section 1: 项目基础情况 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 bg-orange-500 rounded-full" />
                          <h3 className="text-base font-bold text-gray-900">项目基本情况</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-500">项目名称</label>
                            <input 
                              type="text" 
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="例如：三室两厅现代简约精装" 
                              className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-500">项目位置</label>
                            <input 
                              type="text" 
                              value={communityName}
                              onChange={(e) => setCommunityName(e.target.value)}
                              placeholder="请输入小区/建筑名称等详细位置" 
                              className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-500">户型面积 (m²)</label>
                            <input 
                              type="number" 
                              value={houseArea}
                              onChange={(e) => setHouseArea(e.target.value)}
                              placeholder="请输入户型面积" 
                              className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: 业主联系信息 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 bg-orange-500 rounded-full" />
                          <h3 className="text-base font-bold text-gray-900">业主联系信息</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-500">业主姓名</label>
                            <input 
                              type="text" 
                              value={ownerName}
                              onChange={(e) => setOwnerName(e.target.value)}
                              placeholder="请输入业主姓名" 
                              className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm text-gray-500">联系电话</label>
                            <input 
                              type="tel" 
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="请输入业主联系方式" 
                              className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 3: 详细需求 */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 bg-orange-500 rounded-full" />
                          <h3 className="text-base font-bold text-gray-900">详细需求</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm text-gray-500">功能需求</label>
                              <input 
                                type="text" 
                                value={functionReq}
                                onChange={(e) => setFunctionReq(e.target.value)}
                                placeholder="如：三房变两房" 
                                className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-gray-500">风格需求</label>
                              <input 
                                type="text" 
                                value={styleReq}
                                onChange={(e) => setStyleReq(e.target.value)}
                                placeholder="如：现代极简" 
                                className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm text-gray-500">预算需求</label>
                              <input 
                                type="text" 
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="如：20万左右" 
                                className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-gray-500">工期需求</label>
                              <input 
                                type="text" 
                                value={durationReq}
                                onChange={(e) => setDurationReq(e.target.value)}
                                placeholder="如：3个月内交房" 
                                className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none border border-transparent focus:border-orange-500/30 transition-all placeholder:font-normal"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-500">备注补充</label>
                            <textarea 
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="请输入其他想补充说明的内容..."
                              className="w-full bg-gray-50 rounded-xl p-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-orange-500/5 border border-transparent focus:border-orange-500/30 transition-all resize-none h-32 placeholder:font-normal"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 px-4 py-3 bg-orange-50 text-orange-600 rounded-xl border border-orange-100/50">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-medium">24小时内会有服务专家联系您，请注意接听电话</span>
                      </div>
                    </div>
                  ) : type === 'recruitment' ? (
                    <div className="space-y-6">
                      {/* Section 1: Project Basic Info */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full" />
                          <h3 className="text-base font-bold text-gray-900">项目基础信息</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400 block mb-1">项目名称</label>
                            <input 
                              type="text" 
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="请输入项目名称" 
                              className="w-full bg-gray-50 rounded-xl p-4 text-sm focus:outline-none border border-transparent focus:border-amber-500/30 transition-all"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="text-sm text-gray-400 block mb-1">招募类型</label>
                            <div className="flex flex-wrap gap-2">
                              {['高端设计师', '高端工长', '拆除工', '水电工', '木工', '泥瓦工', '油漆工'].map((t) => (
                                <button
                                  key={t}
                                  onClick={() => {
                                    setRecruitmentType(prev => 
                                      prev.includes(t) ? prev.filter(i => i !== t) : [...prev, t]
                                    )
                                  }}
                                  className={cn(
                                    "px-4 py-2 rounded-xl text-xs font-medium transition-all border",
                                    recruitmentType.includes(t) 
                                      ? "bg-amber-500 text-white border-amber-500 shadow-sm" 
                                      : "bg-gray-50 text-gray-600 border-gray-100 hover:border-amber-200"
                                  )}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm text-gray-400 block mb-1">装修面积 (m²)</label>
                              <input 
                                type="number" 
                                value={houseArea}
                                onChange={(e) => setHouseArea(e.target.value)}
                                placeholder="请输入" 
                                className="w-full bg-gray-50 rounded-xl p-4 text-sm focus:outline-none border border-transparent focus:border-amber-500/30 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm text-gray-400 block mb-1">房屋结构</label>
                              <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
                                <button 
                                  onClick={() => setHouseStructure('flat')}
                                  className={cn(
                                    "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                                    houseStructure === 'flat' ? "bg-white text-amber-600 shadow-sm" : "text-gray-400"
                                  )}
                                >
                                  平层
                                </button>
                                <button 
                                  onClick={() => setHouseStructure('villa')}
                                  className={cn(
                                    "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                                    houseStructure === 'villa' ? "bg-white text-amber-600 shadow-sm" : "text-gray-400"
                                  )}
                                >
                                  别墅
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-400 block mb-1">房屋状态</label>
                            <div className="flex bg-gray-50 rounded-xl p-1 border border-gray-100">
                              <button 
                                onClick={() => setHouseStatus('raw')}
                                className={cn(
                                  "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                                  houseStatus === 'raw' ? "bg-white text-amber-600 shadow-sm" : "text-gray-400"
                                )}
                              >
                                毛坯房
                              </button>
                              <button 
                                onClick={() => setHouseStatus('old')}
                                className={cn(
                                  "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                                  houseStatus === 'old' ? "bg-white text-amber-600 shadow-sm" : "text-gray-400"
                                )}
                              >
                                旧房
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Project Overview & Requirements */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full" />
                          <h3 className="text-base font-bold text-gray-900">项目详情</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm text-gray-400 block mb-1">项目概况</label>
                            <textarea 
                              value={projectOverview}
                              onChange={(e) => setProjectOverview(e.target.value)}
                              placeholder="请简要介绍项目背景、地理位置等"
                              className="w-full bg-gray-50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 border border-transparent focus:border-amber-500/30 transition-all h-24 resize-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-400 block mb-1">招募要求描述</label>
                            <textarea 
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="请详细描述对招募人员的要求（如：经验要求、工艺标准等）"
                              className="w-full bg-gray-50 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 border border-transparent focus:border-amber-500/30 transition-all h-32 resize-none"
                            />
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-sm font-medium">招募标签</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="bg-amber-50 text-amber-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-100"
                                >
                                  #{tag}
                                  <button onClick={() => removeTag(tag)} className="hover:text-amber-700">
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                              <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-100 focus-within:border-amber-500/30 transition-colors min-w-[140px]">
                                <span className="text-gray-300 text-xs mr-1">#</span>
                                <input 
                                  type="text" 
                                  value={tagInput}
                                  onChange={(e) => setTagInput(e.target.value)}
                                  onKeyDown={handleTagKeyDown}
                                  placeholder="回车添加标签" 
                                  className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-gray-300"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Visuals (Keeping existing but making it optional) */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-4 bg-amber-500 rounded-full" />
                          <h3 className="text-base font-bold text-gray-900">项目照片 (选填)</h3>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                          <div className="space-y-3">
                            <label className="text-sm text-gray-400 flex items-center gap-2">
                              <Camera className="w-4 h-4" />
                              房屋照片/视频
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              <AnimatePresence>
                                {images.map((img, index) => (
                                  <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="relative aspect-square rounded-xl overflow-hidden group"
                                  >
                                    <img src={img} className="w-full h-full object-cover" />
                                    <button 
                                      onClick={() => removeImage(index)}
                                      className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="w-2.5 h-2.5" />
                                    </button>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                              {images.length < 9 && (
                                <button 
                                  onClick={addImage}
                                  className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="w-5 h-5" />
                                  <span className="text-[10px]">{images.length}/9</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100/50">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-medium">24小时内会有服务专家联系您，请注意接听电话</span>
                      </div>
                    </div>
                  ) : type === 'video' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-[3/4] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Video className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-[11px] font-medium">上传视频</span>
                      </div>
                      <div className="aspect-[3/4] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Image className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-[11px] font-medium">上传封面</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      <AnimatePresence>
                        {images.map((img, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative aspect-square rounded-xl overflow-hidden group"
                          >
                            <img src={img} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {images.length < 9 && (
                        <button 
                          onClick={addImage}
                          className="aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                          <Camera className="w-6 h-6 text-emerald-500" />
                          <span className="text-[10px] font-medium">{images.length}/9</span>
                        </button>
                      )}
                    </div>
                  )}

                  {(type === 'graphic' || type === 'video') && (
                    <div className="space-y-6">
                      <div className="border-b border-gray-100 pb-3">
                        <input 
                          type="text" 
                          placeholder="填写标题（最多20字）" 
                          className="w-full bg-transparent border-none outline-none font-bold text-xl placeholder:text-gray-200"
                        />
                      </div>

                      {/* Custom Tags Section - Moved up for better visibility */}
                      <div className="space-y-3 py-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Bookmark className="w-4 h-4" />
                            <span className="text-sm font-medium">标签</span>
                          </div>
                          <span className="text-[10px] text-gray-300">点击标签可编辑</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="bg-emerald-50 text-[#07c160] text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-100 group/tag"
                            >
                              <span 
                                onClick={() => handleEditTag(tag)}
                                className="cursor-pointer hover:underline flex items-center gap-1"
                              >
                                #{tag}
                                <Pencil className="w-2.5 h-2.5 opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                              </span>
                              <button onClick={() => removeTag(tag)} className="hover:text-emerald-700 ml-0.5">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                          <div className="flex-1 flex items-center bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100 focus-within:border-emerald-200 transition-colors min-w-[140px]">
                            <span className="text-gray-300 text-xs mr-1">#</span>
                            <input 
                              type="text" 
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleTagKeyDown}
                              placeholder="输入标签按回车" 
                              className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-gray-300"
                            />
                            {tagInput && (
                              <button onClick={addTag} className="ml-1 text-emerald-500 p-0.5 hover:bg-emerald-100 rounded-full transition-colors">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <textarea 
                        placeholder="添加正文，分享你的装修故事..." 
                        rows={6}
                        className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-200 resize-none leading-relaxed text-[15px] pt-2 border-t border-gray-50"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const VideoPlayerPage = (props: { item: typeof CASE_DATA[0]; onBack: () => void; key?: React.Key }) => {
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
          {(item as any).tags && (item as any).tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {(item as any).tags.map((tag: string) => (
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

const GraphicDetailPage = (props: { item: typeof CASE_DATA[0]; onBack: () => void; key?: React.Key }) => {
  const { item, onBack } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const images = (item as any).images || [item.image];

  const shareOptions = [
    { id: 'wechat', label: '微信好友', icon: MessageCircle, color: 'bg-[#07c160]' },
    { id: 'message', label: '私信好友', icon: MessageSquare, color: 'bg-blue-500' },
    { id: 'link', label: '复制链接', icon: Link, color: 'bg-gray-600' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <div className="flex items-center gap-2">
            <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full border border-gray-100" />
            <span className="text-sm font-bold text-gray-900">{item.author}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[#07c160] text-xs font-bold px-3 py-1.5 rounded-full border border-[#07c160]/30 bg-[#07c160]/5">
            关注
          </button>
          <button className="text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50">
            私聊
          </button>
          <button 
            onClick={() => setShowShare(true)}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-24">
        {/* Image Section - Carousel */}
        <div className="relative w-full bg-gray-50 aspect-square overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out h-full"
            style={{ transform: `translateX(-${imgIndex * 100}%)` }}
          >
            {images.map((img: string, i: number) => (
              <div key={i} className="w-full h-full flex-shrink-0">
                <img 
                  src={img} 
                  alt={`${item.title} ${i + 1}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_: any, i: number) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === imgIndex ? "w-4 bg-white" : "w-1 bg-white/50"
                  )}
                />
              ))}
            </div>
          )}

          {/* Swipe Controls (Simplified for demo) */}
          {images.length > 1 && (
            <>
              <button 
                onClick={() => setImgIndex(prev => Math.max(0, prev - 1))}
                className={cn(
                  "absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 text-white backdrop-blur-sm",
                  imgIndex === 0 && "opacity-0 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setImgIndex(prev => Math.min(images.length - 1, prev + 1))}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 text-white backdrop-blur-sm",
                  imgIndex === images.length - 1 && "opacity-0 pointer-events-none"
                )}
              >
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </>
          )}
        </div>

        {/* Text Content */}
        <div className="px-5 py-6">
          <h1 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
            {item.title}
          </h1>
          <div className="space-y-4">
            <p className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
            
            {/* Tags */}
            {(item as any).tags && (item as any).tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {(item as any).tags.map((tag: string) => (
                  <span key={tag} className="text-[#07c160] text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-[11px] text-gray-400 pt-2">
              发布于 2024-02-25 22:42
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gray-100 my-8" />

          {/* Comments Section Placeholder */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">共 {item.comments} 条评论</h3>
            </div>
            <div className="flex gap-3">
              <img src="https://i.pravatar.cc/150?u=me" className="w-8 h-8 rounded-full" />
              <div className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm text-gray-400">
                说点什么吧...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interaction Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 px-4 py-3 pb-safe flex items-center gap-4 z-30">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="说点什么..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <div className="flex items-center gap-5 pr-2">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-0.5"
          >
            <Heart className={cn("w-6 h-6", isLiked ? "text-red-500 fill-current" : "text-gray-700")} />
            <span className="text-[10px] text-gray-500 font-medium">{item.likes}</span>
          </button>
          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className="flex flex-col items-center gap-0.5"
          >
            <Bookmark className={cn("w-6 h-6", isFavorited ? "text-yellow-500 fill-current" : "text-gray-700")} />
            <span className="text-[10px] text-gray-500 font-medium">{item.favorites}</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <MessageCircle className="w-6 h-6 text-gray-700" />
            <span className="text-[10px] text-gray-500 font-medium">{item.comments}</span>
          </button>
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

const CityModal = ({ isOpen, onClose, onSelect, currentCity }: { isOpen: boolean; onClose: () => void; onSelect: (city: string) => void; currentCity: string }) => {
  const cities = ['北京', '西安', '南阳', '上海', '广州', '深圳', '杭州', '成都'];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 bg-white rounded-t-[32px] z-[210] px-6 pt-8 pb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">选择城市</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => onSelect(city)}
                  className={cn(
                    "py-3 rounded-2xl text-sm font-medium transition-all",
                    city === currentCity 
                      ? "bg-[#07c160] text-white shadow-lg shadow-[#07c160]/30" 
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
            
            <div className="mt-10 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-orange-700 leading-relaxed">
                切换城市后，我们将为您展示该地区的精选案例与本地化家装服务。
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const LikesAndCollectionsPage = ({ onBack }: { onBack: () => void }) => {
  const items = [
    { id: 1, user: '张三', action: 'like', target: '现代简约风格别墅装修', time: '10分钟前', avatar: 'https://i.pravatar.cc/150?u=zhang' },
    { id: 2, user: '李四', action: 'collect', target: '老房翻新：50平米小户型大变身', time: '1小时前', avatar: 'https://i.pravatar.cc/150?u=li' },
    { id: 3, user: '王五', action: 'like', target: '中式禅意茶室设计', time: '2小时前', avatar: 'https://i.pravatar.cc/150?u=wang' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">赞和收藏</h1>
      </div>
      <div className="flex-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4 px-4 py-4 border-b border-gray-50">
            <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{item.user}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <p className="text-sm text-gray-600">
                {item.action === 'like' ? '赞了你的作品' : '收藏了你的作品'} <span className="font-medium text-gray-900">《{item.target}》</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewFollowersPage = ({ onBack }: { onBack: () => void }) => {
  const followers = [
    { id: 1, name: '赵六', desc: '喜欢简约风格', time: '今天 09:00', avatar: 'https://i.pravatar.cc/150?u=zhao' },
    { id: 2, name: '孙七', desc: '正在装修中', time: '昨天 18:30', avatar: 'https://i.pravatar.cc/150?u=sun' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">新增关注</h1>
      </div>
      <div className="flex-1">
        {followers.map((follower) => (
          <div key={follower.id} className="flex items-center gap-4 px-4 py-4 border-b border-gray-50">
            <img src={follower.avatar} alt={follower.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900">{follower.name}</h3>
              <p className="text-xs text-gray-500">{follower.desc}</p>
              <p className="text-[10px] text-gray-400 mt-1">关注了你 · {follower.time}</p>
            </div>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
              回关
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentsPage = ({ onBack }: { onBack: () => void }) => {
  const comments = [
    { id: 1, user: '周八', content: '设计得真不错，请问这个灯是在哪里买的？', target: '现代简约风格别墅装修', time: '15分钟前', avatar: 'https://i.pravatar.cc/150?u=zhou' },
    { id: 2, user: '吴九', content: '很有参考价值，收藏了！', target: '老房翻新：50平米小户型大变身', time: '2小时前', avatar: 'https://i.pravatar.cc/150?u=wu' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">评论</h1>
      </div>
      <div className="flex-1">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4 px-4 py-4 border-b border-gray-50">
            <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{comment.user}</span>
                <span className="text-xs text-gray-400">{comment.time}</span>
              </div>
              <p className="text-sm text-gray-800 mb-2">{comment.content}</p>
              <div className="bg-gray-50 p-2 rounded-lg text-xs text-gray-500">
                评论了你的作品 《{comment.target}》
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const messages = [
    { id: 1, name: '系统通知', content: '您的账号安全设置已更新', time: '10:30', icon: Bell, color: 'bg-blue-50', iconColor: 'text-blue-500', unread: 1 },
    { id: 2, name: '线索分配通知', content: '您有一条新的线索待跟进', time: '09:15', icon: UserCheck, color: 'bg-orange-50', iconColor: 'text-orange-500', unread: 1 },
    { id: 3, name: '认证通知', content: '恭喜！您的行业认证已审核通过', time: '昨天', icon: ShieldCheck, color: 'bg-emerald-50', iconColor: 'text-emerald-500', unread: 0 },
    { id: 4, name: '项目通知', content: '新项目“西湖别墅整装”邀您参与', time: '前天', icon: Briefcase, color: 'bg-indigo-50', iconColor: 'text-indigo-500', unread: 0 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center">
        <h1 className="text-lg font-bold text-gray-900">消息</h1>
      </div>

      <div className="divide-y divide-gray-50 mt-2">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-center gap-4 px-4 py-4 active:bg-gray-50 transition-colors">
            <div className="relative">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", msg.color)}>
                <msg.icon className={cn("w-6 h-6", msg.iconColor)} />
              </div>
              {msg.unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {msg.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[15px] font-bold text-gray-900 truncate">{msg.name}</h3>
                <span className="text-[10px] text-gray-400">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyRequirementDetailPage = ({ req, onBack, statuses }: { req: any, onBack: () => void, statuses: any[] }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col z-[100] fixed inset-0 overflow-y-auto">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">线索详情</h1>
      </div>

      <div className="p-4 space-y-6 pb-12">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{statuses.find(s => s.id === req.status)?.label}</h2>
            <p className="text-xs text-gray-400">线索编号: No.{req.id}938210</p>
          </div>
          <div className={cn(
                  "px-3 py-1.5 rounded-full font-bold text-xs",
                  req.status === 'waiting-connection' ? "bg-amber-50 text-amber-500" :
                  req.status === 'waiting-assignment' ? "bg-blue-50 text-blue-500" :
                  req.status === 'converting' ? "bg-indigo-50 text-indigo-500" :
                  req.status === 'converted' ? "bg-emerald-50 text-emerald-500" :
                  "bg-gray-100 text-gray-400"
                )}>
                  {statuses.find(s => s.id === req.status)?.label}
          </div>
        </div>

        {req.status === 'closed' && req.reason && (
          <div className="p-4 bg-gray-100/50 rounded-2xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500 leading-relaxed">关闭原因：{req.reason}</p>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-orange-500 rounded-full" />
            <h3 className="text-sm font-bold text-gray-900">项目基本情况</h3>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-400">项目名称</span>
              <span className="text-[15px] font-bold text-gray-800">{req.title}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-400">项目位置</span>
              <span className="text-[15px] font-bold text-gray-800">{req.communityName}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-400">户型面积 (m²)</span>
              <span className="text-[15px] font-bold text-gray-800">{req.area} m²</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-orange-500 rounded-full" />
            <h3 className="text-sm font-bold text-gray-900">业主联系信息</h3>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
             <div className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-400">业主姓名</span>
              <span className="text-[15px] font-bold text-gray-800">{req.ownerName}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-gray-400">联系电话</span>
              <span className="text-[15px] font-bold text-gray-800">{req.phone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-orange-500 rounded-full" />
            <h3 className="text-sm font-bold text-gray-900">详细需求</h3>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400">功能需求</span>
                <span className="text-[15px] font-bold text-gray-800">{req.functionReq || '暂无说明'}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400">风格需求</span>
                <span className="text-[15px] font-bold text-gray-800">{req.styleReq || '暂无说明'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400">预算需求</span>
                <span className="text-[15px] font-bold text-gray-800">{req.budget} 万</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400">工期需求</span>
                <span className="text-[15px] font-bold text-gray-800">{req.durationReq || '暂无说明'}</span>
              </div>
            </div>
            {req.notes && (
              <div className="flex flex-col gap-1.5 pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-400">备注补充</span>
                <span className="text-[15px] font-bold text-gray-800 leading-relaxed max-w-full break-words whitespace-pre-wrap">{req.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyRequirementsPage = ({ onBack }: { onBack: () => void }) => {
  const [activeStatus, setActiveStatus] = useState<'waiting-connection' | 'waiting-assignment' | 'converting' | 'converted' | 'closed'>('waiting-connection');
  const [selectedReq, setSelectedReq] = useState<any>(null);
  
  const statuses = [
    { id: 'waiting-connection', label: '待对接' },
    { id: 'waiting-assignment', label: '待分配' },
    { id: 'converting', label: '转化中' },
    { id: 'converted', label: '已转化' },
    { id: 'closed', label: '已关闭' },
  ];

  const requirements = [
    { id: 1, title: '海淀区120平三居室全案设计', communityName: '北京市海淀区中关村软件园二期', area: 120, ownerName: '张先生', phone: '138****0001', functionReq: '三室变两室', styleReq: '现代极简', budget: 30, durationReq: '3个月内', notes: '希望本月内能安排设计师上门量房，优先考虑熟悉智能家居联动的设计师。', time: '2024-03-01 10:00', status: 'waiting-connection' },
    { id: 2, title: '朝阳区90平老房翻新局装', communityName: '朝阳区望京SOHO附近', area: 90, ownerName: '李女士', phone: '139****2233', functionReq: '厨房卫生间翻新', styleReq: '北欧风', budget: 15, durationReq: '1个月内', notes: '房子墙面有些发霉脱皮，希望能一块处理。只接受工作日施工。', time: '2024-02-28 15:30', status: 'waiting-assignment' },
    { id: 3, title: '远洋别墅350平现代轻奢施工', communityName: '远洋LAVIE', area: 350, ownerName: '王总', phone: '186****8888', functionReq: '全案施工及软装配套', styleReq: '现代轻奢', budget: 120, durationReq: '半年内', time: '2024-02-25 09:00', status: 'converting'},
    { id: 4, title: '单身公寓软装搭配设计', communityName: '通州区运河苑', area: 45, ownerName: '赵小姐', phone: '158****6666', functionReq: '软装采买及搭配', styleReq: '极简/原木', budget: 5, durationReq: '不限', notes: '主要是软装采买，预算较紧，可以慢慢配', time: '2024-02-20 14:00', status: 'converted' },
    { id: 5, title: '商铺工装设计与施工', communityName: '三里屯SOHO 3号楼', area: 200, ownerName: '刘老板', phone: '130****9999', functionReq: '餐饮店面设计施工', styleReq: '赛博朋克', budget: 50, durationReq: '1个半月', time: '2024-02-15 11:00', status: 'closed', reason: '客户预算不足已取消' },
  ];

  const filteredRequirements = requirements.filter(req => req.status === activeStatus);

  if (selectedReq) {
    return (
      <MyRequirementDetailPage 
        req={selectedReq} 
        onBack={() => setSelectedReq(null)}
        statuses={statuses}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 border-b border-gray-50 flex items-center justify-center relative">
        <button onClick={onBack} className="absolute left-4 p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我发布的线索</h1>
      </div>

      <div className="bg-white px-4 flex items-center overflow-x-auto no-scrollbar gap-5 border-b border-gray-50 sticky top-[61px] z-40">
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => setActiveStatus(status.id as any)}
            className={cn(
              "py-4 text-sm font-medium relative transition-colors whitespace-nowrap",
              activeStatus === status.id ? "text-blue-600" : "text-gray-500"
            )}
          >
            {status.label}
            {activeStatus === status.id && (
              <motion.div 
                layoutId="statusTabReq"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 space-y-4">
        {filteredRequirements.length > 0 ? (
          filteredRequirements.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-gray-900 truncate pr-2">{req.title}</h3>
                <span className={cn(
                  "text-[10px] px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0",
                  req.status === 'waiting-connection' ? "bg-amber-50 text-amber-500" :
                  req.status === 'waiting-assignment' ? "bg-blue-50 text-blue-500" :
                  req.status === 'converting' ? "bg-indigo-50 text-indigo-500" :
                  req.status === 'converted' ? "bg-emerald-50 text-emerald-500" :
                  "bg-gray-100 text-gray-400"
                )}>
                  {statuses.find(s => s.id === req.status)?.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-gray-400">房屋面积</span>
                  <span className="text-sm font-bold text-gray-700">{req.area} m²</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-gray-400">装修预算</span>
                  <span className="text-sm font-bold text-gray-700">{req.budget} 万元</span>
                </div>
              </div>
              {req.status === 'closed' && (req as any).reason && (
                <div className="mb-4 p-3 bg-gray-50 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">关闭原因：{(req as any).reason}</p>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-[10px] text-gray-400">{req.time}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedReq(req)}
                    className="px-4 py-1.5 text-xs font-bold text-gray-600 bg-gray-50 rounded-full border border-gray-100 active:scale-95 transition-transform"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ClipboardCheck className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">暂无相关需求的线索</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PractitionerCertificationPage = ({ onBack }: { onBack: () => void }) => {
  const sections = [
    {
      id: 'real-name',
      title: '信息登记',
      desc: '核实身份信息，建立诚信基础',
      icon: IdCard,
      status: '未登记',
      color: 'blue'
    },
    {
      id: 'skill',
      title: '信息与背景核实',
      desc: '从业经历核实，官方背书保障',
      icon: ShieldCheck,
      status: '待核实',
      color: 'emerald'
    },
    {
      id: 'background',
      title: '培训与考核',
      desc: '专业技能考核，展示职业实力',
      icon: Hammer,
      status: '待参加',
      color: 'purple'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-slate-50 flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-slate-100">
        <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-slate-800" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">从业者认证</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="relative py-4 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">官方认证体系</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-[240px] leading-relaxed">
            建立职业诚信档案<br />
            获取更多高端项目优先权
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="h-[1px] w-8 bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Certification System</span>
            <div className="h-[1px] w-8 bg-slate-200" />
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-4 hover:border-slate-200 transition-all cursor-pointer group">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                section.color === 'blue' ? "bg-blue-50 text-blue-500 group-hover:bg-blue-100" :
                section.color === 'emerald' ? "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100" :
                "bg-purple-50 text-purple-500 group-hover:bg-purple-100"
              )}>
                <section.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{section.title}</h3>
                  <span className="text-xs font-medium text-slate-400">{section.status}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{section.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors" />
            </div>
          ))}
        </div>

        <div className="bg-slate-900 p-6 rounded-[32px] text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
          <h4 className="text-sm font-bold mb-2">认证权益</h4>
          <ul className="space-y-2">
            {[
              '专属认证标识，提升客户信任度',
              '高端大宅项目优先匹配权',
              '平台官方流量扶持与推荐',
              '加入精英从业者社群'
            ].map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-slate-100">
        <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all">
          立即开启认证
        </button>
      </div>
    </motion.div>
  );
};

const SearchPage = ({ onBack }: { onBack: () => void }) => {
  const hotSearches = ['原木风装修', '89平米三室两厅', '水电改造避坑', '从业者认证', '现代简约案例'];
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2.5 gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            autoFocus
            type="text" 
            placeholder="搜索案例、博主、良匠..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <button onClick={onBack} className="text-sm font-medium text-gray-600 px-2">取消</button>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">热门搜索</h3>
        <div className="flex flex-wrap gap-2">
          {hotSearches.map((item) => (
            <span key={item} className="px-4 py-2 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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
        <h1 className="text-lg font-bold text-gray-900">为什么选择良造家</h1>
      </div>

      <div className="p-6 space-y-10">
        <section className="space-y-6 text-center pt-4">
          <div className="inline-flex w-16 h-16 bg-emerald-50 rounded-[24px] items-center justify-center shadow-inner">
            <Sparkles className="w-8 h-8 text-[#07c160]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">良知工程</h2>
            <p className="text-[#07c160] font-bold text-sm tracking-widest uppercase">Efficiency & Fairness</p>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            活好干 | 钱好拿 | 项目多 | 0抽佣 | 数字档案
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6">
          {[
            { title: '活好干', desc: '标准化施工流程，需求清晰明确，专业团队配合，告别沟通扯皮。', icon: Wand2, color: 'text-blue-500', bg: 'bg-blue-50' },
            { title: '钱好拿', desc: '第三方备付金账户保障资金安全，业主验收通过后即刻到账，拒绝恶意欠款，收入更有保障。', icon: Wallet, color: 'text-orange-500', bg: 'bg-orange-50' },
            { title: '项目多', desc: '海量真实线索，精准区域推送，活源稳定不断，告别等活焦虑。', icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { title: '0抽佣', desc: '平台不收提成，辛苦钱全归你，直接联系业主，省去中间环节。', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50' },
            { title: '数字档案', desc: '您的每一项工作都将被数字化永久记录，形成个人职业诚信档案。多维度展示专业实力，让业主更信任，接单更轻松。', icon: Database, color: 'text-cyan-500', bg: 'bg-cyan-50' },
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
            <h3 className="text-2xl font-bold">让每一份匠心都有回报</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              已有超过 5,000+ 优秀工匠通过良造家开启了事业新篇章
            </p>
          </div>
          <button onClick={onBack} className="relative bg-[#07c160] text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#07c160]/30 active:scale-95 transition-transform">
            立即加入我们
          </button>
        </section>
      </div>
    </motion.div>
  );
};

const FollowersPage = ({ onBack }: { onBack: () => void }) => {
  const followers = [
    { name: '装修小白阿强', avatar: 'https://i.pravatar.cc/150?u=aqiang', desc: '正在准备装修中' },
    { name: '设计爱好者小李', avatar: 'https://i.pravatar.cc/150?u=xiaoli', desc: '喜欢收集各种装修灵感' },
    { name: '极简主义者', avatar: 'https://i.pravatar.cc/150?u=minimal', desc: 'Less is more' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的粉丝</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {followers.map((user, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{user.desc}</p>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-[#07c160] text-white text-[10px] font-bold rounded-full">回关</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const FollowingPage = ({ onBack }: { onBack: () => void }) => {
  const followings = [
    { name: '家居博主Momo', avatar: 'https://i.pravatar.cc/150?u=momo', desc: '分享治愈系家居生活' },
    { name: '改造达人小王', avatar: 'https://i.pravatar.cc/150?u=xiaowang', desc: '老房改造专家' },
    { name: '温柔半两', avatar: 'https://i.pravatar.cc/150?u=wenrou', desc: '法式复古风爱好者' },
    { name: '木木家', avatar: 'https://i.pravatar.cc/150?u=mumu', desc: '原木风设计工作室' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的关注</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {followings.map((user, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{user.desc}</p>
              </div>
            </div>
            <button className="px-4 py-1.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded-full">已关注</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const DigitalWorldPage = ({ onBack }: { onBack: () => void }) => {
  const sections = [
    { title: '数字身份', icon: Fingerprint, desc: '基于区块链技术的唯一数字标识，构建行业诚信体系。', color: 'text-cyan-400' },
    { title: '数字档案', icon: FileText, desc: '全生命周期的数字化记录，让每一个交付细节都有迹可循。', color: 'text-blue-400' },
    { title: '数字组织', icon: Users, desc: '打破传统边界，实现跨地域、跨平台的弹性协同组织。', color: 'text-purple-400' },
    { title: '数字企业', icon: Building2, desc: '助力传统装企数字化转型，构建云端管理与运营中心。', color: 'text-indigo-400' },
    { title: '数字项目', icon: Box, desc: '三维可视化项目管理，实时监控进度、质量与成本。', color: 'text-emerald-400' },
    { title: '数字交易中心', icon: Wallet, desc: '安全透明的数字化结算与交易，保障各方合法权益。', color: 'text-amber-400' },
    { title: '家装产业AI', icon: Sparkles, desc: '深度融合AI大模型，赋能设计、营销与交付，驱动产业效率革命。', color: 'text-rose-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col text-white"
    >
      <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-bold">家装AI数字世界</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
            Digital Transformation
          </div>
          <h2 className="text-3xl font-bold leading-tight">
            共创共建共享<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              家装产业新生态
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            我们致力于通过数字化技术重塑家装行业，为每一个从业者和企业提供全方位的数字赋能。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-12">
          {sections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform flex-shrink-0", item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const OtherSettingsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">其他</h1>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-4">
        <div className="bg-white rounded-[24px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          {[
            { icon: FileText, label: '协议', color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Bell, label: '消息通知', color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { icon: ArrowUpCircle, label: '版本更新', color: 'text-emerald-500', bg: 'bg-emerald-50', extra: 'v1.0.3' },
            { icon: MessageSquare, label: '问题反馈', color: 'text-amber-500', bg: 'bg-amber-50' },
            { icon: Ban, label: '注销账号', color: 'text-rose-500', bg: 'bg-rose-50' },
          ].map((item, idx) => (
            <button key={idx} className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 rounded-[20px] transition-colors group active:scale-95">
              <div className="flex items-center gap-3">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg)}>
                  <item.icon className={cn("w-4 h-4", item.color)} />
                </div>
                <span className="text-[15px] font-bold text-gray-800">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.extra && <span className="text-[13px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{item.extra}</span>}
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BANNER_DETAILS = [
  {
    title: "赋能优秀匠人 开启事业新篇",
    subtitle: "助力设计师与工长连接高端需求，实现职业溢价",
    image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=1200",
    sections: [
      {
        title: "事业加速器",
        content: "良造家致力于打破传统装修行业的信息茧房，通过智能匹配算法，将优质的项目直接推送给匹配的匠人，减少无效拓客成本。",
        color: "bg-amber-500",
        items: [
          { title: "精准推送", desc: "根据您的专业擅长，推送匹配度最高的装修线索。", icon: Target },
          { title: "身份背书", desc: "平台级的金牌认证，提升您的专业形象与获客成功率。", icon: Award }
        ]
      },
      {
        title: "成长路径",
        content: "我们不仅提供业务，更提供职业成长的阶梯，包括数字化的个人品牌建设和行业交流机会。",
        color: "bg-blue-500",
        items: [
          { title: "数字简历", desc: "您的每一个成功案例都将被数字化存储，形成强大的职业背书。", icon: IdCard },
          { title: "同行交流", desc: "加入高端匠人社区，分享经验，共创价值。", icon: Users }
        ]
      }
    ]
  },
  {
    title: "透明交付体系 0抽佣金",
    subtitle: "把利润留给创造者，重塑装饰行业价值链",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea70215?auto=format&fit=crop&q=80&w=1200",
    sections: [
      {
        title: "商业模式革新",
        content: "传统装修平台往往抽取高达20%-40%的佣金，严重挤压了从业者的利润空间。良造家坚持0抽佣，让每一分辛苦所得都归属于匠人自身。",
        color: "bg-orange-500",
        items: [
          { title: "全额收益", desc: "拒绝中间商赚差价，合同额就是您的到手额。", icon: Coins },
          { title: "透明结算", desc: "基于智能合约的阶段性支付，保障资金安全。", icon: ShieldCheck }
        ]
      },
      {
        title: "沟通直连",
        content: "平台提倡去中间化，让匠人与业主能够直接、透明地沟通，减少信息传递误差，提高交付质量。",
        color: "bg-indigo-500",
        items: [
          { title: "高效沟通", desc: "平台提供专业辅助沟通工具，确保需求传递精准。", icon: MessageSquare },
          { title: "交付保障", desc: "标准化的交付流程指引，让项目验收更有条理。", icon: ClipboardCheck }
        ]
      }
    ]
  },
  {
    title: "数字诚信档案 职业资产",
    subtitle: "用数据见证匠心，让信用成为您的商业名片",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    sections: [
      {
        title: "信用数字化",
        content: "在良造家，您的信誉不再是空谈。所有的完工评价、项目质量记录都将被不可篡改地记录下来。",
        color: "bg-emerald-500",
        items: [
          { title: "永久存储", desc: "基于区块链技术存储信用轨迹，永久有效。", icon: History },
          { title: "权重激励", desc: "信用等级越高，获得的优质线索推送权重越大。", icon: Crown }
        ]
      },
      {
        title: "口碑资产化",
        content: "我们将您的良好口碑转化为可以量化的职业资产，帮助您在激烈的市场竞争中脱颖而出。",
        color: "bg-purple-500",
        items: [
          { title: "荣誉勋章", desc: "完成里程碑项目可获得平台颁发的荣誉勋章。", icon: Medal },
          { title: "品牌传播", desc: "平台协助优秀匠人进行全网品牌营销，打造个人IP。", icon: Sparkles }
        ]
      }
    ]
  }
];

const BannerDetailPage = ({ index, onBack }: { index: number, onBack: () => void }) => {
  const detail = BANNER_DETAILS[index] || BANNER_DETAILS[0];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">详情介绍</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={detail.image} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-2xl font-black text-white leading-tight">{detail.title}</h2>
            <p className="text-white/80 text-sm mt-2">{detail.subtitle}</p>
          </div>
        </div>

        <div className="p-6 space-y-10 pb-20">
          {detail.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={cn("w-1 h-5 rounded-full", section.color)} />
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {section.content}
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {section.items.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        
        <div className="p-6 border-t border-slate-50 bg-slate-50/50">
          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            已经到底了 · 良造家数字平台 © 2026 版权所有<br />
            致力于重塑行业信任，赋能建筑装饰每一个细微角落。
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [page, setPage] = useState<string>('home');
  const [selectedBannerIndex, setSelectedBannerIndex] = useState(0);
  const [detailSource, setDetailSource] = useState<'home' | 'cases' | 'lead-list'>('home');
  const [selectedCase, setSelectedCase] = useState<typeof CASE_DATA[0] | null>(null);
  const [selectedLead, setSelectedLead] = useState<typeof PROJECT_LEADS_DATA[0] | null>(null);
  const [selectedRecruitment, setSelectedRecruitment] = useState<typeof PROJECT_RECRUITMENT_DATA[0] | null>(null);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [publishModalConfig, setPublishModalConfig] = useState<{ step: 'choice' | 'form', type: any }>({ step: 'choice', type: null });

  const handleOpenPublish = (step: 'choice' | 'form' = 'choice', type: any = null) => {
    setPublishModalConfig({ step, type });
    setIsPublishOpen(true);
  };
  const [selectedCity, setSelectedCity] = useState('北京');
  const [opsCenterCity, setOpsCenterCity] = useState('北京');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);

  const handleSelectCase = (item: typeof CASE_DATA[0], source: 'home' | 'cases' | 'lead-list' = 'home') => {
    setSelectedCase(item);
    setDetailSource(source);
    setPage('detail');
  };

  const handleSelectLead = (item: typeof PROJECT_LEADS_DATA[0], source: 'home' | 'lead-list' = 'home') => {
    setSelectedLead(item);
    setDetailSource(source === 'home' ? 'home' : 'cases');
    setPage('lead-detail');
  };

  const handleSelectRecruitment = (item: typeof PROJECT_RECRUITMENT_DATA[0] | any) => {
    setSelectedRecruitment(item);
    if (item.id === 'hr1') {
      setPage('studio-recruitment-detail');
    } else if (item.id === 'hr2') {
      setPage('designer-recruitment-detail');
    } else if (item.id === 'hr3') {
      setPage('foreman-recruitment-detail');
    } else {
      setPage('recruitment-detail');
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') setPage('home');
    if (tab === 'projects') setPage('my-home');
    if (tab === 'messages') setPage('messages');
    if (tab === 'profile') setPage('profile');
  };

  const handleMenuClick = (label: string) => {
    if (label === '我发布的线索') {
      setPage('my-requirements');
    } else if (label === '我发布的笔记') {
      setPage('my-cases');
    } else if (label === '关注') {
      setPage('following');
    } else if (label === '粉丝') {
      setPage('followers');
    } else if (label === '浏览历史') {
      setPage('browsing-history');
    } else if (label === '我的档案') {
      setPage('my-archive');
    } else if (label === '我的名片') {
      setPage('my-business-card');
    } else if (label === '我的收藏') {
      setPage('my-favorites');
    } else if (label === '拉新推荐') {
      setPage('recommend-practitioner');
    } else if (label === '数字身份设置') {
      setPage('digital-identity-settings');
    } else if (label === '其他') {
      setPage('other-settings');
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityModalOpen(false);
    
    // Simulate reload as requested
    const toast = document.createElement('div');
    toast.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-full z-[300] text-sm font-bold animate-pulse';
    toast.innerText = `正在切换至 ${city}...`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 1000);
  };

  return (
    <div className={cn(
      "min-h-screen bg-gray-50 font-sans", 
      (page === 'home' || page === 'profile' || page === 'messages' || page === 'my-home') && "pb-16",
      (page === 'my-home') && "h-screen overflow-hidden"
    )}>
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <SearchHeader 
              city={selectedCity} 
              onCityClick={() => setIsCityModalOpen(true)} 
              onModeClick={() => setPage('mode-intro')}
              onPublishClick={() => handleOpenPublish()}
            />
            <HomeCarousel onClick={(index) => {
              setSelectedBannerIndex(index);
              setPage('banner-detail');
            }} />
            <TrustStatsBar />
            <CoreModeSection onModeClick={() => setPage('mode-intro')} />
            <HighEndRecruitment onSelectRecruitment={handleSelectRecruitment} />
            <DigitalWorldModule onClick={() => setPage('digital-world')} />
            <SecondaryGrid 
              onInitiatorClick={() => setPage('initiator-recruitment')}
            />
            <GridMenu onItemClick={(id) => {
              if (id === 'combined_projects') handleOpenPublish('form', 'lead');
              if (id === 'certification') setPage('practitioner-certification');
            }} />
            <ListSection 
              onSelectCase={(item) => {
                if (item.type === 'lead') {
                  handleSelectLead(item, 'home');
                } else if (item.type === 'recruitment') {
                  handleSelectRecruitment(item);
                } else {
                  handleSelectCase(item, 'home');
                }
              }} 
              onSearchClick={() => setPage('search')}
            />
          </motion.div>
        )}
        {page === 'search' && <SearchPage onBack={() => setPage('home')} />}
        {page === 'banner-detail' && (
          <BannerDetailPage 
            index={selectedBannerIndex} 
            onBack={() => setPage('home')} 
          />
        )}
        {page === 'practitioner-certification' && (
          <PractitionerCertificationPage onBack={() => setPage('home')} />
        )}
        {page === 'combined-projects' && (
          <CombinedProjectPage 
            onBack={() => setPage('home')} 
            onSelectLead={(item) => handleSelectLead(item, 'lead-list')}
            onSelectRecruitment={handleSelectRecruitment}
          />
        )}
        {page === 'recommend-practitioner' && (
          <RecommendPractitionerPage onBack={() => setPage('home')} />
        )}
        {page === 'digital-world' && <DigitalWorldPage onBack={() => setPage('home')} />}
        {page === 'mode-intro' && <ModeIntroPage onBack={() => setPage('home')} />}
        {page === 'my-home' && (
          <motion.div
            key="my-home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MyHomePage />
          </motion.div>
        )}
        {page === 'ops-center' && (
          <motion.div
            key="ops-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <OperationsCenterPage 
              city={opsCenterCity} 
              onCityChange={setOpsCenterCity} 
              onWorkspaceToggle={setIsWorkspaceActive}
            />
          </motion.div>
        )}

        {page === 'messages' && (
          <motion.div
            key="messages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MessagesPage onNavigate={(p) => setPage(p as any)} />
          </motion.div>
        )}
        {page === 'likes-collections' && (
          <motion.div
            key="likes-collections"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <LikesAndCollectionsPage onBack={() => setPage('messages')} />
          </motion.div>
        )}
        {page === 'new-followers' && (
          <motion.div
            key="new-followers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <NewFollowersPage onBack={() => setPage('messages')} />
          </motion.div>
        )}
        {page === 'comments' && (
          <motion.div
            key="comments"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <CommentsPage onBack={() => setPage('messages')} />
          </motion.div>
        )}
        {page === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ProfilePage onMenuClick={handleMenuClick} />
          </motion.div>
        )}
        {page === 'digital-identity-settings' && (
          <motion.div
            key="digital-identity-settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <DigitalIdentitySettingsPage onBack={() => setPage('profile')} onMenuClick={handleMenuClick} />
          </motion.div>
        )}
        {page === 'other-settings' && (
          <motion.div
            key="other-settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <OtherSettingsPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'browsing-history' && (
          <motion.div
            key="browsing-history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <BrowsingHistoryPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'my-cases' && (
          <motion.div
            key="my-cases"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyCasesPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'my-requirements' && (
          <motion.div
            key="my-requirements"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyRequirementsPage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'my-archive' && (
          <motion.div
            key="my-archive"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyArchivePage onBack={() => setPage('profile')} />
          </motion.div>
        )}
        {page === 'my-business-card' && (
          <motion.div
            key="my-business-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyBusinessCardPage onBack={() => setPage('profile')} onNavigate={(p) => setPage(p as any)} />
          </motion.div>
        )}
        {page === 'my-favorites' && (
          <motion.div
            key="my-favorites"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <MyFavoritesPage onBack={() => setPage('profile')} onSelectLead={handleSelectLead} />
          </motion.div>
        )}
        {page === 'following' && (
          <FollowingPage onBack={() => setPage('profile')} />
        )}
        {page === 'followers' && (
          <FollowersPage onBack={() => setPage('profile')} />
        )}
        {page === 'cases' && (
          <ProjectLeadsPage 
            key="leads" 
            onBack={() => setPage('home')} 
            onSelectLead={(item) => handleSelectLead(item, 'lead-list')}
          />
        )}
        {page === 'recruitment' && (
          <ProjectRecruitmentPage 
            key="recruitment"
            onBack={() => setPage('home')}
            onSelectRecruitment={handleSelectRecruitment}
          />
        )}
        {page === 'recruitment-detail' && selectedRecruitment && (
          <ProjectRecruitmentDetailPage 
            item={selectedRecruitment}
            onBack={() => setPage('recruitment')}
          />
        )}
        {page === 'studio-recruitment-detail' && (
          <HighEndStudioDetailPage 
            onBack={() => setPage('home')}
          />
        )}
        {page === 'designer-recruitment-detail' && (
          <HighEndDesignerDetailPage 
            onBack={() => setPage('home')}
          />
        )}
        {page === 'initiator-recruitment' && (
          <InitiatorRecruitmentPage 
            onBack={() => setPage('home')} 
          />
        )}
        {page === 'foreman-recruitment-detail' && (
          <HighEndForemanDetailPage 
            onBack={() => setPage('home')}
          />
        )}
        {page === 'lead-detail' && selectedLead && (
          <ProjectLeadDetailPage 
            key="lead-detail"
            item={selectedLead}
            onBack={() => setPage(detailSource === 'cases' ? 'cases' : 'home')}
          />
        )}
        {page === 'detail' && selectedCase && (
          selectedCase.contentType === 'video' ? (
            <VideoPlayerPage 
              key="video"
              item={selectedCase} 
              onBack={() => setPage(detailSource)} 
            />
          ) : (
            <GraphicDetailPage 
              key="graphic"
              item={selectedCase}
              onBack={() => setPage(detailSource)}
            />
          )
        )}
      </AnimatePresence>
      {!isWorkspaceActive && (page === 'home' || page === 'profile' || page === 'messages' || page === 'my-home') && (
        <BottomNav 
          activeTab={
            page === 'home' ? 'home' : 
            page === 'my-home' ? 'projects' : 
            page === 'messages' ? 'messages' : 'profile'
          } 
          onTabChange={handleTabChange}
        />
      )}
        <PublishModal 
          isOpen={isPublishOpen} 
          onClose={() => setIsPublishOpen(false)} 
          initialStep={publishModalConfig.step}
          initialType={publishModalConfig.type}
        />
      <CityModal 
        isOpen={isCityModalOpen} 
        onClose={() => setIsCityModalOpen(false)} 
        onSelect={handleCitySelect}
        currentCity={selectedCity}
      />
    </div>
  );
}
