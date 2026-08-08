import { useFieldArray, useFormContext } from 'react-hook-form'
import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import FormField from './FormField'

function VendorCertifications() {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'certifications' })

  const addCertification = () => {
    append({
      name: '',
      issuingAuthority: '',
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Certifications</h2>
            <p className="mt-0.5 text-sm text-slate-500">Add quality and compliance certifications</p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={addCertification}>
            Add Certification
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {fields.length === 0 ? (
          <p className="text-sm text-slate-500">No certifications added yet. Click &quot;Add Certification&quot; to add one.</p>
        ) : (
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-lg border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-700">Certification {index + 1}</h3>
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    name={`certifications.${index}.name`}
                    label="Certification Name"
                    required
                    placeholder="e.g. ISO 9001"
                  />
                  <FormField
                    name={`certifications.${index}.issuingAuthority`}
                    label="Issuing Authority"
                    required
                    placeholder="e.g. Bureau Veritas"
                  />
                  <FormField
                    name={`certifications.${index}.certificateNumber`}
                    label="Certificate Number"
                    required
                    placeholder="Certificate number"
                  />
                  <FormField
                    name={`certifications.${index}.issueDate`}
                    label="Issue Date"
                    type="date"
                    required
                  />
                  <FormField
                    name={`certifications.${index}.expiryDate`}
                    label="Expiry Date"
                    type="date"
                    required
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default VendorCertifications
