import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'

interface OTPVerificationProps {
  type: 'email' | 'phone'
  value: string
  onVerified: () => void
}

export default function OTPVerification({ type, value, onVerified }: OTPVerificationProps) {
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const sendOTP = async () => {
    setIsSendingOtp(true)
    setError('')
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value }),
      });
      
      const data = await response.json()
      if (response.ok) {
        setOtpSent(true)
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.')
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsSendingOtp(false)
    }
  }

  const verifyOTP = async () => {
    setIsVerifying(true)
    setError('')
    try {
      const response = await fetch('http://localhost:3000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value, otp }),
      })
      const data = await response.json()
      if (response.ok) {
        onVerified()
      } else {
        setError(data.message || 'Invalid OTP. Please try again.')
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 mb-2">
        {otpSent
          ? `Enter the OTP sent to your ${type}`
          : `Verify your ${type}`}
      </p>
      {!otpSent ? (
        <button
          type="button"
          onClick={sendOTP}
          disabled={isSendingOtp}
          className="px-4 py-2 bg-[#FF7F42] text-white rounded-lg hover:bg-[#E66A2D] disabled:opacity-50"
        >
          {isSendingOtp ? 'Sending OTP...' : `Send OTP to ${value}`}
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <Field
            type="text"
            name={`${type}Otp`}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D41461] focus:border-transparent"
          />
          <button
            type="button"
            onClick={verifyOTP}
            disabled={isVerifying || otp.length !== 6}
            className="px-4 py-2 bg-[#FF7F42] text-white rounded-lg hover:bg-[#E66A2D] disabled:opacity-50"
          >
            {isVerifying ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <ErrorMessage
        name={`${type}Otp`}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  )
}

