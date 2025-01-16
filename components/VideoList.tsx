'use client'

import { useState } from 'react'
import { Video, VideoProgress } from '@prisma/client'
import { Quiz } from './Quiz'
// import { Quiz } from '@/components/Quiz'

interface VideoWithProgress extends Video {
  progress: VideoProgress[]
}

interface VideoListProps {
  videos: VideoWithProgress[]
  userId: number
}

export default function VideoList({ videos, userId }: VideoListProps) {
  const [currentVideo, setCurrentVideo] = useState<VideoWithProgress | null>(null)
  const [currentQuiz, setCurrentQuiz] = useState<any>(null)
  const [showCongratulations, setShowCongratulations] = useState(false); // Added state for congratulations message

  const handleVideoComplete = async (videoId: number) => {
    try {
      await fetch('/api/update-video-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, videoId, progress: 100, completed: true }),
      })
 
      setCurrentVideo((prev) => 
        prev && prev.id === videoId 
          ? { ...prev, progress: [{ ...prev.progress[0], progress: 100, completed: true }] }
          : prev
      )

     
      // Fetch quiz for the video
      const quizResponse = await fetch(`/api/get-quiz?videoId=${videoId}`)
      const quizData = await quizResponse.json()
      if (quizData.quiz) {
        setCurrentQuiz(quizData.quiz)
      } else {
        setShowCongratulations(true)
      }
    } catch (error) {
      console.error('Failed to update video progress:', error)
    }
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{video.title}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {video.progress[0]?.completed ? 'Completed' : `${Math.round(video.progress[0]?.progress || 0)}% complete`}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() => setCurrentVideo(video)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Watch video
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentVideo && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {currentVideo.title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {currentVideo.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <video
                        src={currentVideo.url}
                        controls
                        className="w-full"
                        onEnded={() => handleVideoComplete(currentVideo.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setCurrentVideo(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentQuiz && (
        <Quiz
          quiz={currentQuiz}
          onComplete={(score) => {
            setCurrentQuiz(null)
            setShowCongratulations(true)
            // Here you would typically send the quiz result to the server
            fetch('/api/submit-quiz-result', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, quizId: currentQuiz.id, score }),
            })
          }}
        />
      )}
      {showCongratulations && (
        <div>Congratulations! You completed the video and quiz.</div>
      )}
    </div>
  )
}

