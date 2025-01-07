"use client"

import { useEffect, useRef, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { X } from 'lucide-react'

import { applicationSchema, type ApplicationFormValues } from "../utils/validation-schema"
import OTPVerification from "./OTPVerification"
import 'react-phone-input-2/lib/style.css';
import PhoneInput from "react-phone-input-2";

import { CheckCircle } from "lucide-react";
interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {


  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
 

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen) return null

  const initialValues: ApplicationFormValues = {
    fullName: "",
    email: "",
    phone: "",
    startupName: "",
    description: "",
    profileLink: "",
 
  }
  const isValidJson = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (
    values: ApplicationFormValues,
    { setSubmitting, resetForm, setFieldError }: any
  ) => {
    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const responseText = await response.text(); // Read the response as text
  
   
  
      // Handle success
      const data = JSON.parse(responseText); // Parse the successful response
      console.log("Application submitted successfully:", data);
  
      resetForm();
      setEmailVerified(false);
      setPhoneVerified(false);
      onClose();
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
  
      if (error instanceof Error) {
        setFieldError('submit', error.message);
      } else {
        setFieldError('submit', 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  
  
  
 

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#D41461]">Apply Now</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={applicationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, touched, errors, values }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Field
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D41461] focus:border-transparent
                      ${touched.fullName && errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D41461] focus:border-transparent
                      ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                  {!emailVerified && values.email && !errors.email && (
                    <OTPVerification
                      type="email"
                      value={values.email}
                      onVerified={() => setEmailVerified(true)}
                    />
                  )}
                  {emailVerified && (
                    <p className="mt-2 text-sm text-green-600">Email verified successfully!</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <PhoneInput
                    country={"us"} // Default country code
                    value={values.phone}
                    onChange={(phone) => setFieldValue("phone", phone)}
                    inputProps={{
                      name: "phone",
                      required: true,
                      className: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D41461] focus:border-transparent 
                      ${touched.phone && errors.phone ? "border-red-500" : "border-gray-300"}`,
                    }}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                  {!phoneVerified && values.phone && !errors.phone && (
                    <OTPVerification
                      type="phone"
                      value={values.phone}
                      onVerified={() => setPhoneVerified(true)}
                    />
                  )}
                  {phoneVerified && (
                    <p className="mt-2 text-sm text-green-600">Phone number verified successfully!</p>
                  )}
                </div>

                <div>
                  <label htmlFor="startupName" className="block text-sm font-medium text-gray-700 mb-1">
                    Startup Name *
                  </label>
                  <Field
                    type="text"
                    id="startupName"
                    name="startupName"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D41461] focus:border-transparent
                      ${touched.startupName && errors.startupName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage
                    name="startupName"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description of Startup Idea or Business *
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D41461] focus:border-transparent
                      ${touched.description && errors.description ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                <div>
                  <label htmlFor="profileLink" className="block text-sm font-medium text-gray-700 mb-1">
                    SHECONOMY COMMUNITY PROFILE LINK *
                  </label>
                  <Field
                    type="url"
                    id="profileLink"
                    name="profileLink"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D41461] focus:border-transparent
                      ${touched.profileLink && errors.profileLink ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <ErrorMessage
                    name="profileLink"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 mr-4 text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !emailVerified || !phoneVerified }
                    className="px-6 py-2 bg-[#FF7F42] text-white rounded-lg hover:bg-[#E66A2D] disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
