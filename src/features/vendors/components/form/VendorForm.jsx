import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vendorSchema, vendorDefaultValues } from '../../schemas/vendorSchema'
import VendorBasicInformation from './VendorBasicInformation'
import VendorAddress from './VendorAddress'
import VendorContactDetails from './VendorContactDetails'
import VendorBankDetails from './VendorBankDetails'
import VendorPaymentTerms from './VendorPaymentTerms'
import VendorCertifications from './VendorCertifications'
import VendorDocuments from './VendorDocuments'
import Button from '../../../../components/ui/Button'

function VendorForm({ onSubmit, isSubmitting = false }) {
  const methods = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: vendorDefaultValues,
    mode: 'onBlur',
  })

  const handleSubmit = (data) => {
    console.log('Valid vendor data:', data)
    onSubmit?.(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6" noValidate>
        <VendorBasicInformation />
        <VendorAddress />
        <VendorContactDetails />
        <VendorBankDetails />
        <VendorPaymentTerms />
        <VendorCertifications />
        <VendorDocuments />

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
          <Button type="button" variant="secondary" onClick={() => methods.reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Vendor'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default VendorForm
