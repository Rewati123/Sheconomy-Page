import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'

interface QuizProps {
  quiz: {
    id: number
    questions: {
      id: number
      text: string
      options: {
        id: number
        text: string
      }[]
    }[]
  }
  onComplete: (score: number) => void
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleOptionSelect = (optionId: number) => {
    setSelectedOptions(prev => {
      const newSelected = [...prev]
      newSelected[currentQuestion] = optionId
      return newSelected
    })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateScore = () => {
    // In a real application, you'd fetch the correct answers from the server
    // Here, we're assuming the first option is always correct for simplicity
    const score = selectedOptions.filter((option, index) => option === quiz.questions[index].options[0].id).length
    return score
  }

  const handleComplete = () => {
    const score = calculateScore()
    onComplete(score)
  }

  return (
    <Dialog open={true}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Quiz</Dialog.Title>
        </Dialog.Header>
        {!showResult ? (
          <>
            <p className="mb-4">{quiz.questions[currentQuestion].text}</p>
            <div className="space-y-2">
              {quiz.questions[currentQuestion].options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-2 text-left rounded ${
                    selectedOptions[currentQuestion] === option.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedOptions[currentQuestion] === undefined}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4">You've completed the quiz!</p>
            <p className="mb-4">Your score: {calculateScore()} / {quiz.questions.length}</p>
            <div className="flex justify-end">
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog>
  )
}

