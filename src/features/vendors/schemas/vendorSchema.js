import { z } from 'zod'

const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/

export const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuingAuthority: z.string().min(1, 'Issuing authority is required'),
  certificateNumber: z.string().min(1, 'Certificate number is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
})

export const documentSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  type: z.string().min(1, 'Document type is required'),
  file: z.any().optional(),
})

export const vendorSchema = z.object({
  vendorName: z.string().min(2, 'Vendor name must be at least 2 characters'),
  gst: z.string().regex(gstRegex, 'Invalid GST number format'),
  pan: z.string().regex(panRegex, 'Invalid PAN number format'),
  category: z.string().min(1, 'Category is required'),

  addressLine1: z.string().min(1, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().min(1, 'Postal code is required'),

  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  alternatePhone: z.string().optional(),

  bankDetails: z.object({
    accountHolderName: z.string().min(1, 'Account holder name is required'),
    bankName: z.string().min(1, 'Bank name is required'),
    accountNumber: z.string().min(8, 'Account number must be at least 8 digits'),
    ifscCode: z.string().regex(ifscRegex, 'Invalid IFSC code format'),
    branchName: z.string().min(1, 'Branch name is required'),
  }),

  paymentTerms: z.string().min(1, 'Payment terms are required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  creditLimit: z.string().optional(),

  certifications: z.array(certificationSchema).default([]),
  documents: z.array(documentSchema).default([]),
})

export const vendorDefaultValues = {
  vendorName: '',
  gst: '',
  pan: '',
  category: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'India',
  postalCode: '',
  contactPerson: '',
  email: '',
  phone: '',
  alternatePhone: '',
  bankDetails: {
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
  },
  paymentTerms: '',
  paymentMethod: '',
  creditLimit: '',
  certifications: [],
  documents: [],
}
