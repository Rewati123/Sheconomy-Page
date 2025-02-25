"use client"


import React, { useRef, useState } from 'react';
import { BookOpen, ChevronDown, PlayCircle, CheckCircle, Lock, Menu, Search, Bell, User, MoreHorizontal, Download, MessageSquare, ThumbsUp, Share2, Volume2, Settings, Maximize, Pause } from 'lucide-react';

interface Lesson {
    id: number;
    title: string;
    duration: string;
    isCompleted: boolean;
    isLocked: boolean;
    description?: string;
    videoUrl?: string;
  }
  
  interface Section {
    id: number;
    title: string;
    lessons: Lesson[];
  }
  
  function Lesson() {
    const [activeSectionId, setActiveSectionId] = useState<number>(1);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
  
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
  
    const courseSections: Section[] = [
      {
        id: 1,
        title: "Course Introduction",
        lessons: [
          { 
            id: 1, 
            title: "Welcome to the Course", 
            duration: "0:30", 
            isCompleted: true, 
            isLocked: false,
            description: "Get started with this comprehensive introduction to web development. Learn what to expect and how to make the most of this course.",
            videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          },
          { 
            id: 2, 
            title: "Course Overview & Goals", 
            duration: "8:15", 
            isCompleted: true, 
            isLocked: false,
            description: "Understanding the course structure and setting up your learning goals for maximum success.",
            videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          },
        ]
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        lessons: [
          { 
            id: 3, 
            title: "HTML Basics & Structure", 
            duration: "15:20", 
            isCompleted: false, 
            isLocked: false,
            description: "Learn the building blocks of web pages and how to structure your HTML documents properly.",
            videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          },
          { 
            id: 4, 
            title: "Working with Text & Links", 
            duration: "12:45", 
            isCompleted: false, 
            isLocked: false,
            description: "Master text formatting and creating hyperlinks in your web pages.",
            videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          },
        ]
      },
      {
        id: 3,
        title: "CSS Styling",
        lessons: [
          { 
            id: 5, 
            title: "CSS Selectors & Properties", 
            duration: "18:30", 
            isCompleted: false, 
            isLocked: true,
            description: "Deep dive into CSS selectors and properties for styling your web pages."
          },
          { 
            id: 6, 
            title: "Box Model & Layout", 
            duration: "20:15", 
            isCompleted: false, 
            isLocked: true,
            description: "Understanding the CSS box model and creating responsive layouts."
          },
        ]
      }
    ];
  
    const totalLessons = courseSections.reduce((acc, section) => acc + section.lessons.length, 0);
    const completedLessons = courseSections.reduce((acc, section) => 
      acc + section.lessons.filter(lesson => lesson.isCompleted).length, 0
    );
    const progressPercentage = (completedLessons / totalLessons) * 100;
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Web Development Bootcamp</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search in course"
                  className="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
  
        <div className="flex pt-16">
          {/* Sidebar */}
          <div className={`w-80 bg-white border-r border-gray-200 overflow-y-auto fixed h-[calc(100vh-4rem)] transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-gray-500">COURSE PROGRESS</h2>
                  <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Course Content
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {totalLessons} lessons • {Math.round(courseSections.reduce((acc, section) => 
                  acc + section.lessons.reduce((sum, lesson) => sum + parseInt(lesson.duration), 0), 0) / 60)} hours total
              </p>
            </div>
            
            <div className="px-4">
              {courseSections.map((section) => (
                <div key={section.id} className="mb-4">
                  <button
                    onClick={() => setActiveSectionId(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span className="font-medium text-gray-900">{section.title}</span>
                    <ChevronDown className={`w-5 h-5 transform transition-transform ${
                      activeSectionId === section.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {activeSectionId === section.id && (
                    <div className="mt-2 space-y-1">
                      {section.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => !lesson.isLocked && setActiveLesson(lesson)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg ${
                            activeLesson?.id === lesson.id
                              ? 'bg-blue-50 text-blue-700'
                              : 'hover:bg-gray-50'
                          } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center gap-3">
                            {lesson.isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : lesson.isLocked ? (
                              <Lock className="w-5 h-5 text-gray-400" />
                            ) : (
                              <PlayCircle className="w-5 h-5 text-gray-400" />
                            )}
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
            {activeLesson ? (
              <div className="p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video bg-black rounded-xl mb-6 relative group overflow-hidden">
                    {activeLesson.videoUrl ? (
                      <>
                        <video
                          ref={videoRef}
                          className="w-full h-full"
                          src={activeLesson.videoUrl}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={togglePlay}
                                className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              >
                                {isPlaying ? (
                                  <Pause className="w-5 h-5" />
                                ) : (
                                  <PlayCircle className="w-5 h-5" />
                                )}
                              </button>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">0:00 / {activeLesson.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <Volume2 className="w-5 h-5" />
                              </button>
                              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <Settings className="w-5 h-5" />
                              </button>
                              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <Maximize className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 w-full h-1 bg-white/30 rounded-full">
                            <div className="h-full w-0 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <Lock className="w-16 h-16" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{activeLesson.title}</h2>
                      <p className="text-gray-600">{activeLesson.description}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Lesson Resources</h3>
                    <div className="space-y-3">
                      <a href="#" className="block p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                        <Download className="w-5 h-5 text-gray-400" />
                        <span>Lesson Slides</span>
                      </a>
                      <a href="#" className="block p-3 border rounded-lg hover:bg-gray-50 flex items-center gap-3">
                        <Download className="w-5 h-5 text-gray-400" />
                        <span>Exercise Files</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="text-center text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-xl font-medium">Select a lesson to start learning</h2>
                  <p className="mt-2 text-sm">Choose from the course content on the left to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default Lesson;