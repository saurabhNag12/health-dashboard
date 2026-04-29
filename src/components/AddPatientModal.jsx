import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Heart, 
  Droplets, 
  Wind, 
  Moon, 
  Activity,
  Calendar,
  Save,
  AlertCircle
} from 'lucide-react';

/**
 * AddPatientModal Component
 * Modal for adding or editing patient records
 * Features form validation and risk level auto-calculation
 */
const AddPatientModal = ({ isOpen, onClose, onSave, editPatient = null }) => {
  // Initial form state
  const initialFormState = {
    name: '',
    age: '',
    gender: 'Male',
    email: '',
    phone: '',
    heartRate: '',
    systolic: '',
    diastolic: '',
    bloodSugar: '',
    oxygenLevel: '',
    sleepHours: '',
    status: 'active',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (editPatient) {
      setFormData({
        name: editPatient.name || '',
        age: editPatient.age || '',
        gender: editPatient.gender || 'Male',
        email: editPatient.email || '',
        phone: editPatient.phone || '',
        heartRate: editPatient.heartRate || '',
        systolic: editPatient.bloodPressure?.systolic || '',
        diastolic: editPatient.bloodPressure?.diastolic || '',
        bloodSugar: editPatient.bloodSugar || '',
        oxygenLevel: editPatient.oxygenLevel || '',
        sleepHours: editPatient.sleepHours || '',
        status: editPatient.status || 'active',
        notes: editPatient.notes || ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [editPatient, isOpen]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || formData.age < 1 || formData.age > 120) newErrors.age = 'Valid age is required (1-120)';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.heartRate || formData.heartRate < 40 || formData.heartRate > 200) {
      newErrors.heartRate = 'Valid heart rate is required (40-200)';
    }
    if (!formData.bloodSugar || formData.bloodSugar < 50 || formData.bloodSugar > 500) {
      newErrors.bloodSugar = 'Valid blood sugar is required (50-500)';
    }
    if (!formData.oxygenLevel || formData.oxygenLevel < 70 || formData.oxygenLevel > 100) {
      newErrors.oxygenLevel = 'Valid oxygen level is required (70-100)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate risk level based on vitals
  const calculateRiskLevel = () => {
    const { heartRate, bloodSugar, oxygenLevel, systolic } = formData;
    
    // Critical conditions
    if (bloodSugar > 200) return 'critical';
    if (heartRate > 120 || oxygenLevel < 90) return 'critical';
    
    // High risk conditions
    if (bloodSugar > 140 || heartRate > 100) return 'high';
    if (systolic > 140) return 'high';
    
    // Moderate risk
    if (bloodSugar > 120 || heartRate > 90) return 'moderate';
    
    return 'normal';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const riskLevel = calculateRiskLevel();
    const status = riskLevel === 'critical' ? 'critical' : riskLevel === 'high' ? 'warning' : 'active';
    
    const patientData = {
      ...(editPatient && { id: editPatient.id }),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      heartRate: parseInt(formData.heartRate),
      bloodPressure: {
        systolic: parseInt(formData.systolic) || 120,
        diastolic: parseInt(formData.diastolic) || 80
      },
      bloodSugar: parseInt(formData.bloodSugar),
      oxygenLevel: parseInt(formData.oxygenLevel),
      sleepHours: parseFloat(formData.sleepHours) || 7,
      riskLevel,
      status,
      lastCheckup: new Date().toISOString().split('T')[0],
      notes: formData.notes,
      trendData: editPatient?.trendData || generateTrendData(formData)
    };
    
    await onSave(patientData);
    setIsSubmitting(false);
    onClose();
  };

  // Generate sample trend data for new patients
  const generateTrendData = (data) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      heartRate: parseInt(data.heartRate) + Math.floor(Math.random() * 10 - 5),
      sugar: parseInt(data.bloodSugar) + Math.floor(Math.random() * 20 - 10)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-medical-teal to-medical-blue rounded-xl">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {editPatient ? 'Edit Patient' : 'Add New Patient'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {editPatient ? 'Update patient information' : 'Enter patient details to add to the system'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.age ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all`}
                    placeholder="35"
                  />
                  {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all`}
                  placeholder="patient@email.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Vital Signs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Heart Rate (bpm) *
                </label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.heartRate ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all`}
                    placeholder="72"
                  />
                </div>
                {errors.heartRate && <p className="mt-1 text-xs text-red-500">{errors.heartRate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Sugar (mg/dL) *
                </label>
                <div className="relative">
                  <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="bloodSugar"
                    value={formData.bloodSugar}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.bloodSugar ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all`}
                    placeholder="95"
                  />
                </div>
                {errors.bloodSugar && <p className="mt-1 text-xs text-red-500">{errors.bloodSugar}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Oxygen Level (%) *
                </label>
                <div className="relative">
                  <Wind className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="oxygenLevel"
                    value={formData.oxygenLevel}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${errors.oxygenLevel ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all`}
                    placeholder="98"
                  />
                </div>
                {errors.oxygenLevel && <p className="mt-1 text-xs text-red-500">{errors.oxygenLevel}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Systolic BP
                </label>
                <input
                  type="number"
                  name="systolic"
                  value={formData.systolic}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all"
                  placeholder="120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Diastolic BP
                </label>
                <input
                  type="number"
                  name="diastolic"
                  value={formData.diastolic}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all"
                  placeholder="80"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sleep Hours
                </label>
                <div className="relative">
                  <Moon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="sleepHours"
                    step="0.1"
                    value={formData.sleepHours}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all"
                    placeholder="7.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 transition-all resize-none"
              placeholder="Additional patient notes..."
            />
          </div>

          {/* Auto-calculated Risk Alert */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-medical-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  Risk Level Auto-Calculation
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Risk level will be automatically calculated based on vitals: 
                  <span className="text-red-600 dark:text-red-400 font-medium"> Critical if sugar &gt; 200</span>, 
                  <span className="text-amber-600 dark:text-amber-400 font-medium"> High Risk if HR &gt; 100</span>
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-medical-teal to-medical-blue text-white font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : editPatient ? 'Update Patient' : 'Save Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
