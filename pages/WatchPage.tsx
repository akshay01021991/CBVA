import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowLeft, Bot, Send, LoaderCircle, CheckCircle2, X } from 'lucide-react';
import { COURSES, CURRENT_USER } from '../data/mockData';
import { getAITutorResponse } from '../services/geminiService';
import { Chapter } from '../types';

interface AccordionItemProps {
  chapter: Chapter;
  courseId: string;
  activeVideoId: string;
  completedVideos: string[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ chapter, courseId, activeVideoId, completedVideos }) => {
  const [isOpen, setIsOpen] = useState(chapter.videos.some(v => v.id === activeVideoId));

  return (
    <div className="border-b border-gray-200 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 dark:text-gray-100"
      >
        {chapter.title}
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="bg-gray-50 dark:bg-slate-900">
          {chapter.videos.map((video) => {
            const isCompleted = completedVideos.includes(video.id);
            return (
              <Link
                key={video.id}
                to={`/watch/${courseId}/chapter/${chapter.id}/video/${video.id}`}
                className={`flex items-center justify-between p-4 pl-8 text-sm border-l-4 ${
                  video.id === activeVideoId
                    ? 'bg-primary/10 text-primary border-primary font-semibold'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <span>{video.title} ({video.duration})</span>
                {isCompleted && <CheckCircle2 size={18} className="text-green-500" />}
              </Link>
            )
           })}
        </div>
      )}
    </div>
  );
};

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

const WatchPage: React.FC = () => {
  const { courseId, videoId } = useParams<{ courseId: string; chapterId: string; videoId: string; }>();
  const navigate = useNavigate();
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorInput, setTutorInput] = useState('');
  const [tutorMessages, setTutorMessages] = useState<ChatMessage[]>([]);
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { course, currentChapter, currentVideo } = useMemo(() => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return { course: null, currentChapter: null, currentVideo: null };
    
    let chapter = null;
    let video = null;

    for (const ch of course.chapters) {
        const foundVideo = ch.videos.find(v => v.id === videoId);
        if (foundVideo) {
            video = foundVideo;
            chapter = ch;
            break;
        }
    }

    return { course, currentChapter: chapter, currentVideo: video };
  }, [courseId, videoId]);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tutorMessages]);

  if (!course || !currentVideo || !currentChapter) {
    return (
        <div className="p-4 text-center text-white bg-black h-screen flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold">Content not found</h2>
            <Link to="/" className="text-primary mt-4 inline-block">Go to Home</Link>
        </div>
    );
  }
  
  const handleTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: tutorInput };
    setTutorMessages(prev => [...prev, userMessage]);
    setTutorInput('');
    setIsTutorLoading(true);

    const context = {
        courseTitle: course.title,
        chapterTitle: currentChapter.title,
        videoTitle: currentVideo.title,
    }

    const aiResponse = await getAITutorResponse(context, userMessage.text);
    
    const aiMessage: ChatMessage = { sender: 'ai', text: aiResponse };
    setTutorMessages(prev => [...prev, aiMessage]);
    setIsTutorLoading(false);
  };
  
  const completedVideosForCourse = CURRENT_USER.progress[course.id] || [];

  return (
    <div className="flex flex-col h-screen bg-black text-gray-800 dark:text-gray-100">
      <header className="bg-slate-800 text-white p-2 flex items-center justify-between z-20 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-md font-bold truncate px-2">{currentVideo.title}</h1>
        <button onClick={() => setIsTutorOpen(true)} className="p-2 flex items-center gap-2 text-sm bg-primary rounded-md">
            <Bot size={18} /> AI Tutor
        </button>
      </header>
      
      <div className="w-full aspect-video bg-black flex items-center justify-center text-white shrink-0">
        <p>Video player for "{currentVideo.title}"</p>
      </div>

      <div className="flex-grow overflow-y-auto bg-white dark:bg-slate-800">
         {course.chapters.map(chapter => (
          <AccordionItem
            key={chapter.id}
            chapter={chapter}
            courseId={course.id}
            activeVideoId={videoId!}
            completedVideos={completedVideosForCourse}
          />
        ))}
      </div>

      {isTutorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-end animate-fade-in">
            <div className="w-full max-w-md h-full bg-white dark:bg-slate-800 shadow-lg flex flex-col transform transition-transform translate-x-0">
                <header className="p-4 flex items-center justify-between border-b dark:border-slate-700 shrink-0">
                    <h2 className="text-lg font-bold flex items-center gap-2"><Bot className="text-primary" /> AI Tutor</h2>
                    <button onClick={() => setIsTutorOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                        <X size={24} />
                    </button>
                </header>
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {tutorMessages.length === 0 && (
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 p-4 rounded-lg bg-gray-100 dark:bg-slate-700">
                            <p>Ask me anything about "{currentVideo.title}" or concepts from this chapter!</p>
                        </div>
                    )}
                    {tutorMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-sm rounded-lg p-3 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100'}`}>
                                <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                            </div>
                        </div>
                    ))}
                    {isTutorLoading && (
                        <div className="flex justify-start">
                             <div className="bg-gray-200 dark:bg-slate-700 rounded-lg p-3 inline-block">
                                <LoaderCircle className="animate-spin text-primary" />
                             </div>
                        </div>
                    )}
                     <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleTutorSubmit} className="p-4 border-t dark:border-slate-700 shrink-0 bg-white dark:bg-slate-800">
                    <div className="relative">
                        <input
                            type="text"
                            value={tutorInput}
                            onChange={(e) => setTutorInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="w-full bg-gray-100 dark:bg-slate-700 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={isTutorLoading}
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full disabled:opacity-50 hover:bg-primary-dark transition-colors" disabled={isTutorLoading || !tutorInput.trim()}>
                            <Send size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
