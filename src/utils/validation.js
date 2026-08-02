export const USER_TYPES = ['Individual', 'Business', 'Corporate'];

export const validateUserType = (value) => {
  if (!value || !value.trim()) return 'User type is required';
  if (!USER_TYPES.includes(value)) return 'Please select a valid user type';
  return '';
};

export const validateFullName = (value) => {
  if (!value || !value.trim()) return 'Full name is required';
  if (value.trim().length < 3) return 'Full name must be at least 3 characters';
  if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Full name can only contain alphabets and spaces';
  return '';
};

export const validateContact = (value) => validatePhone(value);

export const validatePhone = (value) => {
  if (!value || !value.trim()) return 'Phone number is required';
  const cleaned = value.trim().replace(/[\s-]/g, '');
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return 'Enter a valid 10-digit mobile number (starts with 6, 7, 8 or 9)';
  }
  return '';
};

export const validateEmail = (value) => {
  if (!value || !value.trim()) return 'Email ID is required';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value.trim())) return 'Enter a valid email address (e.g. user@example.com)';
  return '';
};

export const validateDetails = (value) => {
  if (!value || !value.trim()) return 'Additional details are required';
  if (value.trim().length < 5) return 'Details must be at least 5 characters';
  return '';
};

export const validateAddress = (value) => {
  if (!value || !value.trim()) return 'Address is required';
  if (value.trim().length < 10) return 'Address must be at least 10 characters';
  return '';
};

export const validateCity = (value) => {
  if (!value || !value.trim()) return 'City is required';
  if (!/^[a-zA-Z\s.-]+$/.test(value.trim())) return 'City must contain only letters';
  return '';
};

export const validateState = (value) => {
  if (!value || !value.trim()) return 'State is required';
  if (!/^[a-zA-Z\s.-]+$/.test(value.trim())) return 'State must contain only letters';
  return '';
};

export const validatePincode = (value) => {
  if (!value || !value.trim()) return 'Pincode is required';
  if (!/^\d{6}$/.test(value.trim())) return 'Pincode must be exactly 6 digits';
  if (value.trim() === '000000') return 'Enter a valid pincode';
  return '';
};

export const validateCheckoutOrderForm = (form) => ({
  fullName: validateFullName(form.fullName),
  phone: validatePhone(form.phone),
  email: validateEmail(form.email),
  address: validateAddress(form.address),
  city: validateCity(form.city),
  state: validateState(form.state),
  pincode: validatePincode(form.pincode),
});

export const validateCheckoutForm = (form) => ({
  userType: validateUserType(form.userType),
  fullName: validateFullName(form.fullName),
  contact: validateContact(form.contact),
  email: validateEmail(form.email),
  details: validateDetails(form.details),
  address: validateAddress(form.address),
  city: validateCity(form.city),
  state: validateState(form.state),
  pincode: validatePincode(form.pincode),
});

export const isFormValid = (errors) =>
  Object.values(errors).every((error) => error === '');
