import Badge from '../../../../../components/ui/Badge'
import { Card } from '../../../../../components/ui/Card'

function VendorContacts({ data = [] }) {
  if (!data.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-sm text-slate-500">No contacts found for this vendor.</p>
      </Card>
    )
  }

  return (
    <>
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full">
              <thead className="sticky top-0 bg-slate-50">
                <tr className="border-b border-slate-200">
                  {['Name', 'Designation', 'Department', 'Email', 'Phone', 'Type'].map((h) => (
                    <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 first:pl-6">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((contact) => (
                  <tr key={contact.id} className="border-b border-slate-100 hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-3 pl-6 text-sm font-medium text-slate-900">
                      {contact.name}
                      {contact.isPrimary && (
                        <Badge variant="info" className="ml-2">Primary</Badge>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{contact.designation}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{contact.department}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{contact.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{contact.phone}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{contact.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.map((contact) => (
          <Card key={contact.id} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-slate-900">{contact.name}</p>
                <p className="text-sm text-slate-500">{contact.designation}</p>
              </div>
              {contact.isPrimary && <Badge variant="info">Primary</Badge>}
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Department</dt>
                <dd className="text-slate-700">{contact.department}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Email</dt>
                <dd className="text-right text-slate-700">{contact.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Phone</dt>
                <dd className="text-slate-700">{contact.phone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Type</dt>
                <dd className="text-slate-700">{contact.type}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </>
  )
}

export default VendorContacts
