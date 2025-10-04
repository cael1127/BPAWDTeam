import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { createAppointment, validateEmail, validateRequired, handleApiError } from '../../services/api';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    serviceType: '',
    urgency: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceTypes = [
    { value: 'individual', label: 'Individual Counseling' },
    { value: 'group', label: 'Group Therapy Sessions' },
    { value: 'family', label: 'Family Counseling' },
    { value: 'crisis', label: 'Crisis Intervention' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - General support needed' },
    { value: 'medium', label: 'Medium - Some urgency, but not immediate' },
    { value: 'high', label: 'High - Urgent support needed' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.preferredDate = 'Please select a future date';
      }
    }

    // Service type validation
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    // Urgency validation
    if (!formData.urgency) {
      newErrors.urgency = 'Please select urgency level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await createAppointment(formData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Appointment request submitted successfully!',
        details: response.nextSteps
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        serviceType: '',
        urgency: '',
        notes: ''
      });

    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to submit appointment request');
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus?.type === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
            {submitStatus.message}
          </h3>
        </div>
        
        <div className="text-green-700 dark:text-green-300">
          <p className="mb-3">Here's what happens next:</p>
          <ul className="list-disc list-inside space-y-1">
            {submitStatus.details?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setSubmitStatus(null)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Schedule Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submitStatus?.type === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
            <p className="text-red-800 dark:text-red-200">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500'
              } focus:outline-none focus:ring-1`}
              placeholder="Your full name"
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={errors.name ? 'true' : 'false'}
              required
            />
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500'
              } focus:outline-none focus:ring-1`}
              placeholder="your.email@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={errors.email ? 'true' : 'false'}
              required
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.phone 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500'
            } focus:outline-none focus:ring-1`}
            placeholder="(555) 123-4567"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
        </div>
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preferred Date & Time <span className="text-red-500" aria-label="required">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="datetime-local"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.preferredDate 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500'
            } focus:outline-none focus:ring-1`}
            aria-describedby={errors.preferredDate ? 'date-error' : undefined}
            aria-invalid={errors.preferredDate ? 'true' : 'false'}
            required
          />
        </div>
        {errors.preferredDate && (
          <p id="date-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.preferredDate}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Service Type <span className="text-red-500" aria-label="required">*</span>
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.serviceType 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500'
            } focus:outline-none focus:ring-1`}
            aria-describedby={errors.serviceType ? 'service-error' : undefined}
            aria-invalid={errors.serviceType ? 'true' : 'false'}
            required
          >
            <option value="">Select a service type</option>
            {serviceTypes.map(service => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p id="service-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.serviceType}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Urgency Level <span className="text-red-500" aria-label="required">*</span>
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.urgency 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500'
            } focus:outline-none focus:ring-1`}
            aria-describedby={errors.urgency ? 'urgency-error' : undefined}
            aria-invalid={errors.urgency ? 'true' : 'false'}
            required
          >
            <option value="">Select urgency level</option>
            {urgencyLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.urgency && (
            <p id="urgency-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.urgency}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring-1"
          placeholder="Please share any additional information that might help us prepare for your appointment..."
        />
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
              Important Notice
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              This is a demonstration project. For real mental health emergencies, please call 988 (Suicide & Crisis Lifeline) 
              or text HOME to 741741 (Crisis Text Line) immediately.
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 focus:bg-green-700'
        } text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        aria-describedby="submit-status"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Schedule Appointment'
        )}
      </button>
      
      <p id="submit-status" className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Your information is secure and will only be used to schedule your appointment.
      </p>
    </form>
  );
};

export default AppointmentForm;
