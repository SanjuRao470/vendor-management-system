import { useFieldArray, useFormContext } from 'react-hook-form'
import { Card, CardHeader, CardBody } from '../../../../components/ui/Card'
import Button from '../../../../components/ui/Button'
import FormField from './FormField'

const DOCUMENT_TYPES = [
  { value: 'GST', label: 'GST Certificate' },
  { value: 'PAN', label: 'PAN Card' },
  { value: 'Contract', label: 'Service Agreement' },
  { value: 'Insurance', label: 'Insurance Policy' },
  { value: 'Compliance', label: 'Compliance Certificate' },
  { value: 'Other', label: 'Other' },
]

function VendorDocuments() {
  const { control, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'documents' })

  const addDocument = () => {
    append({ name: '', type: '', file: null })
  }

  const handleFileChange = (index, event) => {
    const file = event.target.files?.[0] || null
    setValue(`documents.${index}.file`, file)
    if (file && !fields[index]?.name) {
      setValue(`documents.${index}.name`, file.name.replace(/\.[^/.]+$/, ''))
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Documents</h2>
            <p className="mt-0.5 text-sm text-slate-500">Upload supporting vendor documents</p>
          </div>
          <Button type="button" variant="secondary" size="sm" onClick={addDocument}>
            Add Document
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-6 py-10 text-center">
            <svg className="mb-3 h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-slate-500">No documents added yet</p>
            <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={addDocument}>
              Upload Document
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-lg border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-700">Document {index + 1}</h3>
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    name={`documents.${index}.name`}
                    label="Document Name"
                    required
                    placeholder="Document name"
                  />
                  <FormField
                    name={`documents.${index}.type`}
                    label="Document Type"
                    required
                    as="select"
                    placeholder="Select type"
                    options={DOCUMENT_TYPES}
                  />
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      File Upload
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(index, e)}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default VendorDocuments
